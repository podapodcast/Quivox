/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"

export async function investAction(prevState: any, formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return {
      message: "Authentication required",
      success: false,
    }
  }

  const planId = formData.get("planId") as string
  const amount = Number.parseFloat(formData.get("amount") as string)

  if (!planId || !amount || amount <= 0) {
    return {
      message: "Invalid investment details",
      success: false,
    }
  }

  try {
    // Get investment plan
    const plan = await prisma.investmentPlan.findUnique({
      where: { id: planId, isActive: true },
    })

    if (!plan) {
      return {
        message: "Investment plan not found",
        success: false,
      }
    }

    // Validate amount
    const minAmount = Number(plan.minAmount)
    const maxAmount = Number(plan.maxAmount)

    if (amount < minAmount || amount > maxAmount) {
      return {
        message: `Investment amount must be between $${minAmount.toLocaleString()} and $${maxAmount.toLocaleString()}`,
        success: false,
      }
    }

    // Check user balance
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { balance: true },
    })

    if (!currentUser || Number(currentUser.balance) < amount) {
      return {
        message: "Insufficient balance",
        success: false,
      }
    }

    // Calculate end date
    const startDate = new Date()
    const endDate = new Date(startDate.getTime() + plan.duration * 24 * 60 * 60 * 1000)

    // Create investment and update user balance in a transaction
    await prisma.$transaction(async (tx) => {
      // Create investment
      await tx.investment.create({
        data: {
          userId: user.id,
          planId: plan.id,
          amount: amount,
          startDate,
          endDate,
          status: "ACTIVE",
        },
      })

      // Update user balance and total invested
      await tx.user.update({
        where: { id: user.id },
        data: {
          balance: {
            decrement: amount,
          },
          totalInvested: {
            increment: amount,
          },
        },
      })

      // Create transaction record
      await tx.transaction.create({
        data: {
          userId: user.id,
          type: "INVESTMENT",
          amount: amount,
          status: "COMPLETED",
          description: `Investment in ${plan.name}`,
        },
      })
    })

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/invest")
    revalidatePath("/dashboard/wallet")

    return {
      message: `Successfully invested $${amount.toLocaleString()} in ${plan.name}`,
      success: true,
    }
  } catch (error) {
    console.error("Investment error:", error)
    return {
      message: "An error occurred while processing your investment",
      success: false,
    }
  }
}

export async function submitInvestmentPayment(
  prevState: any,
  formData: FormData
) {
  const user = await getCurrentUser()
  if (!user) {
    return { message: "Authentication required", success: false }
  }

  const planId = formData.get("planId") as string
  const amount = Number(formData.get("amount"))

  if (!planId || !amount || amount <= 0) {
    return { message: "Invalid investment details", success: false }
  }

  try {
    const plan = await prisma.investmentPlan.findUnique({
      where: { id: planId, isActive: true },
    })

    if (!plan) {
      return { message: "Investment plan not found", success: false }
    }

    const minAmount = Number(plan.minAmount)
    const maxAmount = Number(plan.maxAmount)

    if (amount < minAmount || amount > maxAmount) {
      return {
        message: `Amount must be between $${minAmount} and $${maxAmount}`,
        success: false,
      }
    }

    // Calculate start & end
    const startDate = new Date()
    const endDate = new Date(
      startDate.getTime() + plan.duration * 24 * 60 * 60 * 1000
    )

    // Create investment with "PENDING"
    await prisma.investment.create({
      data: {
        userId: user.id,
        planId: plan.id,
        amount,
        startDate,
        endDate,
        status: "PENDING",
      },
    })

    // Also log transaction
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: "INVESTMENT",
        amount,
        status: "PENDING",
        description: `Investment in ${plan.name}`,
      },
    })

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/invest")

    return {
      message: "Payment submitted. Waiting for confirmation.",
      success: true,
    }
  } catch (error) {
    console.error("Payment submission error:", error)
    return { message: "Failed to submit payment", success: false }
  }
}