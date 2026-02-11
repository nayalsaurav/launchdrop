# @repo/types 🏷️

Shared TypeScript types and Zod schemas used across the LaunchDrop monorepo to ensure end-to-end type safety and data validation.

## 🚀 Features

- **Centralized Types**: Common interfaces for Projects, Deployments, and Users.
- **Zod Validation**: Reusable schemas for API inputs and configuration files.
- **Consistent Data Shapes**: Ensures that the Dashboard, API, and Worker are always in sync.

## 🛠️ Tech Stack

- **Runtime**: [TypeScript](https://www.typescriptlang.org/)
- **Validation**: [Zod](https://zod.dev/)

## 🏁 Usage

Import types or schemas directly from the package:

```typescript
import { DeployInputType, DeployInput } from "@repo/types";

// Use for validation
const result = DeployInput.safeParse(data);

// Use as a type
function processDeployment(data: DeployInputType) { ... }
```

## 📁 Structure

- `src/index.ts`: Main entry point exporting all shared types and schemas.
