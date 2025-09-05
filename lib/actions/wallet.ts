"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { revalidatePath } from "next/cache"

export async function addWallet(data: {
  coinName: string
  coinSymbol: string
  address: string
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      throw new Error("Not authenticated")
    }

    const wallet = await prisma.wallet.create({
      data: {
        userId: currentUser.id,
        coinName: data.coinName,
        coinSymbol: data.coinSymbol,
        address: data.address,
      },
    })

    revalidatePath("/dashboard/wallet")
    return { success: true, wallet }
  } catch (error) {
    console.error("Error adding wallet:", error)
    throw new Error("Failed to add wallet")
  }
}

export async function removeWallet(walletId: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      throw new Error("Not authenticated")
    }

    await prisma.wallet.delete({
      where: {
        id: walletId,
        userId: currentUser.id,
      },
    })

    revalidatePath("/dashboard/wallet")
    return { success: true }
  } catch (error) {
    console.error("Error removing wallet:", error)
    throw new Error("Failed to remove wallet")
  }
}
