# @repo/storage 📦

Unified storage utilities for LaunchDrop, handling file uploads and retrievals from S3-compatible services like Cloudflare R2.

## 🚀 Features

- **S3 / R2 Compatibility**: Works seamlessly with Cloudflare R2 and other S3-compatible providers.
- **Streamlined Uploads**: Simplified API for uploading build artifacts.
- **Deployment Asset Management**: Handles the structured storage of project files.

## 🛠️ Tech Stack

- **Driver**: [AWS SDK for S3](https://aws.amazon.com/sdk-for-javascript/) (v3)
- **Integration**: Cloudflare R2

## 🏁 Usage

```typescript
import { uploadToR2 } from "@repo/storage";

await uploadToR2(deploymentId, filePath);
```

## 📁 Structure

- `src/`: Core storage client and utility functions.
