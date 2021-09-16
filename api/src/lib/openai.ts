import axios from "axios";
import "dotenv/config.js";
import { OPEN_AI_API_KEY } from "../utils/env";

const openAi = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${OPEN_AI_API_KEY}`,
  },
});

export const getSummaries = async (transcript: string): Promise<string[]> => {
  const res = await openAi.post(`/engines/davinci-instruct-beta/completions`, {
    prompt: `${transcript}\nSummary of the text above:`,
    max_tokens: 140,
    temperature: 0.3, // fine-tuning
    top_p: 1, // fine-tuning
    stream: false, // Partial progresse
    echo: false, // Echo back the prompt in addition to the completion
    best_of: 2, // Returns only one best result
    frequency_penalty: 0.5,
    presence_penalty: 0,
    logprobs: 0,
    n: 2,
  });

  return res.data.choices.map((c: any) => c.text);
};
