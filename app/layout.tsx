import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: "400",
})


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
})

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
      className={cn("h-full", "antialiased", "scroll-smooth", ibmPlexMono.variable, inter.variable, "font-sans", geist.variable)}
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

