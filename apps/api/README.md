# LaunchDrop API 🛠️

The core backend service for LaunchDrop, handling project management, user authentication, and deployment orchestration.

## 🚀 Features

- **Project Management**: CRUD operations for projects and deployments.
- **Authentication**: Secure user session management powered by **Better Auth**.
- **Queue Integration**: Intelligent job submission to the build worker via **BullMQ**.
- **Database Access**: Type-safe data operations using **Prisma** and PostgreSQL.

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Express](https://expressjs.com/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Database**: [Prisma](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/)

## 🏁 Getting Started

### Prerequisites

- Bun installed
- Redis (for BullMQ)
- PostgreSQL (database)

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```
The server will start with hot-reloading at `http://localhost:3001` (default).

## 📁 Structure

- `src/controllers`: Request handlers for projects, deployments, etc.
- `src/services`: Business logic and external integrations (Queue, Storage).
- `src/routes`: API route definitions.
- `src/lib`: Shared instances (e.g., Prisma, Auth).
