import { Storage } from "@google-cloud/storage";
import "dotenv/config.js";
import { GCS_BUCKET_NAME } from "../src/utils/env";

const storage = new Storage();

async function configureBucketCors() {
  // await storage.bucket(GCS_BUCKET_NAME).setCorsConfiguration([
  //   {
  //     //  maxAgeSeconds,
  //     method: ["GET", "PUT"],
  //     origin: ["http://localhost:3000"],
  //     responseHeader: ["Content-Type"],
  //   },
  // ]);

  const [metadata] = await storage.bucket(GCS_BUCKET_NAME).getMetadata();

  // await storage.bucket(GCS_BUCKET_NAME).setCorsConfiguration([]);

  // console.log(`Removed CORS configuration from bucket ${GCS_BUCKET_NAME}`);

  console.log(JSON.stringify(metadata, null, 2));
  console.log("done");
}

configureBucketCors().catch(console.error);
