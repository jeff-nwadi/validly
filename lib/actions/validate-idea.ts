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
  landingPage: z.object({
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    heroDescription: z.string().optional(),
    features: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
    socialProof: z.string().optional(),
    cta: z.string().optional(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    pricingCopy: z.string().optional(),
  }).optional(),
  pivotSuggestions: z.array(z.object({
    pivotTitle: z.string(),
    reason: z.string(),
    viabilityScore: z.number(),
    keyDifference: z.string(),
  })).optional(),
  socialKit: z.object({
    twitter: z.array(z.string()).optional(),
    linkedin: z.string().optional(),
    reddit: z.object({
      subreddit: z.string(),
      title: z.string(),
      body: z.string(),
    }).optional(),
    productHunt: z.object({
      tagline: z.string(),
      description: z.string(),
      firstComment: z.string(),
    }).optional(),
  }).optional(),
  fundraising: z.object({
    readinessScore: z.number().optional(),
    investorReadiness: z.string().optional(),
    keyMetricsNeeded: z.array(z.string()).optional(),
    pitchAngle: z.string().optional(),
    redFlags: z.array(z.string()).optional(),
    bestInvestorTypes: z.array(z.string()).optional(),
    estimatedValuation: z.string().optional(),
  }).optional(),
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
    You are a Senior Market Research Analyst and Venture Strategy Consultant with 20 years of experience in market validation and startup economics.
    
    Your tone is:
    - Clinical, objective, and analytically rigorous.
    - Brutally honest regarding market saturation and unit economics.
    - Specific and data-driven, leveraging the provided research context.
    - Strategic — focused on long-term viability and defensibility.

    STRICT CONSTRAINTS:
    - AVOID "vibe-coded" startup language (e.g., "Launch faster", "Seamlessly integrate", "Game-changing", "Revolutionize").
    - AVOID em-dash overuse and vague business promises.
    - USE professional terminologies like "Unit Economics", "Defensible Advantage", "Market Penetration".
    - EVERY suggestion must be grounded in the REAL market data provided.

    STRICT TYPE RULES:
    - ideaTitle: a short, catchy title for the startup idea
    - viabilityScore: a number between 0 and 100
    - verdict: exactly one of "hot", "warm", or "cold" (representing high, moderate, and stable/low interest)
    - verdictReason: a clinical, one-sentence executive summary of the verdict
    - honestVerdict: An Executive Analyst Verdict (2-3 paragraphs of rigorous analysis)
    - summary: a concise high-level synthesis of findings
    - marketSize: object with {tam: string, sam: string, som: string, trend: "growing"|"stable"|"shrinking"}
    - mvpFeatures: array of OBJECTS {title, description, priority}
    - risks: array of OBJECTS {description, severity, mitigation}
    - revenueModels: array of OBJECTS {name, description, recommended: boolean}
    - buildRoadmap: array of OBJECTS {week: number, tasks: string[]}
    - techStack: array of OBJECTS {category, tool, reason}
    - headlines: array of OBJECTS {text, angle}
    - socialKit: object with platform-ready launch content for twitter (array), linkedin, reddit (object), and productHunt (object)
    - fundraising: readiness score, investor readiness type, metrics needed, pitch angle, red flags, and best investor types

    ADDITIONAL SECTIONS TO INCLUDE:
    11. MARKET PENETRATION STRATEGY: 
    Specific channels, effort ratings ("Low"|"Medium"|"High"), and a 30-day timeline to acquire an initial cohort (n=100). For each channel, provide a 'howTo' that includes 3-5 granular, actionable tactics (e.g., "Join Subreddit X, contribute 5 value posts, then share Y").
    12. PIVOT SUGGESTIONS (only if viabilityScore < 65): 
    2-3 better versions of this idea with higher potential.
    13. LANDING PAGE COPY: 
    Complete copy for a landing page — headline, subheadline, features, CTA, FAQ.
    14. SOCIAL MEDIA LAUNCH KIT: 
    Ready-to-post content for Twitter, LinkedIn, Reddit and Product Hunt.
    15. FUNDRAISING READINESS: 
    Is this idea investor ready? Give a score out of 100 and specific advice.

    DO NOT return arrays of strings for any array field.
    DO NOT wrap response in any parent key.
    START with { and END with } (Valid JSON only)
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

    3. MARKET ENTRY TIMELINE:
    Provide a 4-week clinical roadmap. 
    Each week must contain 3-5 concrete operational tasks.
    AVOID generic growth hacks. Specific actions like:
    "Distribute value-prop within [Community Name] to validate [Feature X]..."
    "Execute direct outreach to [Persona Y] with a focus on [Pain Point Z]..."
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

    Return the full JSON report now following this exact structure:
    {
      "ideaTitle": "...",
      "viabilityScore": 0-100,
      "verdict": "hot" | "warm" | "cold",
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
        "growthChannels": [ { "channel": "...", "strategy": "...", "expectedROI": "...", "effort": "...", "howTo": "..." } ],
        "contentStrategy": "...",
        "pricingStrategy": "...",
        "partnershipOpportunities": ["..."]
      },
      "landingPage": {
        "headline": "...",
        "subheadline": "...",
        "heroDescription": "...",
        "features": [ { "title": "...", "description": "..." } ],
        "socialProof": "...",
        "cta": "...",
        "faq": [ { "question": "...", "answer": "..." } ],
        "pricingCopy": "..."
      },
      "pivotSuggestions": [ { "pivotTitle": "...", "reason": "...", "viabilityScore": 0-100, "keyDifference": "..." } ],
      "socialKit": {
        "twitter": ["..."],
        "linkedin": "...",
        "reddit": { "subreddit": "...", "title": "...", "body": "..." },
        "productHunt": { "tagline": "...", "description": "...", "firstComment": "..." }
      },
      "fundraising": {
        "readinessScore": 0-100,
        "investorReadiness": "...",
        "keyMetricsNeeded": ["..."],
        "pitchAngle": "...",
        "redFlags": ["..."],
        "bestInvestorTypes": ["..."],
        "estimatedValuation": "..."
      }
    }
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
        gtmStrategy: parsed.gtmStrategy || { launchPhase: "", growthChannels: [], contentStrategy: "", pricingStrategy: "", partnershipOpportunities: [] },
        landingPage: parsed.landingPage || { headline: "", subheadline: "", heroDescription: "", features: [], socialProof: "", cta: "", faq: [], pricingCopy: "" },
        pivotSuggestions: parsed.pivotSuggestions || [],
        socialKit: parsed.socialKit || { twitter: [], linkedin: "", reddit: { subreddit: "", title: "", body: "" }, productHunt: { tagline: "", description: "", firstComment: "" } },
        fundraising: parsed.fundraising || { readinessScore: 0, investorReadiness: "", keyMetricsNeeded: [], pitchAngle: "", redFlags: [], bestInvestorTypes: [], estimatedValuation: "" },
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
