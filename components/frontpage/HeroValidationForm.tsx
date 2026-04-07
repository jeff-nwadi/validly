"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Sparkles, CheckCircle2, TrendingUp, BarChart3, Users } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const STAGES = [
  "Analyzing market trends...",
  "Scanning direct competitors...",
  "Calculating viability score...",
  "Identifying potential risks...",
  "Finalizing your report..."
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
      // Direct redirect for mobile as requested
      router.push(`/register?idea=${encodeURIComponent(idea)}`);
      return;
    }

    // Start simulation for Desktop/Tablet
    setIsAnalyzing(true);
    setProgress(0);
    setStageIndex(0);

    const duration = 3500; // 3.5 seconds
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
          }, 500);
          return 100;
        }
        
        // Update stage based on progress
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
        "relative flex flex-col md:flex-row items-center gap-4 md:gap-6 border border-neutral-200 rounded-xl p-4 md:p-3 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-500",
        isAnalyzing && "scale-[1.02] border-black/10"
      )}>
        <div className="flex-1 w-full">
          <h2 className="text-[10px] uppercase font-bold text-neutral-400 mb-1 px-3">your idea</h2>
          <textarea
            ref={inputRef}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={isAnalyzing}
            placeholder="A CRM for local bakeries to manage custom cake orders..."
            className="w-full text-[14px] text-black bg-transparent border-none focus:ring-0 resize-none min-h-[40px] px-3 py-1 placeholder:text-neutral-300"
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

        {/* Progress Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-20 left-0 right-0 p-4 bg-white border border-neutral-100 rounded-xl shadow-xl z-20"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[12px] font-medium text-black flex items-center gap-2">
                   <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />
                   {STAGES[stageIndex]}
                </span>
                <span className="text-[12px] font-bold text-neutral-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1.5 bg-neutral-50" />
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
                        onClick={() => router.push(`/register?idea=${encodeURIComponent(idea)}`)}
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
