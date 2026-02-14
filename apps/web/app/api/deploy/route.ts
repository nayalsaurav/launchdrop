import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-guard";
import { DeployInput } from "@repo/types";
import { addToBuildQueue } from "@/lib/queue";

export async function GET(req: NextRequest) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        if (project.userId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const deployments = await prisma.deployment.findMany({
            where: {
                projectId
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(deployments);
    } catch (error) {
         console.error("Error fetching deployments:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const DeployBodySchema = DeployInput.omit({ repoUrl: true });
        const parsed = DeployBodySchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({
                error: "Invalid request body",
                issues: parsed.error,
            }, { status: 400 });
        }

        const { projectId } = parsed.data;

        const project = await prisma.project.findUnique({
            where: { id: projectId }
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        if (project.userId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const deployment = await prisma.deployment.create({
            data: {
                projectId: project.id,
                status: "QUEUED",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        const deploymentId = deployment.id;
        const data = { 
            projectId: project.id,
            repoUrl: project.repoUrl,
            domain: project.domain,
            env: parsed.data.env || {}
        };
        
        await addToBuildQueue({ deploymentId, data });
        return NextResponse.json({
            deploymentId,
            data,
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating deployment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
