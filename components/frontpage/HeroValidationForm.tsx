"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Sparkles, CheckCircle2, TrendingUp, BarChart3, Users, Clock, Globe, Shield, Rocket } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STAGES = [
  { id: 1, label: "Researching market data...", icon: Globe },
  { id: 2, label: "Analyzing competitors...", icon: Users },
  { id: 3, label: "Evaluating industry trends...", icon: TrendingUp },
  { id: 4, label: "AI processing insights...", icon: Sparkles },
  { id: 5, label: "Calculating success score...", icon: BarChart3 },
  { id: 6, label: "Generating report...", icon: Shield }
];

export default function HeroValidationForm() {
  const [idea, setIdea] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleValidate = () => {
    if (!idea.trim() || isAnalyzing) return;

    if (isMobile) {
      toast.info("Preparing your analysis...", {
        description: "Redirecting to secure your report."
      });
      router.push(`/register?idea=${encodeURIComponent(idea)}`);
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setStageIndex(0);

    const duration = 4500; // Increased to 4.5s for Checklist readability
    const interval = 100;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsAnalyzing(false);
            setShowModal(true);
            toast.success("Analysis Complete!", {
               description: "Log in or create an account to view your full report.",
               duration: 5000,
            });
          }, 800);
          return 100;
        }
        
        const stage = Math.floor((next / 100) * STAGES.length);
        if (stage !== stageIndex && stage < STAGES.length) {
          setStageIndex(stage);
        }
        
        return next;
      });
    }, interval);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className={cn(
        "relative flex flex-col md:flex-row items-center gap-4 md:gap-6 border border-neutral-200 rounded-xl p-4 md:p-3 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500",
        isAnalyzing && "scale-[1.01] border-black/10"
      )}>
        <div className="flex-1 w-full">
          <h2 className="text-[10px] uppercase font-bold text-neutral-400 mb-1 px-3">your idea</h2>
          <textarea
            ref={inputRef}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={isAnalyzing}
            placeholder="A CRM for local bakeries to manage custom cake orders..."
            className="w-full text-[14px] text-black bg-transparent border-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none focus-within:ring-0 resize-none min-h-[40px] px-3 py-1 placeholder:text-neutral-300"
            rows={1}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleValidate();
                }
            }}
          />
        </div>
        
        <button
          onClick={handleValidate}
          disabled={!idea.trim() || isAnalyzing}
          className={cn(
            "bg-black text-white px-6 py-3 rounded-lg w-full md:w-auto font-medium transition-all flex items-center justify-center gap-2 group",
            (!idea.trim() || isAnalyzing) ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-800 active:scale-95"
          )}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Validate my idea</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Progress Checklist Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute -bottom-[290px] left-0 right-0 p-6 bg-white border border-neutral-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-30"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-black">Validating your idea...</span>
                    <span className="text-[11px] text-neutral-400 uppercase tracking-widest font-semibold">AI Processors Engaged</span>
                </div>
                <span className="text-[18px] font-black text-black">{Math.round(progress)}%</span>
              </div>
              
              <Progress value={progress} className="h-2 bg-neutral-50 mb-6" />

              <div className="space-y-3">
                {STAGES.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isCompleted = idx < stageIndex;
                  const isActive = idx === stageIndex;

                  return (
                    <motion.div 
                        key={stage.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: (isCompleted || isActive) ? 1 : 0.4, x: 0 }}
                        className={cn(
                            "flex items-center justify-between text-[13px] transition-all duration-300",
                            isActive ? "text-black font-semibold" : "text-neutral-400"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : isActive ? (
                                <Loader2 className="w-4 h-4 text-black animate-spin" />
                            ) : (
                                <Icon className="w-4 h-4" />
                            )}
                            <span>{stage.label}</span>
                        </div>
                        {isCompleted && (
                            <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-[10px] text-green-500 font-bold uppercase"
                            >
                                Done
                            </motion.span>
                        )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Subtle brand touch from reference image */}
              <div className="mt-8 pt-6 border-t border-neutral-100">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Explore while you wait</span>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                    {[
                        { icon: BarChart3, title: "Market Size Calculator", sub: "Estimate your TAM, SAM, SOM" },
                        { icon: Rocket, title: "Startup Cost Calculator", sub: "Plan your launch budget" },
                        { icon: Users, title: "CAC Calculator", sub: "Customer acquisition costs" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-neutral-50/50 rounded-xl border border-neutral-100 group hover:border-black/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-100 flex items-center justify-center shadow-sm">
                                    <item.icon className="w-4 h-4 text-black" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] font-bold text-black leading-none">{item.title}</span>
                                    <span className="text-[10px] text-neutral-400">{item.sub}</span>
                                </div>
                            </div>
                            <ArrowRight className="w-3 h-3 text-neutral-300 group-hover:text-black transition-colors" />
                        </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-neutral-100 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-400 to-blue-500" />
                
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-black">Analysis Complete!</h3>
                    <div className="flex justify-center items-center gap-2">
                        <span className="text-[14px] text-neutral-500 uppercase font-bold tracking-wider">Viability Score:</span>
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[13px] font-bold border border-green-200">
                           85% High Power
                        </div>
                    </div>
                    <p className="text-neutral-500 text-[15px] leading-relaxed">
                        Your idea has high market potential. We&apos;ve identified <span className="text-black font-semibold">3 key competitors</span> and <span className="text-black font-semibold">4 growth channels</span> that could work for you.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 flex flex-col items-center gap-2">
                        <Users className="w-5 h-5 text-neutral-400" />
                        <span className="text-[11px] font-bold uppercase text-neutral-400 text-center leading-tight">Market<br/>Ready</span>
                    </div>
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 flex flex-col items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-neutral-400" />
                        <span className="text-[11px] font-bold uppercase text-neutral-400 text-center leading-tight">Scale<br/>Potential</span>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                    <button 
                        onClick={() => {
                            localStorage.setItem('pending_idea', idea);
                            router.push(`/register?idea=${encodeURIComponent(idea)}`);
                        }}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold text-[16px] hover:bg-neutral-800 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2"
                    >
                        View Full Analysis
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => setShowModal(false)}
                        className="w-full py-3 text-neutral-400 text-[14px] hover:text-black transition-colors"
                    >
                        Back to landing page
                    </button>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
