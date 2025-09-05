"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { CryptoDepositForm } from "@/components/deposit/crypto-deposit-form"

const cryptocurrencies = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    image: "/btc.png",
    network: "Bitcoin Network",
    minDeposit: 0.001,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    image: "/eth.png",
    network: "Ethereum Network",
    minDeposit: 0.01,
  },
  {
    name: "USDT",
    symbol: "USDT",
    image: "/usdt.png",
    network: "TRC20 Network",
    minDeposit: 10,
  },
  {
    name: "Toncoin",
    symbol: "TON",
    image: "/ton.png",
    network: "TON Network",
    minDeposit: 1,
  },
  {
    name: "Solana",
    symbol: "SOL",
    image: "/sol.png",
    network: "Solana Network",
    minDeposit: 0.1,
  },
]

export default function DepositPage() {
  const [selected, setSelected] = useState<typeof cryptocurrencies[0] | null>(null)

  if (selected) {
    return <CryptoDepositForm crypto={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Deposit Funds</h1>
        <p className="text-muted-foreground text-sm">Choose a cryptocurrency to deposit</p>
      </div>

      {/* Crypto List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {cryptocurrencies.map((crypto) => (
          <Card
            key={crypto.symbol}
            className="cursor-pointer hover:shadow-sm transition p-3 text-center"
            onClick={() => setSelected(crypto)}
          >
            <CardContent className="flex flex-col items-center p-2 space-y-2">
              <Image src={crypto.image} alt={crypto.name} width={36} height={36} />
              <h3 className="font-medium">{crypto.symbol}</h3>
              <p className="text-xs text-muted-foreground">{crypto.network}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
