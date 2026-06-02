"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Camera } from "lucide-react"

export default function FacilitatorProfilePage() {
  const [name, setName] = useState("Mike Facilitator")
  const [email, setEmail] = useState("facilitator@example.com")
  const [phone, setPhone] = useState("+123 456 7890")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("Experienced web developer and educator focused on building practical learning experiences.")
  const [location, setLocation] = useState("Cape Town, South Africa")
  const [profilePicture, setProfilePicture] = useState("")
  const [saved, setSaved] = useState(false)

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setProfilePicture(file.name)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Update your facilitator profile, contact details, and security settings.</p>
        </div>
        <Button
          className="gap-2 bg-[#0f3b92] hover:bg-[#0d3675]"
          onClick={() => setSaved(true)}
        >
          Save Profile
        </Button>
      </div>

      {saved && (
        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">Profile updated successfully.</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#0f3b92]" />
            Profile Information
          </CardTitle>
          <CardDescription>Keep your personal information current.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
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
          <div className="md:col-span-2">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea id="profile-bio" value={bio} onChange={(event) => setBio(event.target.value)} className="h-28" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <div className="flex items-center gap-4">
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
          <div className="md:col-span-2">
            <Label htmlFor="profile-password">Password</Label>
            <Input
              id="profile-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter new password"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
