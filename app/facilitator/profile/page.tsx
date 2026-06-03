"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Shield, Camera } from "lucide-react"

export default function FacilitatorProfilePage() {
  const [name, setName] = useState("Mike Facilitator")
  const [email, setEmail] = useState("facilitator@example.com")
  const [phone, setPhone] = useState("+123 456 7890")
  const [username, setUsername] = useState("mike.facilitator")
  const [location, setLocation] = useState("Cape Town, South Africa")
  const [bio, setBio] = useState("Experienced web developer and educator focused on building practical learning experiences.")
  const [password, setPassword] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [saved, setSaved] = useState(false)

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setProfilePicture(file.name)
    }
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile & Account</h1>
          <p className="text-gray-600">Manage your profile, account settings, and security.</p>
        </div>
        <Button
          className="gap-2 bg-[#005792] hover:bg-[#00437a]"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>

      {saved && (
        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">Profile updated successfully.</div>
      )}

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#005792]" />
            Profile Information
          </CardTitle>
          <CardDescription>Keep your personal information current.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#005792] text-2xl font-bold text-white">
                {name.split(" ").map((n) => n[0]).join("")}
              </div>
              <Button variant="outline" className="gap-2" asChild>
                <label htmlFor="profile-picture" className="cursor-pointer">
                  <Camera className="h-4 w-4" />
                  Upload Photo
                </label>
              </Button>
              <span className="text-sm text-slate-500">{profilePicture || "No file selected"}</span>
            </div>
            <input id="profile-picture" type="file" className="hidden" onChange={handlePictureChange} />
          </div>
          <div>
            <Label htmlFor="profile-name">Full Name</Label>
            <Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div>
            <Label htmlFor="profile-email">Email</Label>
            <Input id="profile-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div>
            <Label htmlFor="profile-phone">Phone</Label>
            <Input id="profile-phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </div>
          <div>
            <Label htmlFor="profile-location">Location</Label>
            <Input id="profile-location" value={location} onChange={(event) => setLocation(event.target.value)} />
          </div>
          <div>
            <Label htmlFor="profile-username">Username</Label>
            <Input id="profile-username" value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea id="profile-bio" value={bio} onChange={(event) => setBio(event.target.value)} className="h-28" />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#005792]" />
            Security
          </CardTitle>
          <CardDescription>Manage your password and account security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="profile-password">New Password</Label>
              <Input
                id="profile-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter new password"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
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
