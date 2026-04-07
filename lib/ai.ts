import { createOpenAI } from "@ai-sdk/openai"
import dotenv from "dotenv"

dotenv.config()

export const groqProvider = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY!
})

// @ts-ignore - Bypass AI SDK typing to pass structuredOutputs: false physically
export const model = groqProvider("llama-3.3-70b-versatile", {
  structuredOutputs: false,
})
