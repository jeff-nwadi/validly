"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { validateIdea } from "@/lib/actions/validate-idea";
import { toast } from "sonner";

export function PendingValidationTrigger() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idea = searchParams.get("idea");
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Check both query param and localStorage for maximum reliability
    const pendingIdea = idea || localStorage.getItem('pending_idea');

    if (pendingIdea && !hasTriggered.current) {
      hasTriggered.current = true;
      
      // Clear localStorage so it doesn't re-trigger on subsequent refreshes
      localStorage.removeItem('pending_idea');
      
      const triggerValidation = async () => {
        const toastId = toast.loading("Initializing AI Analysis...", {
          description: `Processing Idea: "${pendingIdea.substring(0, 30)}${pendingIdea.length > 30 ? "..." : ""}"`,
        });

        try {
          const result = await validateIdea({ 
            ideaDescription: pendingIdea,
            industry: "Technology",
          });

          if (result.success && result.id) {
            toast.success("Analysis Complete!", {
              id: toastId,
              description: "Redirecting to your detailed report.",
            });
            setTimeout(() => {
              router.push(`/report/${result.id}`);
            }, 1000);
          } else {
            toast.error("Analysis Failed", {
              id: toastId,
              description: result.error || "Please try again.",
            });
          }
        } catch (error) {
          toast.error("An unexpected error occurred", {
            id: toastId,
          });
          console.error(error);
        }
      };

      triggerValidation();
    }
  }, [idea, router]);

  return null;
}
