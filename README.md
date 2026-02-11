# LaunchDrop 🚀

LaunchDrop is a modern developer platform designed for lightning-fast deployments of static applications. It provides a seamless experience from github project url to global availability.

## ✨ Features

- **GitHub URL Deployment**: Ship your site by simply pasting a GitHub repository URL—no complex setup required.
- **Automatic Environment Detection**: Intelligently identifies frameworks and package managers to configure the perfect build environment.
- **Isolated Docker Builds**: Ensures secure and reproducible builds by running them in dedicated, ephemeral Docker containers.
- **Global Edge Serving**: Deploys your assets to Cloudflare R2 and serves them through Cloudflare Workers for sub-millisecond latency world-wide.
- **Real-time Build Tracking**: Monitor your deployment's progress from cloning to global availability with live status updates.
- **Unified Dashboard**: Easily manage your projects, deployments, domain configurations, and environment variables in one place.

## 🏗️ Architecture

LaunchDrop is built as a monorepo using **Turborepo** and **Bun**, ensuring a fast and unified development experience.

### Applications (`/apps`)

- **[web](apps/web)**: A beautiful Next.js dashboard for managing projects and deployments.
- **[api](apps/api)**: The core backend service powered by Express and Bun, handling project management and authentication.
- **[worker](apps/worker)**: A robust background worker that processes build jobs using BullMQ.
- **[cf-proxy](apps/cf-proxy)**: A Cloudflare Worker that intelligently proxies requests to site content stored in R2.

### Packages (`/packages`)

- **@repo/database**: Centralized Prisma client and schema for PostgreSQL.
- **@repo/queue**: Shared task queue configuration using BullMQ and Redis.
- **@repo/storage**: Unified utilities for R2/S3-compatible file storage.
- **@repo/types**: Shared TypeScript types and Zod validation schemas.
- **@repo/ui**: A library of reusable UI components built with shadcn/ui and Tailwind CSS.
- **@repo/config**: Centralized environment and configuration management.

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Docker](https://www.docker.com/) (for local database and Redis)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/launchdrop.git
   cd launchdrop
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Setup environment variables:
   Copy `.env.example` to `.env` in the root and relevant application directories and fill in the required values.

4. Run the development environment:
   ```bash
   bun dev
   ```

## 📜 Scripts

- `bun dev`: Start all applications in development mode.
- `bun build`: Build all applications and packages.
- `bun lint`: Run ESLint across the monorepo.
- `bun format`: Format code using Prettier.
- `bun check-types`: Perform type checking across the project.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## 📄 License

This project is licensed under the MIT License.
