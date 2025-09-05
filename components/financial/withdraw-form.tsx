"use client"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Info, Plus } from "lucide-react"
import { withdrawAction } from "@/lib/actions/financial"
import Link from "next/link"
import Image from "next/image"

interface WithdrawFormProps {
  userBalance: number
  userWallets: Array<{
    id: string
    coinName: string
    coinSymbol: string
    address: string
  }>
}

const initialState = {
  message: "",
  success: false,
}

const cryptoOptions = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: "/btc.png" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "/eth.png" },
  { id: "usdt", name: "USDT TRC20", symbol: "USDT", icon: "/usdt.png" },
]

export function WithdrawForm({ userBalance, userWallets }: WithdrawFormProps) {
  const [state, formAction] = useActionState(withdrawAction, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState("")

  return (
    <form
      action={async (formData) => {
        setIsLoading(true)
        await formAction(formData)
        setIsLoading(false)
      }}
      className="space-y-3"
    >
      {/* Balance */}
      <div className="flex items-center justify-between text-sm border rounded-md p-4 bg-muted/40">
        <span className="text-muted-foreground">Available Balance</span>
        <span className="font-medium">${userBalance.toFixed(2)}</span>
      </div>

      {/* Amount */}
      <div className="space-y-1.5">
        <Label htmlFor="amount" className="text-sm font-medium">
          Amount (USD)
        </Label>
        <div className="relative">
          <Input
            id="amount"
            name="amount"
            type="number"
            placeholder="0.00"
            min="10"
            max={userBalance}
            step="0.01"
            required
            disabled={isLoading}
            className="pr-12"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            USD
          </div>
        </div>
      </div>

      {/* No wallets */}
      {userWallets.length === 0 && (
        <div className="p-3 border rounded-md bg-blue-500/10 text-sm">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-500 mt-0.5" />
            <div>
              <p>You haven&apos;t added any wallets yet.</p>
              <Link href="/dashboard/wallet">
                <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-1" /> Add Wallet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Coin Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Select Coin</Label>
        <div className="flex flex-wrap items-center gap-2">
          {cryptoOptions.map((crypto) => (
            <button
              key={crypto.id}
              type="button"
              onClick={() => setSelectedCoin(crypto.id)}
              className={`flex items-center gap-2 py-3 px-5 rounded-md border transition ${
                selectedCoin === crypto.id
                  ? "bg-blue-500/10 border-blue-500"
                  : "bg-muted/30 border-border hover:bg-muted/50"
              }`}
            >
              <Image
                src={crypto.icon}
                alt={crypto.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-sm">{crypto.name}</span>
            </button>
          ))}
        </div>
        <input type="hidden" name="selectedCoin" value={selectedCoin} />
      </div>

      {/* Info Badges */}
      <div className="flex flex-wrap gap-1.5 text-xs">
        <Badge variant="secondary">Min: $10</Badge>
        <Badge variant="secondary">24-48h processing</Badge>
        <Badge variant="secondary">Network fees apply</Badge>
      </div>

      {/* Alerts */}
      {state.message && (
        <Alert variant={state.success ? "default" : "destructive"}>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || userBalance < 10 || !selectedCoin}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit Withdrawal →
      </Button>
    </form>
  )
}
