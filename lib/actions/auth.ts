"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createUser, getUserByEmail, verifyPassword } from "@/lib/auth"
import { generateSessionToken, createSession, validateSessionToken } from "@/lib/session"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signupAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    return {
      message: "All fields are required",
      success: false,
    }
  }

  if (password !== confirmPassword) {
    return {
      message: "Passwords do not match",
      success: false,
    }
  }

  if (password.length < 6) {
    return {
      message: "Password must be at least 6 characters",
      success: false,
    }
  }

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return {
        message: "User with this email already exists",
        success: false,
      }
    }

    // Create user
    const user = await createUser(email, password, name)

    // Create session
    const sessionToken = generateSessionToken()
    await createSession(sessionToken, user.id)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

  } catch (error) {
    console.error("Signup error:", error)
    return {
      message: "An error occurred during signup",
      success: false,
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      message: "Email and password are required",
      success: false,
    }
  }

  try {
    // Get user
    const user = await getUserByEmail(email)
    if (!user) {
      return {
        message: "Invalid email or password",
        success: false,
      }
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return {
        message: "Invalid email or password",
        success: false,
      }
    }

    // Create session
    const sessionToken = generateSessionToken()
    await createSession(sessionToken, user.id)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return {
      success: true,
      message: "Login successful",
    }

  } catch (error) {
    console.error("Login error:", error)
    return {
      message: "An error occurred during login",
      success: false,
    }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session")?.value

  if (sessionToken) {
    // Invalidate session in database
    await validateSessionToken(sessionToken)
  }

  // Clear cookie
  cookieStore.delete("session")
  redirect("/")
}
