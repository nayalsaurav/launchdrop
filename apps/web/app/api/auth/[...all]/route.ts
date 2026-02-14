import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

import { NextRequest, NextResponse } from "next/server";
import { rateLimit, globalRateLimit } from "@/lib/ratelimit";

const { GET: authGET, POST: authPOST } = toNextJsHandler(auth);

async function withRateLimit(req: NextRequest, handler: (req: NextRequest) => Promise<Response>) {
    const { success } = await globalRateLimit(req);

    if (!success) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    return handler(req);
}

export const GET = (req: NextRequest) => withRateLimit(req, authGET);
export const POST = (req: NextRequest) => withRateLimit(req, authPOST);
