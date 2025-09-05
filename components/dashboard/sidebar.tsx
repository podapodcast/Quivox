"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Wallet,
  Receipt,
  Users,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";
import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Deposit", href: "/dashboard/deposit", icon: ArrowDownRight },
  { title: "Withdraw", href: "/dashboard/withdraw", icon: ArrowUpRight },
  { title: "Invest", href: "/dashboard/invest", icon: DollarSign },
  { title: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { title: "Transactions", href: "/dashboard/transactions", icon: Receipt },
  { title: "Referrals", href: "/dashboard/referrals", icon: Users },
  { title: "Account", href: "/dashboard/account", icon: User },
];

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    if (onNavigate) onNavigate(); // Close sidebar first (mobile)
    window.location.href = href; // Navigate
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <button
          onClick={() => handleNavigation("/dashboard")}
          className="flex items-center space-x-2"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
            <span className="text-black font-bold text-base">Q</span>
          </div>
          <span className="text-2xl font-bold">Quivox</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                isActive &&
                  "bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              <div>{item.title}</div>
            </Button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-64 p-0 bg-sidebar border-sidebar-border"
        >
          <VisuallyHidden>
            <SheetTitle>Sidebar Navigation</SheetTitle>
          </VisuallyHidden>
          {/* Pass callback to close on click */}
          <SidebarContent onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="hidden lg:block w-64 h-screen bg-sidebar border-r border-sidebar-border">
        <SidebarContent />
      </div>
    </>
  );
}
