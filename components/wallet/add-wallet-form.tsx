"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { addWallet } from "@/lib/actions/wallet"
import { toast } from "sonner"

const cryptocurrencies = [
  { name: "Bitcoin", symbol: "BTC", image: "/btc.png" },
  { name: "Ethereum", symbol: "ETH", image: "/eth.png" },
  { name: "USDT TRC20", symbol: "USDT", image: "/usdt.png" },
  { name: "Toncoin", symbol: "TON", image: "/ton.png" },
  { name: "Solana", symbol: "SOL", image: "/sol.png" },
]

export function AddWalletForm({ onSuccess }: { onSuccess?: () => void }) {
  const [selectedCoin, setSelectedCoin] = useState<string>("")
  const [customCoin, setCustomCoin] = useState<string>("")
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const coinName = selectedCoin || customCoin
      if (!coinName || !walletAddress) return

      await addWallet({
        coinName,
        coinSymbol: selectedCoin
          ? cryptocurrencies.find((c) => c.name === selectedCoin)?.symbol || ""
          : customCoin.toUpperCase(),
        address: walletAddress,
      })

      // Reset form
      setSelectedCoin("")
      setCustomCoin("")
      setWalletAddress("")

      // Show success toast
      toast.success(`${coinName} wallet added successfully`)

      // Close dialog if onSuccess is passed
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error adding wallet:", error)
      toast.error("Failed to add wallet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Select Coin */}
      <div className="space-y-3">
        <Label className="font-medium">Select Coin</Label>
        <div className="grid grid-cols-2 gap-3">
          {cryptocurrencies.map((crypto) => (
            <button
              key={crypto.name}
              type="button"
              onClick={() => {
                setSelectedCoin(crypto.name)
                setCustomCoin("")
              }}
              className={`p-3 rounded-lg border text-left transition-colors ${
                selectedCoin === crypto.name
                  ? "border-primary bg-primary/10"
                  : "border-input bg-muted hover:bg-accent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={crypto.image}
                  alt={crypto.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">{crypto.name}</p>
                  <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Coin Input */}
      <div className="space-y-2">
        <Label className="text-sm">Or enter custom coin</Label>
        <Input
          placeholder="Enter coin name"
          value={customCoin}
          onChange={(e) => {
            setCustomCoin(e.target.value)
            if (e.target.value) setSelectedCoin("")
          }}
        />
      </div>

      {/* Wallet Address */}
      <div className="space-y-2">
        <Label className="font-medium">Wallet Address</Label>
        <Input
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          required
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button type="button" variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || (!selectedCoin && !customCoin) || !walletAddress}
          className="flex-1"
        >
          {isLoading ? "Adding..." : "Add Wallet"}
        </Button>
      </div>
    </form>
  )
}
