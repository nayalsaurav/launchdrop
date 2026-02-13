
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export interface StorageConfig {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  bucketName: string;
}

export const createStorageClient = (config: StorageConfig) => {
  const client = new S3Client({
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    region: "auto",
    endpoint: config.endpoint,
  });

  const upload = async ({
    key,
    body,
    type,
  }: {
    key: string;
    body: Uint8Array<ArrayBuffer> | string | Buffer;
    type: string;
  }) => {
    await client.send(
      new PutObjectCommand({
        Bucket: config.bucketName,
        Key: key,
        Body: body,
        ContentType: type,
        CacheControl: key.endsWith(".html")
          ? "no-cache"
          : "public, max-age=31536000, immutable",
      })
    );
  };

  return { client, upload };
};
