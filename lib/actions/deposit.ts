"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { revalidatePath } from "next/cache"

export async function createDeposit(data: {
  amount: number
  method: string
  reference?: string
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      throw new Error("Not authenticated")
    }

    const deposit = await prisma.deposit.create({
      data: {
        userId: currentUser.id,
        amount: data.amount,
        method: data.method,
        reference: data.reference,
        status: "PENDING",
      },
    })

    // Create transaction record
    await prisma.transaction.create({
      data: {
        userId: currentUser.id,
        type: "DEPOSIT",
        amount: data.amount,
        status: "PENDING",
        description: `${data.method} deposit`,
        reference: data.reference,
      },
    })

    revalidatePath("/dashboard/deposit")
    revalidatePath("/dashboard/transactions")
    return { success: true, deposit }
  } catch (error) {
    console.error("Error creating deposit:", error)
    throw new Error("Failed to create deposit")
  }
}
