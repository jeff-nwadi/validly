import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Validly",
  description: "Validate your SaaS idea in 30 seconds",
};

import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "scroll-smooth", "font-sans")}
      suppressHydrationWarning
    >
      <body className={cn("min-h-full flex flex-col bg-white text-black")}>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster position="top-right" expand={false} richColors />
      </body>
    </html>
  );
}

