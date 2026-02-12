const SECURITY_HEADERS = {
  'content-security-policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https:;
    font-src 'self' data:;
    connect-src 'self' https:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\n/g, ''),
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
};

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		const url = new URL(req.url);
		const { pathname } = url;

		if (pathname.startsWith('/.well-known/')) {
			return new Response(null, { status: 404 });
		}

		const deploymentId = url.hostname.split('.', 1)[0];
		const filePath = pathname === '/' ? '/index.html' : pathname;
		const keyBase = `deployments/${deploymentId}/dist`;

		let object = await env.BUCKET.get(`${keyBase}${filePath}`, {
			onlyIf: req.headers,
		});

		if (!object && !filePath.includes('.')) {
			object = await env.BUCKET.get(`${keyBase}/index.html`, {
				onlyIf: req.headers,
			});
		}

		if (!object) {
			return new Response('404 - Deployment not found', {
				status: 404,
				headers: { server: 'launchdock' },
			});
		}

		const headers = new Headers();

		object.writeHttpMetadata(headers);

		headers.set('server', 'launchdock');
		headers.set('cache-control', 'public, max-age=31536000, immutable');

		if (object.httpEtag) {
			headers.set('etag', object.httpEtag);
		}

		if (!('body' in object)) {
			return new Response(null, {
				status: 304,
				headers,
			});
		}

		Object.entries(SECURITY_HEADERS).forEach(([k, v]) => headers.set(k, v));

		return new Response(object.body, { headers });
	},
};
