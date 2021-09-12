import { SpeechClient } from "@google-cloud/speech";
import { google } from "@google-cloud/speech/build/protos/protos";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { IncomingMessage, Server, ServerResponse } from "http";
import { transcribeFileAndPipeToGcs } from "./upload";

const client = new SpeechClient();

interface Params {
  uri: string;
  duration: number;
  languageCode: string;
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
  const { uri, duration } = await transcribeFileAndPipeToGcs(request, reply);
  const transcription = await initiateSpeechToText({
    uri,
    duration,
    languageCode: "en-US",
  });

  reply.send(transcription);
};

const initiateSpeechToText = async ({
  uri,
  languageCode,
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

  let result:
    | google.cloud.speech.v1.IRecognizeResponse
    | google.cloud.speech.v1.ILongRunningRecognizeResponse;

  if (duration < 60) {
    const [res] = await client.recognize(speechRequest);
    result = res;
  } else {
    const [operation, longRunningOperation] = await client.longRunningRecognize(
      speechRequest
    );

    const [res] = await operation.promise();
    result = res;
  }

  const totalBilledTime = result.totalBilledTime;
  const transcription = result?.results
    ?.map((r) => r.alternatives?.[0].transcript)
    .join("\n");

  return transcription;
};
