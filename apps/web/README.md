# LaunchDrop Dashboard 💻

The user-facing dashboard for LaunchDrop, providing a modern interface to manage static site deployments.

## 🚀 Features

- **Project Overview**: View and manage all your deployed applications.
- **Deployment Tracking**: Real-time status updates for ongoing builds.
- **Project Settings**: Configure domains and environment variables.
- **Responsive Design**: Fully optimized for both desktop and mobile users.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

## 🏁 Getting Started

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```
Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Structure

- `app/`: Next.js pages and layouts (Dashboard, Settings, Auth).
- `components/`: Reusable React components (Dashboard widgets, UI primitives).
- `hooks/`: Custom React hooks for data fetching and UI logic.
- `lib/`: Utility functions and shared instances.
