# @repo/config ⚙️

Centralized configuration and environment variable management for the LaunchDrop monorepo.

## 🚀 Features

- **Environment Validation**: Ensures all required environment variables are present and correct.
- **Unified Config**: Provides a consistent way to access configuration across API, Web, and Workers.
- **Type-Safe Access**: Prevents runtime errors by validating config at startup.

## 🛠️ Tech Stack

- **Runtime**: [TypeScript](https://www.typescriptlang.org/)
- **Validation**: [Zod](https://zod.dev/)

## 📁 Structure

- `src/`: Environment variable schemas and configuration loaders.
