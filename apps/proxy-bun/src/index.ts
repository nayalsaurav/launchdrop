import { env } from "@repo/config";

const STRIP_HEADERS = [
  "server",
  "cf-ray",
  "cf-cache-status",
  "cf-request-id",
  "x-amz-id-2",
  "x-amz-request-id",
  "x-amz-version-id",
  "x-content-type-options",
  "content-encoding",
  "content-length",
];

const PUBLIC_R2_URL = env.R2_PUBLIC_URL;

Bun.serve({
  port: 3001,

  async fetch(req) {
    try {
      const url = new URL(req.url);
      const host = req.headers.get("host") ?? "";
      const deploymentId = host.split(".")[0];

      // if (!deploymentId || deploymentId.includes("localhost")) {
      //   return new Response("Invalid deployment", { status: 400 });
      // }

      const path = url.pathname === "/" ? "/index.html" : url.pathname;
      const baseUrl = `${PUBLIC_R2_URL}/deployments/${deploymentId}/dist`;

      let upstream = await fetch(`${baseUrl}${path}`, {
        headers: {
          "accept-encoding": "identity",
        },
      });

      const isAsset = path.includes(".");

      if (upstream.status === 404 && !isAsset) {
        upstream = await fetch(`${baseUrl}/index.html`, {
          headers: {
            "accept-encoding": "identity",
          },
        });
      }

      if (!upstream.ok) {
        return new Response("Deployment not found", { status: 404 });
      }

      const headers = new Headers(upstream.headers);
      STRIP_HEADERS.forEach((h) => headers.delete(h));

      headers.set("server", "launchdock");
      headers.set("x-powered-by", "launchdock");

      const isHtml =
        headers.get("content-type")?.includes("text/html") ?? false;

      headers.set(
        "cache-control",
        isHtml
          ? "public, max-age=0, must-revalidate"
          : "public, max-age=31536000, immutable"
      );

      headers.set("x-frame-options", "DENY");
      headers.set("x-content-type-options", "nosniff");

      return new Response(upstream.body, {
        status: upstream.status,
        headers,
      });
    } catch (e) {
      console.error(e);
      return new Response("Proxy error", { status: 500 });
    }
  },
});

console.log("Proxy running at http://localhost:3001");
