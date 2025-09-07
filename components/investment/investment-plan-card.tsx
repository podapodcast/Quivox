/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Clock,
  DollarSign,
  Copy,
  CheckCircle,
  Bitcoin,
  Shield,
  Zap,
  ArrowLeft,
  AlertTriangle,
  X,
} from "lucide-react";
import {
  investAction,
  submitInvestmentPayment,
} from "@/lib/actions/investment";

interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  minAmount: any;
  maxAmount: any;
  interestRate: any;
  duration: number;
  isActive: boolean;
}

interface InvestmentPlanCardProps {
  plan: InvestmentPlan;
  isPopular?: boolean;
  onPaymentSectionToggle?: (show: boolean, planData?: any) => void;
  showPaymentSection?: boolean;
  paymentData?: any;
}

const initialState = {
  message: "",
  success: false,
};

export function InvestmentPlanCard({
  plan,
  isPopular = false,
  onPaymentSectionToggle,
  showPaymentSection = false,
  paymentData,
}: InvestmentPlanCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"plan" | "waiting">("plan");
  const [showPaymentSubmittedDialog, setShowPaymentSubmittedDialog] =
    useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [state, formAction] = React.useActionState(investAction, initialState);

  const btcAddress = "1HvbQUHS3Fq2BwxXwVrHhvn5swfDYYz9PN";

  const minAmount = Number(plan.minAmount);
  const maxAmount = Number(plan.maxAmount);
  const interestRate = Number(plan.interestRate);

  const calculateEarnings = (investAmount: number) => {
    return (investAmount * interestRate) / 100;
  };

  const handleInvest = async (formData: FormData) => {
    setIsLoading(true);
    formData.append("planId", plan.id);
    await formAction(formData);
    setIsLoading(false);
    if (state.success) {
      setIsOpen(false);
      setAmount("");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirm = () => {
    setIsOpen(false);
    onPaymentSectionToggle?.(true, {
      plan,
      amount,
      btcAddress,
      calculateEarnings: calculateEarnings(Number(amount)),
    });
  };

  const handlePaymentSubmitted = () => {
    setShowPaymentSubmittedDialog(true);
  };

  const handlePaymentSubmittedDialogClose = () => {
    setShowPaymentSubmittedDialog(false);
    onPaymentSectionToggle?.(false);
  };

  if (showPaymentSection) {
    return null;
  }

  return (
    <>
      <Card
        className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
          isPopular
            ? "border-2 border-gradient-to-r from-blue-500 to-emerald-500 shadow-lg scale-105"
            : "hover:scale-102"
        }`}
      >
        {isPopular && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 py-1">
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-xl">
            <span>{plan.name}</span>
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            >
              {interestRate}% Daily
            </Badge>
          </CardTitle>
          <CardDescription className="text-base">
            {plan.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">Min Investment</span>
              </div>
              <span className="font-bold text-lg">
                ${minAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Max Investment</span>
              </div>
              <span className="font-bold text-lg">
                ${maxAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Duration</span>
              </div>
              <span className="font-bold text-lg">{plan.duration} days</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Features
            </h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Daily returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm">Secure investment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Instant activation</span>
              </div>
            </div>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full h-12 text-lg font-semibold transition-all duration-300">
                Choose Plan
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              {paymentStep === "plan" && (
                <>
                  <DialogHeader>
                    <DialogTitle>Invest in {plan.name}</DialogTitle>
                    <DialogDescription>
                      Enter your investment amount and proceed to payment
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Investment Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder={`Min: $${minAmount.toLocaleString()}`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={minAmount}
                        max={Math.min(maxAmount)}
                        step="0.01"
                        className="h-12 text-lg"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Min: ${minAmount.toLocaleString()}</span>
                        <span>
                          Max: ${Math.min(maxAmount).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {amount && Number(amount) >= minAmount && (
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Investment Amount:</span>
                          <span className="font-medium">
                            ${Number(amount).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Daily Return:</span>
                          <span className="font-medium text-emerald-600">
                            $
                            {calculateEarnings(Number(amount)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Label>Choose Payment Method</Label>
                      <div className="p-3 border rounded-lg bg-muted/30">
                        <div className="flex items-center space-x-3">
                          <Bitcoin className="h-6 w-6 text-orange-500" />
                          <div>
                            <span className="font-medium">Bitcoin (BTC)</span>
                            <p className="text-sm text-muted-foreground">
                              Secure cryptocurrency payment
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handlePaymentConfirm}
                        disabled={!amount || Number(amount) < minAmount}
                        className="flex-1"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {paymentStep === "waiting" && (
                <>
                  <DialogHeader>
                    <DialogTitle>Payment Submitted</DialogTitle>
                    <DialogDescription>
                      Your investment is being processed
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 text-center">
                    <div className="flex justify-center">
                      <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                        <Clock className="h-8 w-8 text-emerald-600" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">
                        Waiting for Confirmation
                      </h3>
                      <p className="text-muted-foreground">
                        Your investment will be activated within 24 hours after
                        blockchain confirmation.
                      </p>
                    </div>

                    <Alert>
                      <AlertDescription>
                        You will receive an email notification once your
                        investment is active.
                      </AlertDescription>
                    </Alert>

                    <Button onClick={handlePaymentSubmitted} className="w-full">
                      I Have Sent the Payment
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Dialog
        open={showPaymentSubmittedDialog}
        onOpenChange={setShowPaymentSubmittedDialog}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Submitted</DialogTitle>
            <DialogDescription>
              Your investment is being processed
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Waiting for Confirmation
              </h3>
              <p className="text-muted-foreground">
                Your investment will be activated within 24 hours after
                blockchain confirmation.
              </p>
            </div>

            <Alert>
              <AlertDescription>
                You will receive an email notification once your investment is
                active.
              </AlertDescription>
            </Alert>

            <Button
              onClick={handlePaymentSubmittedDialogClose}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function PaymentConfirmationSection({
  paymentData,
  onBack,
  onPaymentSubmitted,
}: {
  paymentData: any;
  onBack: () => void;
  onPaymentSubmitted: () => void;
}) {
  const initialState = { message: "", success: false };
  const [state, formAction] = useActionState(
    submitInvestmentPayment,
    initialState
  );
  const [copied, setCopied] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(paymentData.btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Watch for success and open dialog
  useEffect(() => {
    if (state.success) {
      setShowSuccessDialog(true);
    }
  }, [state.success]);

  return (
    <>
      <form action={formAction} className="space-y-6">
        {/* Hidden inputs to pass data */}
        <input type="hidden" name="planId" value={paymentData.plan.id} />
        <input type="hidden" name="amount" value={paymentData.amount} />
        <Card>
          <div className="flex justify-between items-start px-4">
            <CardHeader className="w-full">
              <CardTitle className="font-bold text-2xl">
                Complete Payment
              </CardTitle>
              <CardDescription>
                Send Bitcoin to the address below to activate your investment
              </CardDescription>
            </CardHeader>

            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full hover:bg-muted/30"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Investment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{paymentData.plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">
                    ${Number(paymentData.amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Return:</span>
                  <span className="font-medium text-emerald-600">
                    ${paymentData.calculateEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">
                    {paymentData.plan.duration} days
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Bitcoin className="h-8 w-8 text-orange-500" />
                <div>
                  <h4 className="font-semibold">
                    Payment Method: Bitcoin (BTC)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Send exactly ${Number(paymentData.amount).toLocaleString()}{" "}
                    worth of Bitcoin
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bitcoin Wallet Address</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={paymentData.btcAddress}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="px-3 bg-transparent"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 dark:text-orange-200">
                  <strong>Caution:</strong> Please double check the wallet
                  address before sending your payment. Transaction cannot be
                  reversed.
                </AlertDescription>
              </Alert>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Send the exact amount to the address above. Your investment
                  will be activated within 24 hours after blockchain
                  confirmation.
                </AlertDescription>
              </Alert>
            </div>

            <Button type="submit" className="w-full h-12 text-lg">
              I Have Sent the Payment
            </Button>

            {state.message && (
              <p
                className={`text-sm ${
                  state.success ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {state.message}
              </p>
            )}
          </CardContent>
        </Card>
      </form>

      {/* ✅ Success dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Submitted</DialogTitle>
            <DialogDescription>
              Your investment is being processed
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Waiting for Confirmation
              </h3>
              <p className="text-muted-foreground">
                Your investment will be activated within 24 hours after
                blockchain confirmation.
              </p>
            </div>

            <Alert>
              <AlertDescription>
                You will receive an email notification once your investment is
                active.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => {
                setShowSuccessDialog(false);
                onPaymentSubmitted(); 
              }}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
