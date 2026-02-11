# LaunchDrop Worker 🏗️

The background worker responsible for processing build jobs and deploying user applications.

## 🚀 Responsibilities

- **Repository Cloning**: Securely clones project source code from Git providers.
- **Environment Detection**: Automatically detects framework and package manager.
- **Dockerized Builds**: Executes isolated build processes using specialized Docker images.
- **R2 Deployment**: Uploads build artifacts to Cloudflare R2 for global serving.
- **Status Reporting**: Updates deployment progress and logs in real-time.

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Task Queue**: [BullMQ](https://docs.bullmq.io/)
- **Build Engine**: [Docker](https://www.docker.com/)
- **Storage**: [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/)

## 🏁 Getting Started

### Prerequisites

- Bun installed
- Docker Engine
- Redis (for job synchronization)

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

## 🏗️ Build Lifecycle

1. **Start**: Job received from Build Queue.
2. **Clone**: Source code pulled into a fresh workspace.
3. **Detect**: Framework and build scripts identified.
4. **Build**: Docker container created to run the build.
5. **Upload**: Resulting assets pushed to R2 storage.
6. **Cleanup**: Workspaces and temporary resources purged.
