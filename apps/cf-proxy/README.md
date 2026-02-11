# LaunchDrop Edge Proxy 🌐

A high-performance edge proxy built as a Cloudflare Worker, serving user applications globally with ultra-low latency.

## 🚀 Features

- **Global Edge Serving**: Leveraged Cloudflare's network to serve assets from the nearest data center.
- **R2 Integration**: Directly fetches and streams site content from Cloudflare R2 storage.
- **Dynamic Routing**: Maps custom domains and subdomains to specific project deployments.
- **Custom 404s**: Serves custom 404 pages for missed routes.

## 🛠️ Tech Stack

- **Platform**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Infrastructure Tooling**: [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **Storage**: [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/)

## 🏁 Getting Started

### Prerequisites

- Cloudflare account with R2 enabled
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-setup/) installed and authenticated

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

### Deployment

```bash
bun run deploy
```

## 📄 Configuration

Wrangler configuration is managed in `wrangler.jsonc`. Ensure your R2 bucket bindings are correctly configured for both development and production environments.
