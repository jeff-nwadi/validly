import { createAnthropic } from '@ai-sdk/anthropic';
import dotenv from 'dotenv';
dotenv.config();

export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const model = anthropic('claude-3-5-sonnet-latest');
