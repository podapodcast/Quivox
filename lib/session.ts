import { prisma } from "./prisma"
import { cookies } from "next/headers"

export function generateSessionToken(): string {
  return crypto.randomUUID()
}

export async function createSession(token: string, userId: string) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days

  return prisma.session.create({
    data: {
      id: token,
      userId,
      expiresAt,
    },
  })
}

export async function validateSessionToken(token: string) {
  const session = await prisma.session.findUnique({
    where: { id: token },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: token } })
    }
    return null
  }

  return { session, user: session.user }
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session")?.value

  if (!sessionToken) return null

  const result = await validateSessionToken(sessionToken)
  if (!result?.user) return null

  const user = result.user

  return {
    ...user,
    balance: user.balance.toNumber(),
    totalInvested: user.totalInvested.toNumber(),
    totalEarnings: user.totalEarnings.toNumber(),
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}
