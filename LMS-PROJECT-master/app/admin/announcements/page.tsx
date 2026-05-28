"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { mockAnnouncements } from "@/lib/mock-data"
import { Plus, Bell, Edit, Trash2 } from "lucide-react"

export default function AdminAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-500">Manage system-wide announcements</p>
        </div>
        <Button className="gap-2 bg-[#0d4f4f] hover:bg-[#0a3d3d]">
          <Plus className="h-4 w-4" />
          New Announcement
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Create Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Create Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Announcement title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your announcement..."
                className="min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <select
                id="audience"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Users</option>
                <option value="students">Students Only</option>
                <option value="facilitators">Facilitators Only</option>
              </select>
            </div>
            <Button className="w-full bg-[#0d4f4f] hover:bg-[#0a3d3d]">
              Publish Announcement
            </Button>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAnnouncements.map((announcement, index) => (
              <div key={announcement.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d4f4f]/10">
                      <Bell className="h-5 w-5 text-[#0d4f4f]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{announcement.title}</h4>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{announcement.content}</p>
                      <p className="mt-2 text-xs text-gray-400">
                        Posted by {announcement.author} on{" "}
                        {new Date(announcement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
