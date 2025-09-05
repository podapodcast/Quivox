/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { hashPassword, verifyPassword } from "@/lib/auth"

export async function updateProfileAction(prevState: any, formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return {
      message: "Authentication required",
      success: false,
    }
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) {
    return {
      message: "Name and email are required",
      success: false,
    }
  }

  try {
    // Check if email is already taken by another user
    if (email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser && existingUser.id !== user.id) {
        return {
          message: "Email is already taken",
          success: false,
        }
      }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { name, email },
    })

    revalidatePath("/dashboard/account")

    return {
      message: "Profile updated successfully",
      success: true,
    }
  } catch (error) {
    console.error("Profile update error:", error)
    return {
      message: "An error occurred while updating your profile",
      success: false,
    }
  }
}

export async function changePasswordAction(prevState: any, formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return {
      message: "Authentication required",
      success: false,
    }
  }

  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    return {
      message: "All fields are required",
      success: false,
    }
  }

  if (newPassword !== confirmPassword) {
    return {
      message: "New passwords do not match",
      success: false,
    }
  }

  if (newPassword.length < 6) {
    return {
      message: "New password must be at least 6 characters",
      success: false,
    }
  }

  try {
    // Get current user with password
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { password: true },
    })

    if (!currentUser) {
      return {
        message: "User not found",
        success: false,
      }
    }

    // Verify current password
    const isValidPassword = await verifyPassword(currentPassword, currentUser.password)
    if (!isValidPassword) {
      return {
        message: "Current password is incorrect",
        success: false,
      }
    }

    // Hash new password and update
    const hashedNewPassword = await hashPassword(newPassword)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    })

    return {
      message: "Password changed successfully",
      success: true,
    }
  } catch (error) {
    console.error("Password change error:", error)
    return {
      message: "An error occurred while changing your password",
      success: false,
    }
  }
}
