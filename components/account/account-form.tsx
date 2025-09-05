"use client"

import { useState } from "react"
import { useActionState } from "react"   // ✅ replace useFormState
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload } from "lucide-react"
import { updateProfileAction } from "@/lib/actions/account"

interface AccountFormProps {
  user: {
    id: string
    name: string | null
    email: string
    avatar: string | null
  }
}

const initialState = {
  message: "",
  success: false,
}

export function AccountForm({ user }: AccountFormProps) {
  const [state, formAction] = useActionState(updateProfileAction, initialState) // ✅ fixed
  const [isLoading, setIsLoading] = useState(false)

  const getInitials = (name: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <form
      action={async (formData) => {
        setIsLoading(true)
        await formAction(formData)
        setIsLoading(false)
      }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatar || ""} alt={user.name || ""} />
          <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <Button type="button" variant="outline" className="bg-transparent">
          <Upload className="mr-2 h-4 w-4" />
          Change Photo
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" defaultValue={user.name || ""} required disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" defaultValue={user.email} required disabled={isLoading} />
      </div>

      {state.message && (
        <Alert variant={state.success ? "default" : "destructive"}>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update Profile
      </Button>
    </form>
  )
}
