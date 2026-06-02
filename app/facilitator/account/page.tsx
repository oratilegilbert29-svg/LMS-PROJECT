"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Shield } from "lucide-react"

export default function FacilitatorAccountPage() {
  const [email, setEmail] = useState("facilitator@example.com")
  const [phone, setPhone] = useState("+123 456 7890")
  const [saved, setSaved] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account</h1>
          <p className="text-gray-600">Manage your facilitator account settings, security, and personal information.</p>
        </div>
        <Button
          className="gap-2 bg-[#0f3b92] hover:bg-[#0d3675]"
          onClick={() => setSaved(true)}
        >
          Save Changes
        </Button>
      </div>

      {saved && (
        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">Account details saved successfully.</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#0f3b92]" />
            Account Details
          </CardTitle>
          <CardDescription>Update your main account contact information.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="mike.facilitator" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#0f3b92]" />
            Security Options
          </CardTitle>
          <CardDescription>Manage account security and recovery settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="font-medium">Two-factor Authentication</p>
              <p className="text-sm text-gray-500">Enabled for your account to keep your login secure.</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="font-medium">Recovery Email</p>
              <p className="text-sm text-gray-500">Update your recovery email address when needed.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
