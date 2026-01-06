import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an AI task manager for "NextTask". 
      The current date is ${new Date().toLocaleDateString()}.
      
      Your goal is to extract task information from the user's message.
      If the user wants to create a task, return a JSON object with:
      {
        "intent": "create_task",
        "task": {
          "title": "string",
          "priority": "High" | "Medium" | "Low",
          "dueDate": "string (ISO format or relative string)",
          "project": "string"
        },
        "reply": "A helpful confirmation message"
      }
      
      If the user is just chatting or asking a question, return:
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
