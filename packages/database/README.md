# @repo/database 🗄️

Centralized data layer for LaunchDrop, managing the PostgreSQL schema, migrations, and providing a type-safe Prisma client.

## 🚀 Features

- **Prisma Client**: Auto-generated, type-safe client for all applications.
- **Schema Management**: Single source of truth for the database structure.
- **Migrations**: Managed SQL migrations for reliable database updates.

## 🛠️ Tech Stack

- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

## 🏁 Getting Started

### Installation

```bash
bun install
```

### Configuration

Ensure `DATABASE_URL` is set in your environment variables.

### Common Commands

- `bun prisma generate`: Regenerate the Prisma client.
- `bun prisma db push`: Sync the schema with the database (development).
- `bun prisma migrate dev`: Create and run a new migration.
- `bun prisma studio`: Open the Prisma visual database explorer.

## 📁 Structure

- `prisma/schema.prisma`: The core data model definition.
- `src/`: Client initialization and shared database utilities.
