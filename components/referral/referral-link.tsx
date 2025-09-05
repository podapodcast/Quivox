"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Share, Copy } from "lucide-react"

export default function ReferralLink({ referralLink }: { referralLink: string }) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralLink)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Share className="h-5 w-5" />
          <span>Your Referral Link</span>
        </CardTitle>
        <CardDescription>Share this link with friends to earn commissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input value={referralLink} readOnly className="flex-1" />
          <Button onClick={copyToClipboard} variant="outline">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
