# @repo/queue 🚥

Shared task queue configuration and manager for LaunchDrop, powered by BullMQ and Redis.

## 🚀 Features

- **Unified Build Queue**: Single source of truth for build job definitions.
- **Redis Integration**: Optimized Redis connections for BullMQ.
- **Job Reliability**: Configured for retries and persistent task management.

## 🛠️ Tech Stack

- **Provider**: [BullMQ](https://docs.bullmq.io/)
- **Backend**: [Redis](https://redis.io/)

## 🏁 Usage

```typescript
import { buildQueue } from "@repo/queue";

await buildQueue.add("build", { deploymentId, data });
```

## 📁 Structure

- `src/`: Queue definitions and shared Redis connection logic.
