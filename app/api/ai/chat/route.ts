import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, tasks } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format tasks for context so the AI can find IDs
    const tasksContext = tasks && tasks.length > 0 
      ? tasks.map((t: any) => `- ID: ${t.id} | Title: "${t.title}" | Status: ${t.status}`).join("\n")
      : "No current tasks available.";

    const prompt = `
      You are an AI task manager for "NextTask". 
      The current date is ${new Date().toLocaleDateString()}.
      
      Here are the user's current tasks (Use these IDs for updates/deletes):
      ${tasksContext}

      Your goal is to extract task information from the user's message.
      
      1. CREATE: If the user wants to create a task, return:
      {
        "intent": "create_task",
        "task": {
          "title": "string",
          "priority": "High" | "Medium" | "Low",
          "dueDate": "string (ISO format or relative string)",
          "project": "string"
        },
        "reply": "Confirmation message"
      }
      
      2. DELETE: If the user wants to delete a task, find the matching ID from the list above and return:
      {
        "intent": "delete_task",
        "taskId": "exact_id_string_from_context",
        "taskTitle": "title_of_task_found",
        "reply": "Confirmation question like 'Are you sure you want to delete [Task Name]?'"
      }

      3. UPDATE/COMPLETE: If the user wants to update (rename, change date, change priority) or complete a task, return:
      {
        "intent": "update_task",
        "taskId": "exact_id_string_from_context",
        "updates": {
           "status": "Completed" | "Pending" | "In Progress" (optional),
           "title": "new title" (optional),
           "priority": "High" | "Medium" | "Low" (optional)
        },
        "reply": "Confirmation message"
      }

      4. CHAT: If the user is just chatting or asking a question, return:
      {
        "intent": "chat",
        "reply": "Your helpful response"
      }

      User message: "${message}"
      
      Return ONLY the JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean potential markdown code blocks
    const cleanJson = text.replace(/```json|```/gi, "").trim();
    const data = JSON.parse(cleanJson);

    return NextResponse.json(data);
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}
