import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AccountForm } from "@/components/account/account-form"
import { SecuritySettings } from "@/components/account/security-settings"
import { getCurrentUser } from "@/lib/session"
import { User, Shield, Bell, CreditCard } from "lucide-react"

export default async function AccountPage() {
  const user = await getCurrentUser()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile and account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Information</span>
            </CardTitle>
            <CardDescription>Update your personal information and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm user={user!} />
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
            <CardDescription>Manage your password and security preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <SecuritySettings />
          </CardContent>
        </Card>
      </div>

      {/* Additional Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Preferences</span>
            </CardTitle>
            <CardDescription>Choose what notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Investment Updates</p>
                <p className="text-sm text-muted-foreground">Get notified about your investment performance</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Deposit Confirmations</p>
                <p className="text-sm text-muted-foreground">Receive confirmation when deposits are processed</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Withdrawal Updates</p>
                <p className="text-sm text-muted-foreground">Get updates on withdrawal requests</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Account Summary</span>
            </CardTitle>
            <CardDescription>Overview of your account status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Account Status</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Member Since</span>
              <span className="text-sm font-medium">{user?.createdAt.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Account Balance</span>
              <span className="text-sm font-medium">${Number(user?.balance || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Invested</span>
              <span className="text-sm font-medium">${Number(user?.totalInvested || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Earnings</span>
              <span className="text-sm font-medium text-green-600">
                ${Number(user?.totalEarnings || 0).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
