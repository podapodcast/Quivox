"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Check, ArrowLeft, Clock } from "lucide-react"
import { createDeposit } from "@/lib/actions/deposit"
import Image from "next/image"

interface Crypto {
  name: string
  symbol: string
  image: string
  network: string
  minDeposit: number
}

export function CryptoDepositForm({ crypto, onBack }: { crypto: Crypto; onBack: () => void }) {
  const [amount, setAmount] = useState("")
  const [depositAddress] = useState("1HvbQUHS3Fq2BwxXwVrHhvn5swfDYYz9PN")
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const copyAddress = async () => {
    await navigator.clipboard.writeText(depositAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmDeposit = async () => {
    if (!amount || Number.parseFloat(amount) < crypto.minDeposit) return
    setIsProcessing(true)

    try {
      await createDeposit({
        amount: Number.parseFloat(amount),
        method: crypto.symbol,
        reference: depositAddress,
      })
      alert("Deposit submitted! Waiting for confirmation.")
    } catch (err) {
      console.error("Deposit error:", err)
      alert("Something went wrong. Try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Deposit Funds</span>
      </Button>

      {/* Header */}
      <div className="flex items-center space-x-3">
        <Image src={crypto.image} alt={crypto.name} width={40} height={40} />
        <div>
          <h2 className="text-xl font-semibold">{crypto.name} Deposit</h2>
          <p className="text-sm text-muted-foreground">{crypto.network}</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm">Amount ({crypto.symbol})</Label>
          <Input
            type="number"
            placeholder={`Min ${crypto.minDeposit} ${crypto.symbol}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm">Deposit Address</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Input value={depositAddress} readOnly className="font-mono text-sm" />
            <Button variant="outline" size="sm" onClick={copyAddress}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <Button
          onClick={handleConfirmDeposit}
          disabled={!amount || Number.parseFloat(amount) < crypto.minDeposit || isProcessing}
          className="w-full"
        >
          {isProcessing ? "Processing..." : "Confirm Deposit"}
        </Button>
      </div>

      {/* Notice */}
      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
        <CardContent className="p-3 text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
          <div className="flex items-center space-x-2 font-medium">
            <Clock className="h-4 w-4 text-yellow-600" />
            <span>Important Notice</span>
          </div>
          <p>• Send only {crypto.symbol} to this address</p>
          <p>• Minimum deposit: {crypto.minDeposit} {crypto.symbol}</p>
          <p>• Deposits are credited after network confirmations</p>
        </CardContent>
      </Card>
    </div>
  )
}
