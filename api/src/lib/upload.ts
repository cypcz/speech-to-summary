import { Task, TaskStatus } from ".prisma/client";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import Busboy from "busboy";
import { Request, Response } from "express";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import ytdl from "ytdl-core";
import { prisma } from "../prisma";
import { bucket } from "./storage";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export const transcribeFileAndPipeToGcs = async (
  req: Request,
  res: Response
): Promise<Task> => {
  const busboy = new Busboy({ headers: req.headers });

  return new Promise((resolve, reject) => {
    busboy.on("file", async (_, fileStream, filename, _encoding, _mimeType) => {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${filename}`;
      const fileNameWithExt = `${timestamp}-${path.parse(filename).name}.flac`;

      const task = await prisma.task.create({
        data: {
          name: fileName,
          fileUri: `gs://${bucket.name}/${fileNameWithExt}`,
          status: TaskStatus.PROCESSING,
          durationInSeconds: Number(0),
          user: { connect: { id: req.user?.id } },
        },
      });

      res.json(task);

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

          resolve(task);
        });
    });

    req.pipe(busboy);
  });
};

export const getYoutubeAudioAndPipeToGcs = async (
  req: Request,
  res: Response
): Promise<Task> => {
  const url = (req.body as any).link;

  const info = await ytdl.getBasicInfo(url);
  const {
    lengthSeconds: duration,
    title: filename,
    videoId,
  } = info.videoDetails;

  const timestamp = Date.now();
  const fileName = `${timestamp}-${filename}`;
  const fileNameWithExt = `${timestamp}-${path.parse(filename).name}.flac`;

  const task = await prisma.task.create({
    data: {
      name: fileName,
      fileUri: `gs://${bucket.name}/${fileNameWithExt}`,
      status: TaskStatus.PROCESSING,
      durationInSeconds: Number(duration),
      user: { connect: { id: req.user?.id } },
    },
  });

  res.json(task);

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
      .on("finish", () => {
        resolve(task);
      });
  });
};
