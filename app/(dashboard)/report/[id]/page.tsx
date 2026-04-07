import React from 'react'
import { db } from "@/db"
import { validations, user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound, redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { ReportClient, type ReportData } from "./ReportClient"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login")
  }

  const { id } = await params

  // 1. Fetch the validation
  const validation = await db.query.validations.findFirst({
    where: eq(validations.id, id)
  });

  if (!validation) {
    notFound();
  }

  // 2. Fetch the user's current plan
  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id)
  });

  if (!currentUser) {
    notFound();
  }

  // 3. Parse the report data
  let reportData: ReportData;
  try {
    reportData = JSON.parse(validation.report);
    // Inject dynamic data from DB if not in JSON
    reportData.id = validation.id;
    reportData.ideaTitle = validation.ideaTitle;
    reportData.viabilityScore = validation.viabilityScore;
    reportData.verdict = validation.verdict as "hot" | "warm" | "cold";
    reportData.isPro = currentUser.plan === "pro";
    // Ensure generatedAt exists
    if (!reportData.generatedAt) {
        reportData.generatedAt = validation.createdAt.toLocaleDateString();
    }
  } catch (error) {
    console.error("Error parsing report JSON:", error);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Error Loading Report</h1>
          <p className="text-muted-foreground">The report data is in an invalid format.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ReportClient reportData={reportData} />
    </div>
  )
}
