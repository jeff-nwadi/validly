import { tavily } from '@tavily/core';

export const search = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});
