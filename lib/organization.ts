import { prisma } from './prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function getOrCreateOrg() {
  const session = await auth()

  if (!session.userId) {
    redirect('/sign-in')
  }

  const userId = session.userId

  let member = await prisma.orgMember.findFirst({
    where: { userId },
    include: { org: true },
  })

  if (!member) {
    const org = await prisma.organization.create({
      data: {
        name: 'My Company',
        plan: 'starter',
      },
    })

    member = await prisma.orgMember.create({
      data: {
        orgId: org.id,
        userId,
        role: 'owner',
      },
      include: { org: true },
    })
  }

  return member.org
}

export async function getCurrentOrgId() {
  const org = await getOrCreateOrg()
  return org.id
}