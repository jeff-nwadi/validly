"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { db } from "@/db"
import { validations } from "@/db/schema"
import Groq from "groq-sdk"
import { eq } from "drizzle-orm"

export async function chatWithReport(reportId: string, messages: { role: "user" | "assistant", content: string }[]) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new Error("Unauthorized")
  }

  const report = await db.query.validations.findFirst({
    where: eq(validations.id, reportId)
  });

  if (!report || report.userId !== session.user.id) {
    throw new Error("Report not found")
  }

  const systemContent = `
    You are Validly AI, a world-class startup advisor. 
    You are helping a founder with their startup idea: "${report.ideaTitle}".
    
    REPORT DATA CONTEXT:
    ${report.report}
    
    USER IDEA DESCRIPTION:
    ${report.ideaDescription}

    YOUR GOAL:
    - Answer follow-up questions about the report.
    - Provide specific, actionable advice for their market.
    - Help them pivot, scale, or launch based on the data.
    - Be brutally honest but supportive.
    - Keep answers concise and high-impact.
  `;

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const transformedMessages = messages.map(m => ({ 
      role: m.role, 
      content: m.content 
    })) as any[];

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemContent },
        ...transformedMessages
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    return { 
      success: true, 
      message: completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response." 
    }
  } catch (error: any) {
    console.error("CHAT ERROR:", error);
    return { success: false, error: error.message }
  }
}
