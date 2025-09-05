import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { WalletsClient } from "@/components/wallet/wallets-client"

async function getUserWallets(userId: string) {
  return prisma.wallet.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })
}

export default async function WalletPage() {
  const currentUser = await getCurrentUser()
  const wallets = await getUserWallets(currentUser!.id)

  return <WalletsClient wallets={wallets} />
}