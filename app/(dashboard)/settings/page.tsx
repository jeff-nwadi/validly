import React from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { user } from '@/db/schema'
import { eq } from 'drizzle-orm'
import SettingsClient from './SettingsClient'

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect('/login');
  }

  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (!userData) {
    redirect('/dashboard');
  }

  const userForClient = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    image: userData.image,
    plan: userData.plan,
    validationsUsed: userData.validationsUsed,
  };

  return (
    <SettingsClient user={userForClient} />
  )
}
