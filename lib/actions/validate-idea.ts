"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { db } from "@/db"
import { validations, user } from "@/db/schema"
import { generateText } from "ai"
import { model } from "@/lib/gemini"
import { nanoid } from "nanoid"
import { eq, sql } from "drizzle-orm"

interface ValidationInput {
  ideaDescription: string
  targetMarket?: string
  industry?: string
}

export async function validateIdea(input: ValidationInput) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new Error("Unauthorized")
  }

  const { ideaDescription, targetMarket, industry } = input

  const prompt = `
    You are an expert startup consultant and market analyst. 
    Analyze the following SaaS idea and provide a comprehensive validation report.
    
    Idea Description: ${ideaDescription}
    Target Market: ${targetMarket || "General SaaS Market"}
    Industry: ${industry || "Technology"}

    Respond ONLY with a JSON object in the following format:
    {
      "ideaTitle": "A catchy, professional name for the startup",
      "viabilityScore": 85, // Integer between 0-100
      "verdict": "hot", // "hot", "warm", or "cold"
      "marketSize": "Estimated market size with brief reasoning",
      "competitors": ["Comp A", "Comp B", "Comp C", "Comp D", "Comp E"],
      "risks": ["Risk 1", "Risk 2", "Risk 3"],
      "revenueModels": ["Model 1", "Model 2"],
      "fullReport": "A detailed 3-paragraph analysis of the idea's strengths, weaknesses, and next steps."
    }
  `

  try {
    const { text } = await generateText({
      model,
      prompt,
    })

    // Clean the text in case Gemini wraps it in ```json
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim()
    const result = JSON.parse(cleanedText)

    const id = nanoid()

    await db.insert(validations).values({
      id,
      userId: session.user.id,
      ideaTitle: result.ideaTitle,
      ideaDescription,
      industry,
      targetMarket,
      viabilityScore: result.viabilityScore,
      verdict: result.verdict,
      report: JSON.stringify(result)
    })

    // Increment user's validation count
    await db.update(user).set({
        validationsUsed: sql`${user.validationsUsed} + 1`
    }).where(eq(user.id, session.user.id))

    return { success: true, id }
  } catch (error) {
    console.error("Validation Error:", error)
    return { success: false, error: "Failed to validate idea. Please try again." }
  }
}
