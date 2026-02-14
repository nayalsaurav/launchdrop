import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-guard";
import { CreateProjectSchema } from "@repo/types";
import { generateDomain } from "@repo/utils";

export async function GET(req: NextRequest) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const projects = await prisma.project.findMany({
            where: {
                userId: session.user.id,
                deletedAt: null,
            },
            include: {
                deployments: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1
                }
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
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
        const parsed = CreateProjectSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid input", details: parsed.error }, { status: 400 });
        }

        const { name, repoUrl } = parsed.data;

        const projectCount = await prisma.project.count({
            where: {
                userId: session.user.id,
            },
        });

        if (projectCount >= 5) {
            return NextResponse.json({
                error: "Project limit reached",
                message: "You can only have up to 5 projects.",
            }, { status: 403 });
        }

        async function createWithUniqueDomain(domain: string, attempts = 0): Promise<any> {
            try {
                return await prisma.project.create({
                    data: {
                        name,
                        repoUrl,
                        domain,
                        userId: session!.user.id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                });
            } catch (error: any) {
                if (error.code === "P2002" && attempts < 10) {
                    const nextDomain = generateDomain(name);
                    return createWithUniqueDomain(nextDomain, attempts + 1);
                }
                throw error;
            }
        }

        const initialDomain = generateDomain(name);
        const project = await createWithUniqueDomain(initialDomain);

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
