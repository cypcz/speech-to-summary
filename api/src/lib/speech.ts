import { SpeechClient } from "@google-cloud/speech";
import { google } from "@google-cloud/speech/build/protos/protos";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { IncomingMessage, Server, ServerResponse } from "http";
import { prisma } from "../prisma";
import { transcribeFileAndPipeToGcs } from "./upload";

const client = new SpeechClient();

interface Params {
  uri: string;
  duration: number;
  languageCode: string;
  fileName: string;
}

export const initiateSummary = async (
  request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
  reply: FastifyReply<
    Server,
    IncomingMessage,
    ServerResponse,
    RouteGenericInterface,
    unknown
  >
) => {
  const { uri, duration, fileName } = await transcribeFileAndPipeToGcs(
    request,
    reply
  );
  const task = await initiateSpeechToText({
    uri,
    duration,
    fileName,
    languageCode: "en-US",
  });

  reply.send(task);
};

const initiateSpeechToText = async ({
  uri,
  languageCode,
  fileName,
  duration,
}: Params) => {
  const speechRequest:
    | google.cloud.speech.v1.IRecognizeRequest
    | google.cloud.speech.v1.ILongRunningRecognizeRequest = {
    audio: {
      uri,
    },
    config: {
      encoding: "FLAC",
      //  sampleRateHertz: 16000,
      languageCode,
    },
  };

  const [operation] = await client.longRunningRecognize(speechRequest);

  operation.name && pollForTranscribeResult(operation.name);

  return prisma.task.create({
    data: {
      name: fileName,
      fileUri: uri,
      user: { connect: { id: "cktait8sg0012n5s7zs3e91wq" } },
    },
    select: { id: true, name: true, userId: true },
  });
};

const pollForTranscribeResult = (name: string) => {
  let runCount = 0;
  const timer = setInterval(async () => {
    console.log("Polling for long running progress " + name);
    const response = await client.checkLongRunningRecognizeProgress(name);

    runCount++;

    if (response.done) {
      console.log(`Result for long running progress ${name} ready`);

      const { results, totalBilledTime } = response.result as any;

      const transcription = results
        ?.map((r: any) => r.alternatives?.[0].transcript)
        .join("\n");

      // go for summary
      // @TODO: write transcription to db

      clearInterval(timer);
    }

    if (runCount >= 3) {
      console.log(
        `Result ${name} was not ready in ${runCount} tries. Aborting..`
      );

      clearInterval(timer);
    }
  }, 30000);
};
