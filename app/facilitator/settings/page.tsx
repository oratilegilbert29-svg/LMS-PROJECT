"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { User, Bell, Shield, BookOpen } from "lucide-react"

export default function FacilitatorSettingsPage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [bio, setBio] = useState("Experienced web developer with 10+ years in the industry. Passionate about teaching and helping students achieve their goals.")
  const [expertise, setExpertise] = useState("Web Development, React, JavaScript, Node.js")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSaveProfile = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) return
    if (newPassword !== confirmPassword) return
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your facilitator preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#005792]" />
              Profile Settings
            </CardTitle>
            <CardDescription>Update your professional information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#005792] text-2xl font-bold text-white">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <Button variant="outline" onClick={() => alert("Photo upload dialog would open here")}>Change Photo</Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell students about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expertise">Areas of Expertise</Label>
              <Input
                id="expertise"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
              />
            </div>
            <Button className="bg-[#005792] hover:bg-[#00437a]" onClick={handleSaveProfile}>
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Teaching Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#005792]" />
              Teaching Preferences
            </CardTitle>
            <CardDescription>Configure your teaching settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Office Hours</p>
                <p className="text-sm text-gray-500">Allow students to book sessions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-publish Grades</p>
                <p className="text-sm text-gray-500">Automatically publish when grading</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Late Submission Penalty</p>
                <p className="text-sm text-gray-500">Deduct points for late submissions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#005792]" />
              Notifications
            </CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Submissions</p>
                <p className="text-sm text-gray-500">Get notified when students submit</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Student Messages</p>
                <p className="text-sm text-gray-500">Receive message notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Course Enrollments</p>
                <p className="text-sm text-gray-500">New student enrollment alerts</p>
              </div>
              <Switch defaultChecked />
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
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div />
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <Button className="bg-[#005792] hover:bg-[#00437a]" onClick={handleUpdatePassword}>
              {saved ? "Updated!" : "Update Password"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
