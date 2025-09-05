import { prisma } from "@/lib/prisma"
import { InvestmentPageClient } from "@/components/investment/investment-page-client"

async function getInvestmentPlans() {
  const plans = await prisma.investmentPlan.findMany({
    where: { isActive: true },
    orderBy: { minAmount: "asc" },
  })

  return plans.map((plan) => ({
    ...plan,
    minAmount: Number(plan.minAmount),
    maxAmount: Number(plan.maxAmount),
    interestRate: Number(plan.interestRate),
  }))
}

export default async function InvestPage() {
  const plans = await getInvestmentPlans()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
          Investment Plans
        </h1>
        <p className="text-muted-foreground text-lg">Choose the perfect plan to grow your wealth</p>
      </div>

      {/* Client-side wrapper for payment state management */}
      <InvestmentPageClient plans={plans} />
    </div>
  )
}
