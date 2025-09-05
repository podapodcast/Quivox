"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { removeWallet } from "@/lib/actions/wallet"
import { useTransition } from "react"

export function DeleteWalletButton({ walletId, coinName }: { walletId: string; coinName: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeWallet(walletId)
        toast.success(`${coinName} wallet deleted successfully`)
      } catch (err) {
        console.error(err)
        toast.error("Failed to delete wallet. Please try again.")
      }
    })
  }

  return (
    <Button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
    >
      <Trash2 className="h-5 w-5" />
    </Button>
  )
}
