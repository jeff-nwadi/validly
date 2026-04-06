import React from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { validations } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import HistoryClient from './HistoryClient'

export default async function HistoryPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect('/login');
  }

  const userValidations = await db.query.validations.findMany({
    where: eq(validations.userId, session.user.id),
    orderBy: [desc(validations.createdAt)],
  });

  return (
    <HistoryClient initialValidations={userValidations} />
  )
}
