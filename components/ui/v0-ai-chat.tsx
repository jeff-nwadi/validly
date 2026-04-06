"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    BarChart3,
    Users,
    AlertTriangle,
    Coins,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    Loader2
} from "lucide-react";
import { validateIdea } from "@/lib/actions/validate-idea";
import { useRouter } from "next/navigation";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

export function VercelV0Chat() {
    const [value, setValue] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    const handleAction = () => {
        if (!value.trim() || isPending) return;

        startTransition(async () => {
            const result = await validateIdea({
                ideaDescription: value,
            });

            if (result.success && result.id) {
                router.push(`/report/${result.id}`);
            } else {
                alert(result.error || "Something went wrong.");
            }
        });
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAction();
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-8">
            <h1 className="text-4xl font-bold text-black dark:text-white header tracking-wider text-center">
                What idea are we validating today?
            </h1>

            <div className="w-full">
                <div className="relative bg-neutral-900 rounded-[6px] border border-neutral-800 p-2">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Describe your SaaS idea here..."
                            className={cn(
                                "w-full px-6 py-4",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-white text-lg",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-neutral-500 placeholder:text-lg",
                                "min-h-[60px]"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-3 px-6">
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                className="group p-2 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Paperclip className="w-4 h-4 text-[#4A4A4A]" />
                                <span className="text-[10px] font-bold text-[#4A4A4A] uppercase tracking-widest transition-opacity">
                                    Attach
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#4A4A4A] uppercase tracking-widest transition-colors border border-dashed border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-2"
                            >
                                <PlusIcon className="w-3 h-3" />
                                Project
                            </button>
                            <button
                                type="button"
                                onClick={handleAction}
                                disabled={!value.trim() || isPending}
                                className={cn(
                                    "p-2.5 rounded-lg text-sm transition-all border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-center",
                                    value.trim()
                                        ? "bg-white text-black"
                                        : "text-zinc-400"
                                )}
                            >
                                {isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowUpIcon
                                        className={cn(
                                            "w-4 h-4",
                                            value.trim()
                                                ? "text-black"
                                                : "text-zinc-400"
                                        )}
                                    />
                                )}
                                <span className="sr-only">Send</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
                    <ActionButton
                        icon={<BarChart3 className="w-4 h-4" />}
                        label="Market Size Analysis"
                    />
                    <ActionButton
                        icon={<Users className="w-4 h-4" />}
                        label="Top 5 Competitors"
                    />
                    <ActionButton
                        icon={<AlertTriangle className="w-4 h-4" />}
                        label="Potential Risks"
                    />
                    <ActionButton
                        icon={<Coins className="w-4 h-4" />}
                        label="Revenue Models"
                    />
                </div>
            </div>

            <div className="max-w-md">
                 <p className='text-[10px] text-[#2C2C2C] text-center leading-relaxed tracking-wide'>
                    AI validation takes ~30 seconds. The report will include viability score, market size, and MVP features.
                 </p>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
    return (
        <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-full border border-neutral-800 text-[#4A4A4A] hover:text-white transition-all group"
        >
            <div className="group-hover:text-purple-400 transition-colors">
               {icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </button>
    );
}
