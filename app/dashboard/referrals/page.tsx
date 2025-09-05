import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReferralLink from "@/components/referral/referral-link"

async function getReferralData(userId: string) {
  const [referrals, referralStats] = await Promise.all([
    prisma.referral.findMany({
      where: { referrerId: userId },
      include: { referred: { select: { name: true, email: true, createdAt: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.referral.aggregate({
      where: { referrerId: userId, status: "COMPLETED" },
      _sum: { commission: true },
      _count: true,
    }),
  ])

  return {
    referrals,
    totalCommission: Number(referralStats._sum.commission || 0),
    totalReferrals: referralStats._count,
  }
}

export default async function ReferralsPage() {
  const user = await getCurrentUser()
  const { totalCommission, totalReferrals } = await getReferralData(user!.id)

  const referralLink = `${process.env.NEXT_PUBLIC_APP_URL || "https://investpro.com"}/signup?ref=${user!.id}`

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Total Referrals</CardTitle></CardHeader>
          <CardContent>{totalReferrals}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Commissions</CardTitle></CardHeader>
          <CardContent>${totalCommission.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Commission Rate</CardTitle></CardHeader>
          <CardContent>10%</CardContent>
        </Card>
      </div>

      {/* Client-side sharing */}
      <ReferralLink referralLink={referralLink} />

      {/* Referral history … same as before (server-rendered, no interactivity) */}
    </div>
  )
}
