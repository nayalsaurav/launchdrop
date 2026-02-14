import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-guard";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const deployment = await prisma.deployment.findUnique({
            where: { id },
        });

        if (!deployment) {
            return NextResponse.json({ error: "Deployment not found" }, { status: 404 });
        }

        const project = await prisma.project.findUnique({
            where: { id: deployment.projectId }
        });

        if (!project || project.userId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json({ status: deployment.status });
    } catch (error) {
         console.error("Error fetching deployment status:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
