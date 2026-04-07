"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Target,
  Users,
  Lightbulb,
  ExternalLink,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3,
  FileText,
  ShieldCheck,
  Circle,
  Thermometer,
  DollarSign,
  User,
  Milestone,
  Wrench,
  Type,
  Presentation,
  ListChecks,
  Lock,
  ArrowRightCircle,
  Share2,
  Flag,
  Crosshair,
  Megaphone,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatWithReport } from "@/lib/actions/chat-with-report";
import { ChevronDown, Send, Copy, Ghost, MessagesSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export interface Competitor {
  id: string;
  name: string;
  url: string;
  keyDifference: string;
  strength: string;
  weakness: string;
}

export interface MVPFeature {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  timeline: string;
}

export interface Risk {
  id: string;
  category: string;
  description: string;
  severity: "high" | "medium" | "low";
  mitigation: string;
}

export interface MarketSize {
  tam: string;
  sam: string;
  som: string;
  trend: "growing" | "stable" | "shrinking";
}

export interface Persona {
  type: "primary" | "secondary";
  title: string;
  description: string;
  painPoints: string[];
}

export interface RevenueModel {
  id: string;
  name: string;
  description: string;
  recommended: boolean;
}

export interface WeekTask {
  week: number;
  tasks: string[];
}

export interface StackItem {
  category: string;
  tool: string;
  reason: string;
}

export interface Headline {
  text: string;
  angle: string;
}

export interface Customer {
  where: string;
  how: string;
  message: string;
}

export interface MVPScope {
  mustHave: string[];
  niceToHave: string[];
  dontBuild: string[];
}

export interface ReportData {
  id: string;
  ideaTitle: string;
  viabilityScore: number;
  verdict: "hot" | "warm" | "cold";
  verdictReason: string;
  honestVerdict: string;
  generatedAt: string;
  summary: string;
  marketSize: MarketSize;
  competitors: Competitor[];
  targetAudience: Persona[];
  mvpFeatures: MVPFeature[];
  risks: Risk[];
  revenueModels: RevenueModel[];
  buildRoadmap: WeekTask[];
  techStack: StackItem[];
  headlines: Headline[];
  firstCustomers: Customer[];
  mvpScope: MVPScope;
  marketInsights: string[];
  gtmStrategy: {
    launchPhase: string;
    growthChannels: { channel: string; strategy: string; expectedROI: string; effort: string; howTo: string }[];
    contentStrategy: string;
    pricingStrategy: string;
    partnershipOpportunities: string[];
  };
  landingPage: {
    headline: string;
    subheadline: string;
    heroDescription: string;
    features: { title: string; description: string }[];
    socialProof: string;
    cta: string;
    faq: { question: string; answer: string }[];
    pricingCopy: string;
  };
  pivotSuggestions: { pivotTitle: string; reason: string; viabilityScore: number; keyDifference: string }[];
  socialKit: {
    twitter: string[];
    linkedin: string;
    reddit: { subreddit: string; title: string; body: string };
    productHunt: { tagline: string; description: string; firstComment: string };
  };
  fundraising: {
    readinessScore: number;
    investorReadiness: string;
    keyMetricsNeeded: string[];
    pitchAngle: string;
    redFlags: string[];
    bestInvestorTypes: string[];
    estimatedValuation: string;
  };
  isPro?: boolean;
}

interface ReportSystemProps {
  reportData: ReportData;
  onExportPDF?: () => void;
}

const VerdictBadge: React.FC<{ verdict: "hot" | "warm" | "cold" }> = ({ verdict }) => {
  const config = {
    hot: { icon: Circle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", label: "High" },
    warm: { icon: Circle, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20", label: "Moderate" },
    cold: { icon: Circle, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", label: "Stable" },
  }[verdict];

  const Icon = config.icon;

  return (
    <Badge variant="outline" className={cn("gap-1.5 px-3 py-1.5 text-base font-semibold border", config.color, config.bg, config.border)}>
      <Icon className="w-4 h-4" />
      {config.label}
    </Badge>
  );
};

const ViabilityGauge: React.FC<{ score: number }> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "Strong";
    if (score >= 50) return "Moderate";
    return "Weak";
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-48 h-48">
        <svg className="transform -rotate-90 w-48 h-48">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-muted"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - score / 100)}`}
            className={getScoreColor(score)}
            initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - score / 100) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn("text-5xl font-bold", getScoreColor(score))}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-sm text-muted-foreground mt-1">Viability Score</span>
        </div>
      </div>
      <Badge variant="outline" className="mt-4">
        {getScoreLabel(score)} Potential
      </Badge>
    </div>
  );
};

const CompetitorCard: React.FC<{ competitor: Competitor; index: number }> = ({
  competitor,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{competitor.name}</CardTitle>
            <a
              href={competitor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Key Difference</p>
            <p className="text-sm">{competitor.keyDifference}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Their Strength</p>
            <p className="text-sm text-muted-foreground">{competitor.strength}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Their Weakness</p>
            <p className="text-sm text-red-500/80">{competitor.weakness}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MVPRoadmap: React.FC<{ features: MVPFeature[] }> = ({ features }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "low":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      {features?.map((feature, index) => (
        <motion.div
          key={feature.title || index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative flex items-start gap-4 pb-4 last:pb-0"
        >
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-2 ring-background">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          {index < features.length - 1 && (
            <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-border" />
          )}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold">{feature.title}</h4>
              <Badge variant="outline" className={getPriorityColor(feature.priority)}>
                {feature.priority}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {feature.timeline}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const RiskHeatmap: React.FC<{ risks: Risk[] }> = ({ risks }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "low":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/5 border-red-500/20";
      case "medium":
        return "bg-yellow-500/5 border-yellow-500/20";
      case "low":
        return "bg-green-500/5 border-green-500/20";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="grid gap-4">
      {risks?.map((risk, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={cn("border", getSeverityBg(risk.severity))}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                {getSeverityIcon(risk.severity)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{risk.category}</h4>
                    <Badge variant="outline" className="text-xs">
                      {risk.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                </div>
              </div>
              <div className="pl-8">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Mitigation:</span> {risk.mitigation}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const GrowthChannelCard = ({ channel, i }: { channel: any, i: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Parse tactics if they look like a list or have multiple sentences
  const tactics = channel.howTo?.split(/[.!?]\s+/).filter((s: string) => s.length > 5) || [];

  return (
    <motion.div 
      layout
      className={cn(
        "p-5 rounded-lg border bg-muted/5 transition-all duration-300",
        isExpanded ? "md:col-span-2 border-primary/30 ring-1 ring-primary/10 shadow-sm" : "hover:border-primary/20"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
          {channel.channel}
          {channel.effort && (
            <Badge variant="secondary" className="text-[9px] h-4 uppercase font-bold px-1.5 opacity-60">
              {channel.effort} Effort
            </Badge>
          )}
        </h4>
        <Badge variant="outline" className="text-[10px] bg-primary/2 border-primary/10 text-primary">
          ROI: {channel.expectedROI}
        </Badge>
      </div>
      
      <p className="text-sm mb-4 text-muted-foreground leading-relaxed">
        {channel.strategy}
      </p>

      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full justify-between h-8 text-xs font-bold uppercase bg-primary/5 hover:bg-primary/10 text-primary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Hide Execution Details" : "View Detailed Tactics"}
        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </Button>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-4">
              <div className="p-4 rounded-md bg-background border border-border/50">
                <h5 className="text-[10px] font-bold uppercase text-primary mb-3">Step-by-Step Tactics</h5>
                <ul className="space-y-3">
                  {(tactics.length > 0 ? tactics : [channel.howTo]).map((t: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-muted-foreground leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ReportClient: React.FC<ReportSystemProps> = ({
  reportData,
  onExportPDF,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "competitors" | "audience" | "risks" | "revenue" | "roadmap" | "stack" | "headlines" | "customers" | "scope" | "gtm" | "landing" | "kit" | "advisor">(
    "overview"
  );

  // Normalize data for legacy compatibility
  const data = {
    ...reportData,
    gtmStrategy: reportData.gtmStrategy || { launchPhase: "Market Entry Framework", growthChannels: [], contentStrategy: "N/A", pricingStrategy: "N/A", partnershipOpportunities: [] },
    landingPage: reportData.landingPage || { headline: "Concept Analysis", subheadline: "", features: [], cta: "Get Started", faq: [], pricingCopy: "" },
    socialKit: reportData.socialKit || { twitter: [], linkedin: "", reddit: { subreddit: "", title: "", body: "" }, productHunt: { tagline: "", description: "", firstComment: "" } },
    fundraising: reportData.fundraising || { readinessScore: 0, investorReadiness: "Analysis Pending", pitchAngle: "N/A", keyMetricsNeeded: [], redFlags: [], bestInvestorTypes: [], estimatedValuation: "N/A" },
    pivotSuggestions: reportData.pivotSuggestions || [],
    marketInsights: reportData.marketInsights || [],
    mvpScope: reportData.mvpScope || { mustHave: [], niceToHave: [], dontBuild: [] },
  };

  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
    { role: "assistant", content: `Hi! I'm your startup advisor for **${data.ideaTitle}**. Ask me anything about this report or how to launch your business!` }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isChatLoading) return;

    const newMessages = [...chatMessages, { role: "user" as const, content: userInput }];
    setChatMessages(newMessages);
    setUserInput("");
    setIsChatLoading(true);

    try {
      const response = await chatWithReport(data.id, newMessages);
      if (response.success && response.message) {
        setChatMessages([...newMessages, { role: "assistant" as const, content: response.message }]);
      } else {
        setChatMessages([...newMessages, { role: "assistant" as const, content: "Sorry, I ran into an error. Let's try again." }]);
      }
    } catch (error) {
       setChatMessages([...newMessages, { role: "assistant" as const, content: "Oops, something went wrong. Let's try again later." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const isProSection = (tab: string) => ["roadmap", "stack", "headlines", "customers", "scope", "gtm", "landing", "kit", "advisor"].includes(tab);
  const isLocked = (tab: string) => false; // UNLOCKED FOR TESTING

  return (
    <div className="flex-1 overflow-y-auto bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-4xl font-bold header">{data.ideaTitle}</h1>
                <VerdictBadge verdict={data.verdict} />
              </div>
              <p className="text-base text-muted-foreground">{data.verdictReason}</p>
              <p className="text-xs text-muted-foreground">
                Generated on {data.generatedAt} • Report ID: {data.id}
              </p>
            </div>
            <Button onClick={onExportPDF} size="lg" className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </motion.div>

        {/* Viability Score + Honest Verdict */}
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-0">
                <ViabilityGauge score={data.viabilityScore} />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
            <Card className="h-full bg-muted/10 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground font-bold">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Executive Analyst Verdict
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-foreground">{data.honestVerdict}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-border overflow-x-auto pb-px no-scrollbar">
          {[
            { id: "overview", label: "Overview", icon: BarChart3, pro: false },
            { id: "competitors", label: "Competitors", icon: Users, pro: false },
            { id: "audience", label: "Audience", icon: User, pro: false },
            { id: "risks", label: "Risks", icon: AlertTriangle, pro: false },
            { id: "revenue", label: "Revenue", icon: DollarSign, pro: false },
            { id: "roadmap", label: "Roadmap", icon: Milestone, pro: true },
            { id: "stack", label: "Stack", icon: Wrench, pro: true },
            { id: "headlines", label: "Copy", icon: Type, pro: true },
            { id: "customers", label: "Outreach", icon: Users, pro: true },
            { id: "gtm", label: "Strategy", icon: Flag, pro: true },
            { id: "landing", label: "Landing", icon: FileText, pro: true },
            { id: "kit", label: "Social", icon: Share2, pro: true },
            { id: "advisor", label: "Consultant", icon: MessagesSquare, pro: true },
            { id: "scope", label: "Product Scope", icon: ListChecks, pro: true },
          ].map((tab) => {
            const locked = isLocked(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => !locked && setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap text-sm font-medium",
                  locked && "opacity-50 cursor-not-allowed",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.pro && <Lock className="w-3 h-3 ml-1" />}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
             key={activeTab}
             initial={{ opacity: 0, y: 5 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -5 }}
             transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
             className="min-h-[400px]"
          >
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardDescription className="text-xs uppercase font-bold">TAM</CardDescription>
                    <CardTitle className="text-lg">Total Market</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium">{data.marketSize.tam}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription className="text-xs uppercase font-bold">SAM</CardDescription>
                    <CardTitle className="text-lg">Serviceable</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium">{data.marketSize.sam}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription className="text-xs uppercase font-bold">SOM</CardDescription>
                    <CardTitle className="text-lg">Obtainable</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium">{data.marketSize.som}</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Market Trend</CardTitle>
                      <CardDescription>Current market trajectory</CardDescription>
                    </div>
                    <Badge variant="outline" className={cn(
                      data.marketSize.trend === "growing" && "bg-green-500/10 text-green-500 border-green-500/20",
                      data.marketSize.trend === "stable" && "bg-blue-500/10 text-blue-500 border-blue-500/20",
                      data.marketSize.trend === "shrinking" && "bg-red-500/10 text-red-500 border-red-500/20"
                    )}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {data.marketSize.trend.charAt(0).toUpperCase() + data.marketSize.trend.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.marketInsights?.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                      <TrendingUp className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <p className="text-sm leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {data.pivotSuggestions && data.pivotSuggestions.length > 0 && (
                 <Card className="border-border/50 bg-muted/5">
                   <CardHeader>
                     <CardTitle className="text-xl flex items-center gap-2 text-foreground font-bold">
                       <ArrowRightCircle className="w-5 h-5 text-primary" />
                       Strategic Pivot Options
                     </CardTitle>
                     <CardDescription>Based on market viability scores, these present higher probability directions.</CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="grid md:grid-cols-2 gap-4">
                       {data.pivotSuggestions.map((pivot, i) => (
                         <div key={i} className="p-4 rounded-lg bg-background border border-border/50 transition-transform hover:translate-y-[-2px] duration-200">
                           <div className="flex items-center justify-between mb-3">
                             <h4 className="font-bold text-lg text-foreground">{pivot.pivotTitle}</h4>
                             <Badge variant="outline" className="text-green-500 bg-green-500/10 border-green-500/20">
                               Viability: {pivot.viabilityScore}
                             </Badge>
                           </div>
                           <p className="text-sm text-muted-foreground mb-3">{pivot.reason}</p>
                           <div className="text-xs text-primary font-bold uppercase mt-auto mb-1">Differentiator:</div>
                           <p className="text-sm italic text-muted-foreground leading-relaxed">{pivot.keyDifference}</p>
                         </div>
                       ))}
                     </div>
                   </CardContent>
                 </Card>
              )}

              {data.fundraising && (
                 <Card>
                   <CardHeader>
                     <CardTitle className="text-xl flex items-center gap-2 text-foreground font-bold">
                       <DollarSign className="w-5 h-5 text-primary" />
                       Fundraising Readiness
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div className="flex items-center gap-6">
                        <div className="w-24 h-24 shrink-0 relative flex items-center justify-center">
                          <svg className="w-24 h-24 transform -rotate-90">
                             <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted" />
                             <motion.circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray={`${2 * Math.PI * 42}`} strokeDashoffset={`${2 * Math.PI * 42 * (1 - data.fundraising.readinessScore / 100)}`} className="text-primary" initial={{ strokeDashoffset: 2 * Math.PI * 42 }} animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - data.fundraising.readinessScore / 100) }} transition={{ duration: 1 }} strokeLinecap="round" />
                          </svg>
                          <span className="absolute text-2xl font-bold text-foreground">{data.fundraising.readinessScore}</span>
                        </div>
                        <div>
                           <Badge className="mb-2 bg-primary/10 text-primary border-primary/20" variant="outline">{data.fundraising.investorReadiness}</Badge>
                           <p className="text-sm text-muted-foreground leading-relaxed">{data.fundraising.pitchAngle}</p>
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <h4 className="text-xs font-bold uppercase text-[#4A4A4A] mb-3">Key Metrics Needed</h4>
                           <ul className="space-y-2">
                              {data.fundraising.keyMetricsNeeded?.map((m, i) => (
                                 <li key={i} className="text-sm flex items-center gap-2 text-muted-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    {m}
                                 </li>
                              ))}
                           </ul>
                        </div>
                        <div>
                           <h4 className="text-xs font-bold uppercase text-red-500 mb-3">Red Flags</h4>
                           <ul className="space-y-2">
                              {data.fundraising.redFlags?.map((m, i) => (
                                 <li key={i} className="text-sm flex items-center gap-2 text-muted-foreground">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                    {m}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                   </CardContent>
                 </Card>
              )}
            </div>
          )}

          {activeTab === "audience" && (
            <div className="space-y-6">
              {data.targetAudience?.map((persona, index) => (
                <div key={index}>
                  <Card className={cn(
                    persona.type === "primary" && "border-primary/30 bg-primary/2"
                  )}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{persona.title}</CardTitle>
                        <Badge variant={persona.type === "primary" ? "default" : "outline"}>
                          {persona.type === "primary" ? "Primary" : "Secondary"}
                        </Badge>
                      </div>
                      <CardDescription>{persona.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-bold mb-4 text-xs uppercase text-[#4A4A4A]">Pain Points:</h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {persona.painPoints?.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm p-3 rounded-lg border border-border/50 bg-background/50">
                            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {activeTab === "competitors" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Competitors</CardTitle>
                  <CardDescription>
                    Direct competitors identified through real-time web search
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.competitors?.map((competitor, index) => (
                      <CompetitorCard key={`${competitor.name}-${index}`} competitor={competitor} index={index} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "revenue" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Models</CardTitle>
                  <CardDescription>Recommended monetization strategies for your idea</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data.revenueModels?.map((model, index) => (
                      <div key={model.name || index}>
                        <Card className={cn(
                          "h-full transition-all",
                          model.recommended && "border-green-500/30 bg-green-500/5"
                        )}>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <DollarSign className={cn(
                                "w-5 h-5",
                                model.recommended ? "text-green-500" : "text-muted-foreground"
                              )} />
                              <CardTitle className="text-base">{model.name}</CardTitle>
                              {model.recommended && (
                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 ml-auto">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">{model.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle>Build Roadmap</CardTitle>
                      <CardDescription>Strategic tasks to ship your MVP</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {data.buildRoadmap?.map((week, index) => (
                      <div key={`week-${index}`} className="relative">
                        <div className="flex items-start gap-6">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20">
                            {week.week}
                          </div>
                          <div className="flex-1 pt-1">
                            <h4 className="font-bold mb-4 text-xs uppercase text-[#4A4A4A]">Week {week.week} Objectives</h4>
                            <ul className="grid sm:grid-cols-2 gap-3">
                              {week.tasks?.map((task, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground p-3 rounded-lg border border-border/30 bg-muted/20">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {index < data.buildRoadmap.length - 1 && (
                          <div className="absolute left-6 top-12 -bottom-8 w-px bg-gradient-to-b from-primary via-border to-transparent" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "stack" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle>Recommended Tech Stack</CardTitle>
                      <CardDescription>High-performance tools for rapid development</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {data.techStack?.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-5 rounded-lg border bg-muted/40 border-border/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold uppercase text-primary/60">{item.category}</span>
                          </div>
                          <h4 className="font-bold mb-2 text-lg text-foreground">{item.tool}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "headlines" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle>Marketing Headlines</CardTitle>
                      <CardDescription>High-converting landing page options</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {data.headlines?.map((headline, index) => (
                      <div key={index} className="p-8 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/2 border-primary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 font-bold text-[10px] uppercase text-primary opacity-20">Option 0{index + 1}</div>
                        <h3 className="text-2xl font-bold mb-4 header text-foreground">{headline.text}</h3>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-bold uppercase text-[#4A4A4A]">Angle:</span>
                           <span className="text-xs text-muted-foreground">{headline.angle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Crosshair className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle>Customer Acquisition</CardTitle>
                      <CardDescription>Specific strategies to get your first 10 users</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {data.firstCustomers?.map((customer, index) => (
                      <div key={index}>
                        <Card className="border-l-4 border-l-primary bg-muted/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{customer.where}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                               <div className="text-[10px] font-bold uppercase text-[#4A4A4A] mb-2">The Tactic</div>
                               <p className="text-sm leading-relaxed">{customer.how}</p>
                            </div>
                            <div className="p-4 rounded-md bg-background border border-border/50">
                               <div className="text-[10px] font-bold uppercase text-primary mb-2">Sample Message</div>
                               <p className="text-sm italic text-muted-foreground">"{customer.message}"</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "scope" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-green-500/30 bg-green-500/2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-500 uppercase text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      Must Have
                    </CardTitle>
                    <CardDescription>Critical for MVP</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {data.mvpScope.mustHave.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500/60 mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-yellow-500/30 bg-yellow-500/2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-500 uppercase text-xs">
                      <Clock className="w-4 h-4" />
                      Nice to Have
                    </CardTitle>
                    <CardDescription>Post-launch updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {data.mvpScope.niceToHave.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <Clock className="w-4 h-4 text-yellow-500/60 mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-500/30 bg-red-500/2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-500 uppercase text-xs">
                      <XCircle className="w-4 h-4" />
                      Don't Build
                    </CardTitle>
                    <CardDescription>Scope creep alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {data.mvpScope.dontBuild.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <XCircle className="w-4 h-4 text-red-500/60 mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "gtm" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground font-bold">
                    <Flag className="w-5 h-5 text-primary" />
                    Market Penetration Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="p-6 rounded-lg bg-muted/10 border border-border/50">
                    <h4 className="font-bold mb-2 text-sm uppercase text-[#4A4A4A]">Phase 1: Market Entry Framework</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{data.gtmStrategy?.launchPhase || "Initial launch strategy targeting core audience segments."}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {data.gtmStrategy?.growthChannels?.map((channel, i) => (
                      <GrowthChannelCard key={i} channel={channel} i={i} />
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#4A4A4A] mb-3">Communications Framework</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{data.gtmStrategy?.contentStrategy || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#4A4A4A] mb-3">Monetization Framework</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{data.gtmStrategy?.pricingStrategy || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "landing" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Landing Page Generator
                  </CardTitle>
                  <CardDescription>Conversion-optimized copy for your launch website.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div className="p-6 rounded-lg border-2 border-dashed border-primary/20 bg-background group relative">
                       <Button onClick={() => copyToClipboard(data.landingPage?.headline || "")} variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Copy className="w-4 h-4" />
                       </Button>
                       <div className="text-[10px] font-bold uppercase text-primary mb-2">H1 Headline</div>
                       <h3 className="text-3xl font-bold header">{data.landingPage?.headline || "Untitled Analysis"}</h3>
                    </div>

                    <div className="p-6 rounded-lg border bg-muted/10 group relative">
                       <Button onClick={() => copyToClipboard(data.landingPage?.subheadline || "")} variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Copy className="w-4 h-4" />
                       </Button>
                       <div className="text-[10px] font-bold uppercase text-[#4A4A4A] mb-2">Subheadline</div>
                       <p className="text-xl text-muted-foreground">{data.landingPage?.subheadline || "No subheadline provided"}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                     {data.landingPage?.features?.map((f, i) => (
                       <div key={i} className="p-4 rounded-lg border group relative">
                          <Button onClick={() => copyToClipboard(`${f.title}: ${f.description}`)} variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <h4 className="font-bold mb-2">{f.title}</h4>
                          <p className="text-sm text-muted-foreground">{f.description}</p>
                       </div>
                     ))}
                  </div>

                  <Card className="bg-primary text-primary-foreground border-none">
                    <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                       <h4 className="text-xs font-bold uppercase opacity-80">Primary Call To Action</h4>
                       <span className="text-3xl font-bold">{data.landingPage?.cta || "Get Started"}</span>
                       <Button variant="secondary" className="mt-4" onClick={() => copyToClipboard(data.landingPage?.cta || "Get Started")}>Copy CTA</Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "kit" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground font-bold">
                    <Share2 className="w-5 h-5 text-primary" />
                    Multi-Channel Outreach Kit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <h4 className="font-bold flex items-center gap-2 text-sm">
                          Twitter / X Posts
                       </h4>
                       <div className="space-y-3">
                          {data.socialKit?.twitter?.map((t, i) => (
                             <div key={i} className="p-4 rounded-lg border bg-muted/20 text-sm relative group">
                                <Button onClick={() => copyToClipboard(t)} variant="ghost" size="icon" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6">
                                  <Copy className="w-3 h-3" />
                                </Button>
                                {t}
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="font-bold">LinkedIn Announcement</h4>
                       <div className="p-4 rounded-lg border bg-muted/20 text-sm relative group whitespace-pre-wrap">
                          <Button onClick={() => copyToClipboard(data.socialKit?.linkedin || "")} variant="ghost" size="icon" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6">
                            <Copy className="w-3 h-3" />
                          </Button>
                          {data.socialKit?.linkedin || "N/A"}
                       </div>
                    </div>
                  </div>

                  {data.socialKit?.reddit && (
                    <div className="p-6 rounded-lg border border-border/50 bg-muted/5">
                      <h4 className="font-bold text-foreground mb-4 text-sm">Reddit Contextual Strategy (r/{data.socialKit.reddit.subreddit || "relevant-community"})</h4>
                      <div className="space-y-3">
                          <div className="font-bold text-sm">Title: {data.socialKit.reddit.title || "Subject Line"}</div>
                          <div className="p-4 rounded bg-background border text-sm whitespace-pre-wrap leading-relaxed">
                            {data.socialKit.reddit.body || "N/A"}
                          </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "advisor" && (
             <div className="h-[600px] flex flex-col">
                <Card className="flex-1 flex flex-col mb-4 overflow-hidden border-primary/20">
                   <CardHeader className="border-b bg-primary/2">
                      <CardTitle className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <MessagesSquare className="w-4 h-4 text-primary-foreground" />
                         </div>
                         Validly AI Advisor
                      </CardTitle>
                      <CardDescription>Ask about your GTM, technical hurdles, or pivot ideas.</CardDescription>
                   </CardHeader>
                   <ScrollArea className="flex-1 w-full h-[450px] p-4">
                      <div className="space-y-4 pb-4">
                         {chatMessages.map((msg, i) => (
                            <div key={i} className={cn(
                               "flex flex-col max-w-[85%] rounded-2xl p-4 shadow-sm",
                               msg.role === "user" ? "ml-auto bg-primary text-primary-foreground rounded-tr-none" : "bg-muted text-foreground rounded-tl-none border border-border/50"
                            )}>
                               <span className={cn(
                                 "text-[9px] font-bold uppercase opacity-60 mb-2",
                                 msg.role === "user" ? "text-primary-foreground/80" : "text-[#4A4A4A]"
                               )}>
                                 {msg.role === "user" ? "Query" : "Advisor Response"}
                               </span>
                               <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            </div>
                         ))}
                         {isChatLoading && (
                            <div className="flex flex-col max-w-[85%] bg-muted rounded-2xl p-4 rounded-tl-none animate-pulse border border-border/50">
                               <div className="h-3 w-12 bg-foreground/10 rounded mb-3" />
                               <div className="h-4 w-48 bg-foreground/10 rounded" />
                            </div>
                         )}
                      </div>
                   </ScrollArea>
                   <div className="p-4 border-t bg-muted/10">
                      <div className="flex gap-2">
                         <input
                           type="text"
                           placeholder="Type a message..."
                           className="flex-1 bg-background border px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                           value={userInput}
                           onChange={(e) => setUserInput(e.target.value)}
                           onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                         />
                         <Button onClick={handleSendMessage} disabled={isChatLoading || !userInput.trim()} size="icon" className="rounded-full shrink-0">
                            <Send className="w-4 h-4" />
                         </Button>
                      </div>
                   </div>
                </Card>
             </div>
          )}

          {activeTab === "risks" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>
                    Potential challenges and mitigation strategies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RiskHeatmap risks={data.risks} />
                </CardContent>
              </Card>
            </div>
          )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
