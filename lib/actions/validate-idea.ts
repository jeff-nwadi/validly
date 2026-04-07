"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { db } from "@/db"
import { validations, user } from "@/db/schema"
import Groq from "groq-sdk"
import { search } from "@/lib/tavily"
import { nanoid } from "nanoid"
import { eq, sql } from "drizzle-orm"
import { z } from "zod"
import dotenv from 'dotenv'

dotenv.config()

// Helper to handle mixed string/number inputs for market data
const stringOrNumber = z.preprocess((val) => String(val), z.string());

const reportSchema = z.object({
  ideaTitle: z.string().default("Untitled Idea Analysis"),
  viabilityScore: z.coerce.number().min(0).max(100).default(50),
  verdict: z.enum(["hot", "warm", "cold"]).default("warm"),
  verdictReason: z.string().default("General assessment based on limited data."),
  honestVerdict: z.string().default("No honest assessment provided."),
  summary: z.string().default("No summary provided."),
  marketSize: z.object({
    tam: stringOrNumber.optional(),
    sam: stringOrNumber.optional(),
    som: stringOrNumber.optional(),
    trend: z.string().optional(),
  }).optional(),
  competitors: z.array(z.object({
    id: z.string().optional(),
    name: z.string(),
    url: z.string().optional(),
    keyDifference: z.string().optional(),
    strength: z.string().optional(),
    weakness: z.string().optional(),
  })).optional(),
  targetAudience: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    painPoints: z.array(z.string()).optional(),
  })).optional(),
  mvpFeatures: z.preprocess((val) => 
    Array.isArray(val) ? val.map(v => typeof v === 'string' ? { title: v, description: "" } : v) : val,
    z.array(z.object({ title: z.string(), description: z.string().optional() }))
  ).optional(),
  risks: z.preprocess((val) => 
    Array.isArray(val) ? val.map(v => typeof v === 'string' ? { category: "Market", description: v } : v) : val,
    z.array(z.object({ category: z.string().optional(), description: z.string() }))
  ).optional(),
  revenueModels: z.preprocess((val) => 
    Array.isArray(val) ? val.map(v => typeof v === 'string' ? { name: v, description: "" } : v) : val,
    z.array(z.object({ name: z.string(), description: z.string().optional(), recommended: z.boolean().optional() }))
  ).optional(),
  buildRoadmap: z.preprocess((val) => 
    Array.isArray(val) ? val.map((v, i) => typeof v === 'string' ? { week: i + 1, tasks: [v] } : v) : val,
    z.array(z.object({ week: z.number().optional(), tasks: z.array(z.string()).optional() }))
  ).optional(),
  techStack: z.preprocess((val) => 
    Array.isArray(val) ? val.map(v => typeof v === 'string' ? { category: "Core", tool: v } : v) : val,
    z.array(z.object({ category: z.string().optional(), tool: z.string(), reason: z.string().optional() }))
  ).optional(),
  headlines: z.preprocess((val) => 
    Array.isArray(val) ? val.map(v => typeof v === 'string' ? { text: v } : v) : val,
    z.array(z.object({ text: z.string(), angle: z.string().optional() }))
  ).optional(),
  firstCustomers: z.preprocess((val) => 
    Array.isArray(val) ? val.map(v => typeof v === 'string' ? { where: v, how: "Direct outreach" } : v) : val,
    z.array(z.object({ where: z.string(), how: z.string().optional(), message: z.string().optional() }))
  ).optional(),
  mvpScope: z.object({
    mustHave: z.array(z.string()).optional(),
    niceToHave: z.array(z.string()).optional(),
    dontBuild: z.array(z.string()).optional(),
  }).optional(),
  marketInsights: z.array(z.string()).optional(),
  gtmStrategy: z.object({
    launchPhase: z.string().optional(),
    growthChannels: z.array(z.object({
      channel: z.string(),
      strategy: z.string(),
      expectedROI: z.string().optional(),
      effort: z.string().optional(),
      howTo: z.string().optional(),
    })).optional(),
    contentStrategy: z.string().optional(),
    pricingStrategy: z.string().optional(),
    partnershipOpportunities: z.array(z.string()).optional(),
  }).optional(),
  pivotSuggestions: z.array(z.object({
    pivotTitle: z.string(),
    reason: z.string(),
    viabilityScore: z.number(),
    keyDifference: z.string(),
  })).optional(),
})

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

  let searchContext = "No real-time market data available.";
  let competitorData: { title: string; url: string; snippet: string }[] = [];
  let marketData: { title: string; snippet: string; url: string }[] = [];
  let redditData: { title: string; snippet: string }[] = [];
  let trendData: { title: string; snippet: string }[] = [];

  try {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    // Optimized search parameters to reduce tokens
    const [
      competitorSearch,
      marketSearch,
      audienceSearch,
      redditSearch,
      trendSearch
    ] = await Promise.all([
      search.search(`best ${industry || 'SaaS'} startups competitors ${currentYear} ${nextYear}`, { 
        searchDepth: "advanced", 
        maxResults: 3 // Reduced 
      }),
      search.search(`${ideaDescription} market size revenue statistics ${nextYear}`, { 
        searchDepth: "advanced", 
        maxResults: 2 // Reduced
      }),
      search.search(`${ideaDescription} target customers problems pain points`, { 
        searchDepth: "advanced", 
        maxResults: 2 // Reduced
      }),
      search.search(`${ideaDescription} reddit complaints frustrations`, { 
        searchDepth: "advanced", 
        maxResults: 2 // Reduced
      }),
      search.search(`${industry || 'tech'} startup trends growth ${nextYear}`, { 
        searchDepth: "advanced", 
        maxResults: 2 // Reduced
      }),
    ]);

    competitorData = competitorSearch.results.map(r => ({
      title: r.title,
      url: r.url,
      snippet: r.content,
    }));

    marketData = marketSearch.results.map(r => ({
      title: r.title,
      snippet: r.content,
      url: r.url,
    }));

    redditData = redditSearch.results.map(r => ({
      title: r.title,
      snippet: r.content,
    }));

    trendData = trendSearch.results.map(r => ({
      title: r.title,
      snippet: r.content,
    }));

    searchContext = JSON.stringify({
      competitors: competitorData,
      market: marketData,
      audience: audienceSearch.results.map(r => ({ title: r.title, snippet: r.content })),
      reddit: redditData,
      trends: trendData
    });
  } catch (error) {
    console.error("Tavily Error:", error);
  }

  const systemContent = `
    You are a Senior Market Research Analyst and Venture Strategy Consultant with 20 years of experience in market validation and startup economics.
    
    Your tone is:
    - Clinical, objective, and analytically rigorous.
    - Specific and data-driven, leveraging the provided research context.
    - Strategic — focused on long-term viability and defensibility.

    STRICT CONSTRAINTS:
    - AVOID "vibe-coded" startup language.
    - USE professional terminologies like "Unit Economics", "Defensible Advantage", "Market Penetration".
    - EVERY suggestion must be grounded in the REAL market data provided.

    STRICT TYPE RULES:
    - ideaTitle: short title
    - viabilityScore: 0-100
    - verdict: "hot"|"warm"|"cold"
    - verdictReason: one clinical sentence
    - honestVerdict: 2-3 paragraphs analyst verdict
    - marketSize: {tam: string, sam: string, som: string, trend: string}
    - mvpFeatures: array of {title, description}
    - risks: array of {description, mitigation}
    - revenueModels: array of {name, description, recommended}
    - buildRoadmap: array of {week, tasks}
    - techStack: array of {category, tool, reason}
    - headlines: array of {text, angle}

    ADDITIONAL SECTIONS:
    11. GTM STRATEGY: 
    Specific channels and tactics (3-5 granular items).
    12. PIVOT SUGGESTIONS (only if viabilityScore < 65): 
    2-3 better versions of this idea.

    DO NOT return arrays of strings.
    Valid JSON only.
  `

  const userContent = `
    Analyze this startup idea:
    IDEA: "${ideaDescription}"
    TARGET MARKET: ${targetMarket || "General consumers"}
    INDUSTRY: ${industry || "Technology"}

    === CONTEXT ===
    ${searchContext}

    Return JSON matching this exactly:
    {
      "ideaTitle": "...",
      "viabilityScore": 0-100,
      "verdict": "hot"|"warm"|"cold",
      "verdictReason": "...",
      "honestVerdict": "...",
      "summary": "...",
      "marketSize": { "tam": "...", "sam": "...", "som": "...", "trend": "..." },
      "competitors": [ { "name": "...", "url": "...", "strength": "...", "weakness": "...", "keyDifference": "..." } ],
      "targetAudience": [ { "title": "...", "description": "...", "painPoints": ["..."] } ],
      "mvpFeatures": [ { "title": "...", "description": "...", "priority": "..." } ],
      "risks": [ { "description": "...", "severity": "...", "mitigation": "..." } ],
      "revenueModels": [ { "name": "...", "description": "...", "recommended": true|false } ],
      "buildRoadmap": [ { "week": 1-4, "tasks": ["..."] } ],
      "techStack": [ { "category": "...", "tool": "...", "reason": "..." } ],
      "headlines": [ { "text": "...", "angle": "..." } ],
      "firstCustomers": [ { "where": "...", "how": "...", "message": "..." } ],
      "mvpScope": { "mustHave": ["..."], "niceToHave": ["..."], "dontBuild": ["..."] },
      "marketInsights": ["..."],
      "gtmStrategy": {
        "launchPhase": "...",
        "growthChannels": [ { "channel": "...", "strategy": "...", "howTo": "..." } ],
        "contentStrategy": "...",
        "pricingStrategy": "..."
      },
      "pivotSuggestions": [ { "pivotTitle": "...", "reason": "...", "viabilityScore": 0-100, "keyDifference": "..." } ]
    }
  `

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userContent }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.1,
    });
    
    let parsed: any = {};
    try {
      parsed = JSON.parse(completion.choices[0]?.message?.content || "{}");
    } catch(e) {
      console.error("JSON parse error from groq", e);
    }

    const cleanedCompetitors = parsed.competitors?.map((c: any, i: number) => ({
      id: `comp-${i}`,
      name: typeof c === 'string' ? c : c.name || "Unknown",
      url: typeof c === 'string' ? '' : c.url || "",
      strength: typeof c === 'string' ? '' : c.strength || "",
      weakness: typeof c === 'string' ? '' : c.weakness || "",
      keyDifference: typeof c === 'string' ? '' : 
        c.keyDifference || c.weakness || "",
    })) || []

    const object = {
        ...parsed,
        competitors: cleanedCompetitors,
        marketSize: parsed.marketSize || { tam: "N/A", sam: "N/A", som: "N/A", trend: "stable" },
        targetAudience: (parsed.targetAudience || []).map((p: any) => ({ ...p, painPoints: p.painPoints || [] })),
        mvpFeatures: parsed.mvpFeatures || [],
        risks: parsed.risks || [],
        revenueModels: parsed.revenueModels || [],
        buildRoadmap: (parsed.buildRoadmap || []).map((w: any) => ({ ...w, tasks: w.tasks || [] })),
        techStack: parsed.techStack || [],
        headlines: parsed.headlines || [],
        firstCustomers: (parsed as any).firstCustomers || [],
        mvpScope: (parsed as any).mvpScope || { mustHave: [], niceToHave: [], dontBuild: [] },
        marketInsights: (parsed as any).marketInsights || [],
        gtmStrategy: (parsed as any).gtmStrategy || { launchPhase: "", growthChannels: [], contentStrategy: "", pricingStrategy: "" },
        pivotSuggestions: parsed.pivotSuggestions || [],
    };

    const id = nanoid()

    await db.insert(validations).values({
      id,
      userId: session.user.id,
      ideaTitle: object.ideaTitle,
      ideaDescription,
      industry,
      targetMarket,
      viabilityScore: object.viabilityScore,
      verdict: object.verdict,
      report: JSON.stringify(object)
    })

    await db.update(user).set({
        validationsUsed: sql`${user.validationsUsed} + 1`
    }).where(eq(user.id, session.user.id))

    return { success: true, id }
  } catch (error: any) {
    console.error("VALIDATION CRASH:", error);
    return { success: false, error: `Crash: ${error.message}` }
  }
}

