import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

async function getTransactions(userId: string) {
  return prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })
}

export default async function TransactionsPage() {
  const user = await getCurrentUser()
  const transactions = await getTransactions(user!.id)

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return <ArrowDownRight className="h-4 w-4 text-green-600" />
      case "WITHDRAWAL":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      case "INVESTMENT":
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case "EARNINGS":
        return <DollarSign className="h-4 w-4 text-green-600" />
      default:
        return <DollarSign className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700"
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "FAILED":
        return "bg-red-100 text-red-700"
      case "CANCELLED":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
        <p className="text-muted-foreground">View and filter your transaction history</p>
      </div>

      {/* Filters */}
      <div className="border rounded-lg p-4 bg-muted/40">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Filter Transactions</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input placeholder="Search transactions..." className="flex-1" />
          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="DEPOSIT">Deposits</SelectItem>
              <SelectItem value="WITHDRAWAL">Withdrawals</SelectItem>
              <SelectItem value="INVESTMENT">Investments</SelectItem>
              <SelectItem value="EARNINGS">Earnings</SelectItem>
              <SelectItem value="REFERRAL_COMMISSION">Referral Commission</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="overflow-hidden border rounded-lg">
        {transactions.length > 0 ? (
          <ul className="divide-y">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition">
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium capitalize">{transaction.type.toLowerCase().replace("_", " ")}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.createdAt.toLocaleDateString()} at {transaction.createdAt.toLocaleTimeString()}
                    </p>
                    {transaction.description && (
                      <p className="text-xs text-muted-foreground">{transaction.description}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${Number(transaction.amount).toLocaleString()}</p>
                  <Badge className={`${getStatusColor(transaction.status)} mt-1`}>
                    {transaction.status}
                  </Badge>
                  {transaction.reference && (
                    <p className="text-xs text-muted-foreground mt-1">Ref: {transaction.reference}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  )
}
