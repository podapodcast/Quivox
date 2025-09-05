"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { changePasswordAction } from "@/lib/actions/account"
import { useFormState } from "react-dom"

const initialState = {
  message: "",
  success: false,
}

export function SecuritySettings() {
  const [state, formAction] = useFormState(changePasswordAction, initialState)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <form
      action={async (formData) => {
        setIsLoading(true)
        await formAction(formData)
        setIsLoading(false)
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          placeholder="Enter current password"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Enter new password"
          minLength={6}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          minLength={6}
          required
          disabled={isLoading}
        />
      </div>

      {state.message && (
        <Alert variant={state.success ? "default" : "destructive"}>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Change Password
      </Button>
    </form>
  )
}
