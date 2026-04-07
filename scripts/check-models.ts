import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  console.log("Checking API Key: ", process.env.GOOGLE_GENERATIVE_AI_API_KEY?.substring(0, 5) + "...");
  
  try {
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: 'say hi',
    });
    console.log("Gemini 1.5 Flash is working! Response: ", text);
  } catch (error: any) {
    console.error("Gemini 1.5 Flash Error:", error.message);
  }

  try {
    const { text } = await generateText({
      model: google('gemini-1.0-pro'),
      prompt: 'say hi',
    });
    console.log("Gemini 1.0 Pro is working! Response: ", text);
  } catch (error: any) {
    console.error("Gemini 1.0 Pro Error:", error.message);
  }
}

check();
