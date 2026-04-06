"use server"

import { db } from '@/db'
import { validations } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function deleteValidation(id: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw new Error('Not authenticated')
  }

  await db.delete(validations).where(
    and(
      eq(validations.id, id),
      eq(validations.userId, session.user.id)
    )
  );

  revalidatePath('/history');
}
