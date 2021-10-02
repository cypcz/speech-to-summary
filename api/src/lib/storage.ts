import { Storage } from "@google-cloud/storage";
import { GCS_BUCKET_NAME } from "../utils/env";

const storage = new Storage();

export const bucket = storage.bucket(GCS_BUCKET_NAME);

export const generateV4UploadSignedUrl = async ({
  fileName,
  contentType,
}: any) => {
  const [url] = await bucket.file(fileName).getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType,
  });

  return url;
};
