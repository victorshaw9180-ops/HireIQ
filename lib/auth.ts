import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function getAuthSession() {
  const session = await auth()

  if (!session.userId) {
    redirect('/sign-in')
  }

  return session
}

export async function getCurrentUserId() {
  const session = await auth()

  if (!session.userId) {
    redirect('/sign-in')
  }

  return session.userId
}