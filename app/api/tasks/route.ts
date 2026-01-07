import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userTasks = await db.select()
      .from(tasks)
      .where(eq(tasks.userId, session.user.id))
      .orderBy(desc(tasks.createdAt));

    return NextResponse.json(userTasks);
  } catch (error) {
    console.error("Fetch Tasks Error:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    await db.delete(tasks)
        .where(eq(tasks.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Task Error:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, ...updates } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    // Filter out undefined values
    const safeUpdates: any = {};
    if (updates.title) safeUpdates.title = updates.title;
    if (updates.description) safeUpdates.description = updates.description;
    if (updates.priority) safeUpdates.priority = updates.priority;
    if (updates.status) safeUpdates.status = updates.status;
    if (updates.dueDate) safeUpdates.dueDate = new Date(updates.dueDate);
    if (updates.projectId) safeUpdates.projectId = updates.projectId;
    
    safeUpdates.updatedAt = new Date();

    await db.update(tasks)
        .set(safeUpdates)
        .where(eq(tasks.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update Task Error:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
