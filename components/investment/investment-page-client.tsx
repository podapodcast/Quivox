"use client"

import { useState } from "react"
import { InvestmentPlanCard, PaymentConfirmationSection } from "@/components/investment/investment-plan-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface InvestmentPlan {
  id: string
  name: string
  description: string
  minAmount: number
  maxAmount: number
  interestRate: number
  duration: number
  isActive: boolean
}

interface InvestmentPageClientProps {
  plans: InvestmentPlan[]
}

export function InvestmentPageClient({ plans }: InvestmentPageClientProps) {
  const [showPaymentSection, setShowPaymentSection] = useState(false)
  const [paymentData, setPaymentData] = useState(null)
  const [showPaymentSubmittedDialog, setShowPaymentSubmittedDialog] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaymentSectionToggle = (show: boolean, data?: any) => {
    setShowPaymentSection(show)
    if (data) {
      setPaymentData(data)
    }
  }

  const handleBackToPlans = () => {
    setShowPaymentSection(false)
    setPaymentData(null)
  }

  const handlePaymentSubmitted = () => {
    setShowPaymentSubmittedDialog(true)
  }

  return (
    <>
      {showPaymentSection && paymentData ? (
        <PaymentConfirmationSection
          paymentData={paymentData}
          onBack={handleBackToPlans}
          onPaymentSubmitted={handlePaymentSubmitted}
        />
      ) : (
        /* Investment Plans Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <InvestmentPlanCard
              key={plan.id}
              plan={plan}
              isPopular={index === 1} // Make second plan popular
              onPaymentSectionToggle={handlePaymentSectionToggle}
              showPaymentSection={showPaymentSection}
              paymentData={paymentData}
            />
          ))}
        </div>
      )}

      {/* Payment Submitted Dialog */}
      <Dialog open={showPaymentSubmittedDialog} onOpenChange={setShowPaymentSubmittedDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Submitted</DialogTitle>
            <DialogDescription>Your investment is being processed</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Waiting for Confirmation</h3>
              <p className="text-muted-foreground">
                Your investment will be activated within 24 hours after blockchain confirmation.
              </p>
            </div>

            <Alert>
              <AlertDescription>
                You will receive an email notification once your investment is active.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => {
                setShowPaymentSubmittedDialog(false)
                handleBackToPlans()
              }}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
