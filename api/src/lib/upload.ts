import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import Busboy from "busboy";
import { Request, Response } from "express";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import ytdl from "ytdl-core";
import { bucket } from "./storage";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export const transcribeFileAndPipeToGcs = async (
  req: Request,
  _res: Response
): Promise<{ uri: string; duration: number; fileName: string }> => {
  const busboy = new Busboy({ headers: req.headers });

  return new Promise((resolve, reject) => {
    busboy.on("file", (_, fileStream, filename, _encoding, _mimeType) => {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${filename}`;
      const fileNameWithExt = `${timestamp}-${path.parse(filename).name}.flac`;

      const writeStream = fs.createWriteStream(fileName);
      fileStream.pipe(writeStream);

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
            duration: 0,
            fileName,
          });
        });
    });

    req.pipe(busboy);
  });
};

export const getYoutubeAudioAndPipeToGcs = async (
  req: Request,
  _res: Response
): Promise<any> => {
  const url = (req.body as any).url;

  const info = await ytdl.getBasicInfo(url);
  const {
    lengthSeconds: duration,
    title: fileName,
    videoId,
  } = info.videoDetails;
  const fileNameWithExt = `${fileName}.flac`;

  const readStream = ytdl(url, {
    quality: "highestaudio",
    filter: "audioonly",
  });

  return new Promise((resolve, reject) => {
    ffmpeg(readStream)
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
        resolve({
          uri: `gs://${bucket.name}/${fileNameWithExt}`,
          duration: Number(duration),
          fileName: fileNameWithExt,
        });
      });
  });
};
