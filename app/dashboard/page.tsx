import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import {
  DollarSign,
  TrendingUp,
  Wallet,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

async function getDashboardData(userId: string) {
  const [user, investments, recentTransactions] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true, totalInvested: true, totalEarnings: true },
    }),
    prisma.investment.findMany({
      where: { userId },
      include: { plan: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ])

  return { user, investments, recentTransactions }
}

export default async function DashboardPage() {
  const currentUser = await getCurrentUser()
  const { user, investments, recentTransactions } = await getDashboardData(
    currentUser!.id
  )

  const activeInvestments = investments.filter((inv) => inv.status === "ACTIVE")
  const totalActiveInvestments = activeInvestments.reduce(
    (sum, inv) => sum + Number(inv.amount),
    0
  )

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {currentUser?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your investment portfolio.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: "Account Balance",
            value: `$${Number(user?.balance || 0).toLocaleString()}`,
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
            subtitle: "Available",
          },
          {
            title: "Total Invested",
            value: `$${Number(user?.totalInvested || 0).toLocaleString()}`,
            icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            subtitle: "Across all",
          },
          {
            title: "Total Earnings",
            value: `$${Number(user?.totalEarnings || 0).toLocaleString()}`,
            icon: <Wallet className="h-4 w-4 text-muted-foreground" />,
            subtitle: "Lifetime",
          },
          {
            title: "Active Investments",
            value: activeInvestments.length.toString(),
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            subtitle: `$${totalActiveInvestments.toLocaleString()} invested`,
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="flex flex-col rounded-lg border bg-background p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{stat.title}</p>
              {stat.icon}
            </div>
            <div className="mt-2 text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/deposit">
            <Button className="w-full h-20 flex flex-col items-center justify-center gap-2">
              <ArrowDownRight className="h-6 w-6" />
              <span>Deposit</span>
            </Button>
          </Link>
          <Link href="/dashboard/invest">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center gap-2"
            >
              <TrendingUp className="h-6 w-6" />
              <span>Invest</span>
            </Button>
          </Link>
          <Link href="/dashboard/withdraw">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center gap-2"
            >
              <ArrowUpRight className="h-6 w-6" />
              <span>Withdraw</span>
            </Button>
          </Link>
          <Link href="/dashboard/wallet">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center gap-2"
            >
              <Wallet className="h-6 w-6" />
              <span>Wallet</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Investments & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Investments */}
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Recent Investments</h2>
            <p className="text-sm text-muted-foreground">
              Your latest investment activities
            </p>
          </div>
          {investments.length > 0 ? (
            <div className="space-y-4">
              {investments.map((investment) => (
                <div
                  key={investment.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{investment.plan.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${Number(investment.amount).toLocaleString()} •{" "}
                      {Number(investment.plan.interestRate)}% return
                    </p>
                  </div>
                  <Badge
                    variant={
                      investment.status === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {investment.status}
                  </Badge>
                </div>
              ))}
              <Link href="/dashboard/my-investments">
                <Button variant="outline" className="w-full">
                  View All Investments
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">No investments yet</p>
              <Link href="/dashboard/invest">
                <Button>Start Investing</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <p className="text-sm text-muted-foreground">
              Your latest transaction activities
            </p>
          </div>
          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {transaction.type === "DEPOSIT" ? (
                      <ArrowDownRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium capitalize">
                        {transaction.type.toLowerCase()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${Number(transaction.amount).toLocaleString()}
                    </p>
                    <Badge
                      variant={
                        transaction.status === "COMPLETED"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Link href="/dashboard/transactions">
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                No transactions yet
              </p>
              <Link href="/dashboard/deposit">
                <Button>Make Your First Deposit</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
