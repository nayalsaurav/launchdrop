import { NextRequest, NextResponse } from "next/server";
import { rateLimit, globalRateLimit } from "@/lib/ratelimit";

export async function GET(req: NextRequest) {
    const { success } = await globalRateLimit(req);

    if (!success) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    return NextResponse.json({ status: "ok" });
}
