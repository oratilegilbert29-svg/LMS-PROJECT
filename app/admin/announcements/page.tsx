"use client"

import { useState } from "react"
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
=======
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
<<<<<<< HEAD
import { mockAnnouncements } from "@/lib/mock-data"
import { Plus, Bell, Edit, Trash2, X } from "lucide-react"

export default function AdminAnnouncementsPage() {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [audience, setAudience] = useState("all")
  const [announcements, setAnnouncements] = useState(mockAnnouncements)

  const handlePublish = () => {
    if (!title || !content) return

    setAnnouncements([
      {
        id: `${announcements.length + 1}`,
        title,
        content,
        author: "Admin",
        date: new Date().toISOString(),
      },
      ...announcements,
    ])

    setTitle("")
    setContent("")
    setAudience("all")
    setShowForm(false)
  }

=======
import { Plus, Megaphone, Trash2, Calendar } from "lucide-react"
import { adminAnnouncements } from "@/lib/mock-data"

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(adminAnnouncements)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "Medium",
  })

  const handleCreateAnnouncement = () => {
    const announcement = {
      id: announcements.length + 1,
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0],
    }
    setAnnouncements([announcement, ...announcements])
    setIsDialogOpen(false)
    setNewAnnouncement({ title: "", content: "", priority: "Medium" })
  }

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter((ann) => ann.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-600 hover:bg-red-700"
      case "Medium":
        return "bg-orange-600 hover:bg-orange-700"
      case "Low":
        return "bg-green-600 hover:bg-green-700"
      default:
        return ""
    }
  }

>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Announcements</h1>
          <p className="text-muted-foreground mt-1">Manage system-wide announcements</p>
        </div>
<<<<<<< HEAD
        <Button
          className="gap-2 bg-[#0d4f4f] hover:bg-[#0a3d3d]"
          onClick={() => setShowForm((current) => !current)}
        >
          <Plus className="h-4 w-4" />
          New Announcement
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {showForm && (
          <Card className="lg:col-span-1">
            <CardHeader className="flex items-center justify-between gap-4">
              <CardTitle>Create Announcement</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Announcement title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Write your announcement..."
                  className="min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <select
                  id="audience"
                  value={audience}
                  onChange={(event) => setAudience(event.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="students">Students Only</option>
                  <option value="facilitators">Facilitators Only</option>
                </select>
              </div>
              <Button className="w-full bg-[#0d4f4f] hover:bg-[#0a3d3d]" onClick={handlePublish}>
                Publish Announcement
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Announcements List */}
        <Card className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement, index) => (
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
                        Posted by {announcement.author} on {new Date(announcement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
=======
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#005792] hover:bg-[#00437a]">
              <Plus className="w-4 h-4 mr-2" />
              Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Broadcast an announcement to all users in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="ann-title">Title</Label>
                <Input
                  id="ann-title"
                  value={newAnnouncement.title}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                  }
                  placeholder="Enter announcement title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ann-content">Content</Label>
                <Textarea
                  id="ann-content"
                  value={newAnnouncement.content}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
                  }
                  placeholder="Enter announcement content"
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <div className="flex gap-2">
                  {["Low", "Medium", "High"].map((priority) => (
                    <Button
                      key={priority}
                      type="button"
                      variant={newAnnouncement.priority === priority ? "default" : "outline"}
                      onClick={() => setNewAnnouncement({ ...newAnnouncement, priority })}
                      className={
                        newAnnouncement.priority === priority
                          ? getPriorityColor(priority)
                          : ""
                      }
                    >
                      {priority}
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAnnouncement} className="bg-[#005792] hover:bg-[#00437a]">
                Publish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-[#005792] p-2 rounded-lg">
                    <Megaphone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="mb-2">{announcement.title}</CardTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {announcement.date}
                      </div>
                      <Badge variant="default" className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}