import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "@repo/config/env";

export const r2 = new S3Client({
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
  region: "auto",
  endpoint: env.R2_ENDPOINT,
});

export const upload = async ({
  key,
  body,
  type,
}: {
  key: string;
  body: Uint8Array<ArrayBuffer>;
  type: string;
}) => {
  await r2.send(
    new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: type,
      CacheControl: key.endsWith(".html")
        ? "no-cache"
        : "public, max-age=31536000, immutable",
    })
  );
};
