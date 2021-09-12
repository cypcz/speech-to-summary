import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import ffmpeg from "fluent-ffmpeg";
import fs, { promises } from "fs";
import { FileHandle } from "fs/promises";
import { IncomingMessage, Server, ServerResponse } from "http";
import MediaInfoFactory from "mediainfo.js";
import { Result, ResultObject } from "mediainfo.js/dist/types";
import path from "path";
import { bucket } from "./storage";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

interface Response {
  uri: string;
  duration: number;
  fileName: string;
}

export const transcribeFileAndPipeToGcs = async (
  request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
  _reply: FastifyReply<
    Server,
    IncomingMessage,
    ServerResponse,
    RouteGenericInterface,
    unknown
  >
): Promise<Response> => {
  const data = await request.file();

  const timestamp = Date.now();
  const fileName = `${timestamp}-${data.filename}`;
  const fileNameWithExt = `${timestamp}-${path.parse(data.filename).name}.flac`;

  const writeStream = fs.createWriteStream(fileName);
  data.file.pipe(writeStream);

  const duration = (await getAudioDuration(fileName)) || 60;

  return new Promise((resolve, reject) => {
    ffmpeg(fileName)
      .noVideo()
      .audioChannels(1)
      .format("flac")
      .on("start", (commandLine) => {
        console.log("Spawned Ffmpeg with command: " + commandLine);
      })
      .on("error", (err) => {
        console.log("An error occurred: " + err.message);
        reject();
      })
      .on("end", () => {
        console.log("Processing finished !");
      })
      .pipe(bucket.file(fileNameWithExt).createWriteStream())
      .on("finish", async () => {
        fs.unlinkSync(fileName);

        resolve({
          uri: `gs://${bucket.name}/${fileNameWithExt}`,
          duration,
          fileName,
        });
      });
  });
};

function getReadChunkFunction(fileHandle: FileHandle) {
  async function readChunk(size: number, offset: number) {
    const buffer = new Uint8Array(size);

    await fileHandle.read(buffer, 0, size, offset);

    return buffer;
  }

  return readChunk;
}

async function readMetaData(filepath: string) {
  const mediaInfo = await MediaInfoFactory({
    format: "JSON",
    coverData: false,
  });

  const fileHandle = await promises.open(filepath, "r");

  const fileSize = (await fileHandle.stat()).size;

  const readChunk = getReadChunkFunction(fileHandle);

  const result = await mediaInfo.analyzeData(() => fileSize, readChunk);

  await fileHandle.close();

  return result as Result;
}

const getAudioDuration = async (filepath: string) => {
  const result = await readMetaData(filepath);

  const data: ResultObject = JSON.parse(
    typeof result === "string" ? result : result.toString()
  );

  const audioMetaData = data.media.track.find(
    (item) => item["@type"] === "Audio"
  );

  if (!audioMetaData) return null;

  return Number(audioMetaData["Duration"]);
};
