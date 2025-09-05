import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { DollarSign } from "lucide-react";
import { WithdrawForm } from "@/components/financial/withdraw-form";

async function getUserWallets(userId: string) {
  return prisma.wallet.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export default async function WithdrawPage() {
  const user = await getCurrentUser();
  const userWallets = await getUserWallets(user!.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Available Balance */}
      <div className="bg-card/50 border border-border/50 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Available Balance
            </p>
            <p className="text-2xl font-bold text-foreground">
              ${Number(user?.balance || 0).toFixed(2)}
            </p>
          </div>
          <div className="p-2.5 bg-blue-500/10 rounded-md">
            <DollarSign className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Withdraw Funds */}
      <div className="bg-card/50 border border-border/50 rounded-lg p-6 space-y-6 shadow">
        <h2 className="text-xl font-semibold text-foreground">
          Withdraw Funds
        </h2>

        <WithdrawForm
          userBalance={Number(user?.balance || 0)}
          userWallets={userWallets}
        />
      </div>
    </div>
  );
}
