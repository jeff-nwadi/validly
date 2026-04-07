"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { db } from "@/db"
import { validations, user } from "@/db/schema"
import { groq } from "@/lib/groq-client"
import { search } from "@/lib/tavily"
import { nanoid } from "nanoid"
import { eq, sql } from "drizzle-orm"
import { z } from "zod"
import dotenv from 'dotenv'

dotenv.config()

// Helper to handle mixed string/number inputs for market data
const stringOrNumber = z.preprocess((val) => String(val), z.string());

const reportSchema = z.object({
  ideaTitle: z.string(),
  viabilityScore: z.number().min(0).max(100),
  verdict: z.enum(["hot", "warm", "cold"]),
  verdictReason: z.string(),
  honestVerdict: z.string(),
  summary: z.string(),
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
  // PROCESSED ARRAYS: If the AI returns strings, we convert them to objects
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

    const [
      competitorSearch,
      marketSearch,
      audienceSearch,
      redditSearch,
      trendSearch
    ] = await Promise.all([
      search.search(`best ${industry || 'SaaS'} startups competitors ${currentYear} ${nextYear}`, { 
        searchDepth: "advanced", 
        maxResults: 7 
      }),
      search.search(`${ideaDescription} market size revenue statistics ${nextYear}`, { 
        searchDepth: "advanced", 
        maxResults: 5 
      }),
      search.search(`${ideaDescription} target customers problems pain points`, { 
        searchDepth: "advanced", 
        maxResults: 5 
      }),
      search.search(`${ideaDescription} reddit complaints frustrations`, { 
        searchDepth: "advanced", 
        maxResults: 5 
      }),
      search.search(`${industry || 'tech'} startup trends growth ${nextYear}`, { 
        searchDepth: "advanced", 
        maxResults: 5 
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
    You are a world-class startup strategist, product consultant, 
    and growth advisor with 20 years of experience helping 
    founders validate and launch successful startups.

    Your analysis must be:
    - Brutally honest — do not sugarcoat
    - Highly specific — no generic advice
    - Data-driven — use the research provided
    - Actionable — every suggestion must be something 
      the founder can do TODAY

    STRICT TYPE RULES:
    - marketSize.tam, sam, som: strings like "$5B" not numbers
    - marketSize.trend: exactly "growing", "stable", or "shrinking"
    - mvpFeatures: array of OBJECTS {title, description, priority}
    - risks: array of OBJECTS {description, severity, mitigation}
    - revenueModels: array of OBJECTS {name, description, recommended}
    - buildRoadmap: array of OBJECTS {week, tasks[]}
    - techStack: array of OBJECTS {category, tool, reason}
    - headlines: array of OBJECTS {text, angle}
    - firstCustomers: array of OBJECTS {where, how, message}
    - competitors: array of OBJECTS {name, url, strength, weakness, keyDifference}

    DO NOT return arrays of strings for any array field.
    DO NOT wrap response in any parent key.
    START with { and END with }
  `

  const userContent = `
    Analyze this startup idea in extreme detail:

    IDEA: "${ideaDescription}"
    TARGET MARKET: ${targetMarket || "General consumers"}
    INDUSTRY: ${industry || "Technology"}

    === REAL COMPETITOR DATA FROM WEB ===
    ${JSON.stringify(competitorData, null, 2)}

    === REAL MARKET DATA ===
    ${JSON.stringify(marketData, null, 2)}

    === CUSTOMER PAIN POINTS (Reddit/Community) ===
    ${JSON.stringify(redditData, null, 2)}

    === INDUSTRY TRENDS 2026 ===
    ${JSON.stringify(trendData, null, 2)}

    === YOUR TASKS ===

    1. COMPETITORS: 
    Using ONLY the real competitor data above, identify the top 5 
    actual competing products or companies. For each competitor:
    - Use their REAL name and REAL website URL from the search results
    - Describe what they actually do
    - Identify their REAL weakness based on the search data
    - Explain exactly how this idea can beat them

    2. MARKET SIZE:
    Using the market data above, give REAL estimated figures for 
    TAM, SAM, SOM. Cite specific numbers from the research.

    3. GROWTH STRATEGY:
    Give a specific week-by-week 4-week launch plan. 
    Each week must have 3-5 concrete, actionable tasks.
    Not generic advice — specific actions like:
    "Post in r/entrepreneur with this exact angle..."
    "Cold email 20 pet store owners using this template..."
    "Set up a waitlist using Tally.so and promote on..."

    4. FIRST 10 CUSTOMERS:
    Be extremely specific. Name the exact:
    - Communities (subreddits, Facebook groups, Discord servers)
    - Platforms (ProductHunt, IndieHackers, Twitter)
    - Outreach message template they can copy and use today

    5. TECH STACK:
    Recommend the exact tools for this specific idea.
    Don't recommend generic tools — think about what this 
    specific type of product actually needs.

    6. LANDING PAGE HEADLINES:
    Write 3 compelling headlines specifically for this idea.
    Each should target a different angle:
    - Pain (what problem it solves)
    - Desire (what outcome they get)  
    - Curiosity (makes them want to know more)

    7. HONEST VERDICT:
    Tell the founder the truth. What most advisors won't say.
    What are the real challenges? Is the timing right?
    What would make this fail? What would make it succeed?

    Return the full JSON report now.
  `

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userContent },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.1,
    });

    const text = completion.choices[0]?.message?.content || "{}";
    const rawObject = JSON.parse(text);

    // Filter potential top-level nesting if model ignores instructions
    let finalObject = rawObject;
    if (!rawObject.ideaTitle && rawObject.report) finalObject = rawObject.report;

    const parsed = reportSchema.parse(finalObject);

    // After parsing, clean up competitors
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
        targetAudience: (parsed.targetAudience || []).map(p => ({ ...p, painPoints: p.painPoints || [] })),
        mvpFeatures: parsed.mvpFeatures || [],
        risks: parsed.risks || [],
        revenueModels: parsed.revenueModels || [],
        buildRoadmap: (parsed.buildRoadmap || []).map(w => ({ ...w, tasks: w.tasks || [] })),
        techStack: parsed.techStack || [],
        headlines: parsed.headlines || [],
        firstCustomers: parsed.firstCustomers || [],
        mvpScope: parsed.mvpScope || { mustHave: [], niceToHave: [], dontBuild: [] },
        marketInsights: parsed.marketInsights || [],
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
