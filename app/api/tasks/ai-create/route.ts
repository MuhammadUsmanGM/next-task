import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, priority, dueDate, project } = await req.json();

    await db.insert(tasks).values({
      id: crypto.randomUUID(),
      title,
      priority: (priority as any) || "Medium",
      status: "Pending",
      dueDate: dueDate && !isNaN(Date.parse(dueDate)) ? new Date(dueDate) : null,
      userId: session.user.id,
      projectId: project && project !== "General" ? project : null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Task Creation Error:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
