import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardNavbar } from "@/components/dashboard/navbar"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
      <div className="flex h-screen bg-background">
        {/* Desktop sidebar - hidden on mobile and tablet */}
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
          <DashboardNavbar user={user} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
  )
}
