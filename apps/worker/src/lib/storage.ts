import { createStorageClient } from "@repo/storage";

export const { client: r2, upload } = createStorageClient({
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    endpoint: process.env.R2_ENDPOINT!,
    bucketName: process.env.R2_BUCKET_NAME!
});
