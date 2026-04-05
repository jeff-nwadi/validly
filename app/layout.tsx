import type { Metadata } from "next";
import { IBM_Plex_Mono, Cal_Sans, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: "400",
})

const calSans = Cal_Sans({
  subsets: ["latin"],
  variable: "--font-cal-sans",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "dark", "scroll-smooth", ibmPlexMono.variable, calSans.variable, inter.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
