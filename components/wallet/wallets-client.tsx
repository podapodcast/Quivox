/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { AddWalletForm } from "@/components/wallet/add-wallet-form"
import { DeleteWalletButton } from "@/components/wallet/delete-wallet-btn"
import Image from "next/image"

export function WalletsClient({ wallets }: { wallets: any[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Wallets</h1>
        <p className="mt-2 text-muted-foreground">
          Manage all your cryptocurrency wallets in one place. Add, view, and remove wallets easily.
        </p>
      </div>

      {/* Add New Wallet */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold hover:from-orange-500 hover:to-yellow-500 hover:text-white">
            <Plus className="mr-2 h-5 w-5" /> Add New Wallet
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Wallet</DialogTitle>
          </DialogHeader>
          <AddWalletForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Wallets Grid */}
      {wallets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Wallet Header with Delete */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={`/${wallet.coinSymbol.toLowerCase()}.png`}
                        alt={wallet.coinName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{wallet.coinName}</h3>
                      <p className="text-sm text-muted-foreground">{wallet.coinSymbol}</p>
                    </div>
                  </div>
                  <DeleteWalletButton walletId={wallet.id} coinName={wallet.coinName} />
                </div>

                {/* Wallet Address */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Wallet Address</p>
                  <p className="text-sm font-mono break-all rounded bg-muted px-2 py-1">
                    {wallet.address}
                  </p>
                </div>
              </div>

              {/* Wallet Description */}
              <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                This is your {wallet.coinName} wallet.
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Wallets Added</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            You haven&apos;t added any wallets yet. Click the button above to add your first wallet.
          </p>
        </div>
      )}
    </div>
  )
}
