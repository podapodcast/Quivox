"use server"

import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"

export async function depositAction(prevState: unknown, formData: FormData) {
    const user = await getCurrentUser()
    if (!user) {
        return {
            message: "Authentication required",
            success: false,
        }
    }

    const amount = Number.parseFloat(formData.get("amount") as string)
    const method = formData.get("method") as string

    if (!amount || amount < 10) {
        return {
            message: "Minimum deposit amount is $10",
            success: false,
        }
    }

    if (!method) {
        return {
            message: "Please select a payment method",
            success: false,
        }
    }

    try {
        await prisma.deposit.create({
            data: {
                userId: user.id,
                amount: amount,
                method: method,
                status: "PENDING",
            },
        })

        revalidatePath("/dashboard/deposit")
        revalidatePath("/dashboard/wallet")

        return {
            message: `Deposit request of $${amount.toLocaleString()} submitted successfully. You will be contacted with payment instructions.`,
            success: true,
        }
    } catch (error) {
        console.error("Deposit error:", error)
        return {
            message: "An error occurred while processing your deposit request",
            success: false,
        }
    }
}

export async function withdrawAction(prevState: unknown, formData: FormData) {
    const user = await getCurrentUser()
    if (!user) {
        return {
            message: "Authentication required",
            success: false,
        }
    }

    const amount = Number.parseFloat(formData.get("amount") as string)
    const method = formData.get("method") as string
    const details = formData.get("details") as string

    if (!amount || amount < 10) {
        return {
            message: "Minimum withdrawal amount is $10",
            success: false,
        }
    }

    if (!method || !details) {
        return {
            message: "Please provide withdrawal method and account details",
            success: false,
        }
    }

    try {
        // Check user balance
        const currentUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { balance: true },
        })

        if (!currentUser || currentUser.balance.toNumber() < amount) {
            return {
                message: "Insufficient balance",
                success: false,
            }
        }

        await prisma.withdrawal.create({
            data: {
                userId: user.id,
                amount: amount,
                method: method,
                details: { accountDetails: details },
                status: "PENDING",
            },
        })

        revalidatePath("/dashboard/withdraw")
        revalidatePath("/dashboard/wallet")

        return {
            message: `Withdrawal request of $${amount.toLocaleString()} submitted successfully. It will be processed within 1-3 business days.`,
            success: true,
        }
    } catch (error) {
        console.error("Withdrawal error:", error)
        return {
            message: "An error occurred while processing your withdrawal request",
            success: false,
        }
    }
}
