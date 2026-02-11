# @repo/ui 🎨

A curated collection of reusable UI components for the LaunchDrop dashboard, built on top of Radix UI and styled with Tailwind CSS.

## 🚀 Features

- **shadcn/ui Based**: Leverages high-quality, accessible primitives.
- **Tailwind Ready**: Fully customizable using Tailwind utility classes.
- **Consistent Design Language**: Ensures a unified look and feel across all applications.
- **Dark Mode Support**: Built-in support for theme switching.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Primitives**: [Radix UI](https://www.radix-ui.com/) / [Base UI](https://base-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Usage

Import components directly:

```tsx
import { Button } from "@repo/ui/button";

export function MyComponent() {
  return <Button variant="primary">Click Me</Button>;
}
```

## 📁 Structure

- `src/components/`: Reusable UI components (Button, Input, Card, etc.).
- `src/lib/`: Internal UI utilities.
