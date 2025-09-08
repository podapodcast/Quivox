import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { TrendingUp, Clock, DollarSign, Plus, Calendar, Target } from "lucide-react"
import Link from "next/link"

async function getUserInvestments(userId: string) {
  return prisma.investment.findMany({
    where: { userId },
    include: {
      plan: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export default async function MyInvestmentsPage() {
  const currentUser = await getCurrentUser()
  const investments = await getUserInvestments(currentUser!.id)

  const activeInvestments = investments.filter((inv) => inv.status === "ACTIVE")
  const completedInvestments = investments.filter((inv) => inv.status === "COMPLETED")

  const calculateProgress = (startDate: Date, endDate: Date) => {
    const now = new Date()
    const total = endDate.getTime() - startDate.getTime()
    const elapsed = now.getTime() - startDate.getTime()
    return Math.min(Math.max((elapsed / total) * 100, 0), 100)
  }

  const calculateDaysRemaining = (endDate: Date) => {
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0)
  }

  if (investments.length === 0) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Investments</h1>
          <p className="text-muted-foreground">Track and manage your investment portfolio</p>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          <div className="h-24 w-24 bg-muted/30 rounded-full flex items-center justify-center">
            <TrendingUp className="h-12 w-12 text-muted-foreground" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">No Investments Yet</h2>
            <p className="text-muted-foreground max-w-md">
              Start your investment journey today. Choose from our carefully curated investment plans and watch your
              money grow.
            </p>
          </div>

          <Link href="/dashboard/invest">
            <Button size="lg" className="h-12 px-8">
              <Plus className="h-5 w-5 mr-2" />
              Start Investing
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Investments</h1>
          <p className="text-muted-foreground">Track and manage your investment portfolio</p>
        </div>
        <Link href="/dashboard/invest">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Investment
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeInvestments.length}</div>
            <p className="text-xs text-muted-foreground">
              ${activeInvestments.reduce((sum, inv) => sum + Number(inv.amount), 0).toLocaleString()} invested
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              ${investments.reduce((sum, inv) => sum + Number(inv.earnings), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Lifetime earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Plans</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedInvestments.length}</div>
            <p className="text-xs text-muted-foreground">Successfully completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Investments */}
      {activeInvestments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Investments</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeInvestments.map((investment) => {
              const progress = calculateProgress(investment.startDate, investment.endDate)
              const daysRemaining = calculateDaysRemaining(investment.endDate)
              const dailyReturn = (Number(investment.amount) * Number(investment.plan.interestRate)) / 100

              return (
                <Card key={investment.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{investment.plan.name}</CardTitle>
                      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        {Number(investment.plan.interestRate)}% Daily
                      </Badge>
                    </div>
                    <CardDescription>{investment.plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Investment Amount</p>
                        <p className="text-lg font-semibold">${Number(investment.amount).toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Daily Return</p>
                        <p className="text-lg font-semibold text-emerald-600">${dailyReturn.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{daysRemaining} days remaining</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Ends {investment.endDate.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current Earnings</span>
                        <span className="font-semibold text-emerald-600">
                          ${Number(investment.earnings).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Completed Investments */}
      {completedInvestments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Completed Investments</h2>
          <div className="space-y-3">
            {completedInvestments.map((investment) => (
              <Card key={investment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium">{investment.plan.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${Number(investment.amount).toLocaleString()} • {investment.plan.duration} days
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-600">+${Number(investment.earnings).toLocaleString()}</p>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
