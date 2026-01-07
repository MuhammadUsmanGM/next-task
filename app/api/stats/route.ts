import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/db/schema";
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

    // Task distribution
    const distribution = await db.select({
      status: tasks.status,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(tasks)
    .where(eq(tasks.userId, session.user.id))
    .groupBy(tasks.status);

    // Productivity trend (last 12 months)
    const trend = await db.select({
      month: sql<string>`to_char(${tasks.createdAt}, 'Mon')`,
      sort: sql<number>`extract(month from ${tasks.createdAt})`,
      completed: sql<number>`count(case when ${tasks.status} = 'Completed' then 1 end)`.mapWith(Number),
      total: sql<number>`count(*)`.mapWith(Number),
    })
    .from(tasks)
    .where(eq(tasks.userId, session.user.id))
    .groupBy(sql`to_char(${tasks.createdAt}, 'Mon')`, sql`extract(month from ${tasks.createdAt})`)
    .orderBy(sql`extract(month from ${tasks.createdAt})`);

    // Overall metrics
    const totalTasks = await db.select({ count: sql<number>`count(*)`.mapWith(Number) }).from(tasks).where(eq(tasks.userId, session.user.id));
    const completedTasks = await db.select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(tasks)
      .where(sql`${tasks.userId} = ${session.user.id} AND ${tasks.status} = 'Completed'`);
    
    const efficiency = totalTasks[0].count > 0 ? Math.round((completedTasks[0].count / totalTasks[0].count) * 100) : 0;

    return NextResponse.json({
      distribution,
      trend,
      metrics: {
        total: totalTasks[0].count,
        completed: completedTasks[0].count,
        efficiency
      }
    });
  } catch (error) {
    console.error("Fetch Stats Error:", error);
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
  }
}
