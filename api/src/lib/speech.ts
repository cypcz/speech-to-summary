import { Task, TaskStatus } from ".prisma/client";
import { SpeechClient } from "@google-cloud/speech";
import { google } from "@google-cloud/speech/build/protos/protos";
import { Request, Response } from "express";
import { prisma } from "../prisma";
import { getSummaries } from "./openai";
import {
  getYoutubeAudioAndPipeToGcs,
  transcribeFileAndPipeToGcs,
} from "./upload";

const client = new SpeechClient();

interface Params {
  task: Task;
  languageCode: string;
}

export const initiateSummaryFromUpload = async (
  req: Request,
  res: Response
) => {
  const task = await transcribeFileAndPipeToGcs(req, res);

  await initiateSpeechToText({
    task,
    languageCode: "en-US",
  });
};

export const initiateSummaryFromYoutube = async (
  req: Request,
  res: Response
) => {
  const task = await getYoutubeAudioAndPipeToGcs(req, res);

  await initiateSpeechToText({
    task,
    languageCode: "en-US",
  });
};

const initiateSpeechToText = async ({ task, languageCode }: Params) => {
  const speechRequest:
    | google.cloud.speech.v1.IRecognizeRequest
    | google.cloud.speech.v1.ILongRunningRecognizeRequest = {
    audio: {
      uri: task.fileUri,
    },
    config: {
      encoding: "FLAC",
      //  sampleRateHertz: 16000,
      languageCode,
    },
  };

  const [operation] = await client.longRunningRecognize(speechRequest);

  await prisma.task.update({
    where: { id: task.id },
    data: {
      status: TaskStatus.WAITING_FOR_TRANSCRIPT,
    },
  });

  operation.name && pollForTranscribeResult(operation.name, task.id);

  return task;
};

const pollForTranscribeResult = (name: string, taskId: string) => {
  let runCount = 0;
  const timer = setInterval(async () => {
    runCount++;

    console.log(`Try ${runCount} to get long running progress result ${name}`);

    const response = await client.checkLongRunningRecognizeProgress(name);

    if (response.done) {
      console.log(`Result for long running progress ${name} ready`);

      const { results, totalBilledTime } = response.result as any;

      const transcript = results
        ?.map((r: any) => r.alternatives?.[0].transcript)
        .join("\n");

      console.log(`Querying the summary..`);

      const summaries = await getSummaries(transcript);

      console.log(`Summary received, updating task..`);

      await prisma.task.update({
        where: { id: taskId },
        data: {
          transcript,
          secondsBilled: totalBilledTime.seconds.low,
          summaries: { set: summaries },
          status: TaskStatus.DONE,
        },
      });

      console.log(`Finished`);

      clearInterval(timer);
    }

    if (runCount > 15) {
      console.log(
        `Result ${name} was not ready in ${runCount} tries. Aborting..`
      );

      clearInterval(timer);
    }
  }, 30000);
};
