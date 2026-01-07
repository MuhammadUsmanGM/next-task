import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects, tasks } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch projects with task counts and progress
    const userProjects = await db.select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      createdAt: projects.createdAt,
      taskCount: sql<number>`count(${tasks.id})`.mapWith(Number),
      completedCount: sql<number>`count(case when ${tasks.status} = 'Completed' then 1 end)`.mapWith(Number),
    })
    .from(projects)
    .leftJoin(tasks, eq(projects.id, tasks.projectId))
    .where(eq(projects.userId, session.user.id))
    .groupBy(projects.id);

    const formattedProjects = userProjects.map(p => ({
        ...p,
        status: "Active", // Placeholder for now
        progress: p.taskCount > 0 ? Math.round((p.completedCount / p.taskCount) * 100) : 0,
        team: 1, // Placeholder for now
        color: "text-primary",
        bg: "bg-primary/10"
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Fetch Projects Error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name, description } = await req.json();

        const newProject = await db.insert(projects).values({
            id: crypto.randomUUID(),
            name,
            description,
            userId: session.user.id,
        }).returning();

        return NextResponse.json(newProject[0]);
    } catch (error) {
        console.error("Create Project Error:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
