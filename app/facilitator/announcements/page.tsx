"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { mockCourses } from "@/lib/mock-data"
import { Plus, Megaphone, Trash2, Calendar, Paperclip } from "lucide-react"

interface Announcement {
  id: number
  title: string
  content: string
  date: string
  priority: string
  course?: string
  attachments?: string[]
}

export default function FacilitatorAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Welcome to the new course term",
      content: "Start strong and check the first assignment schedule.",
      date: "2026-05-20",
      priority: "Medium",
      course: "Introduction to Web Development",
      attachments: ["term-schedule.pdf"],
    },
    {
      id: 2,
      title: "Live Q&A session",
      content: "Join the live session for course questions and grading details.",
      date: "2026-05-25",
      priority: "High",
      course: "Advanced React Patterns",
      attachments: [],
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "Medium",
    course: "",
  })

  const courseOptions = mockCourses.filter((course) => course.instructor === "Mike Facilitator")

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) return
    const announcement: Announcement = {
      id: announcements.length + 1,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toISOString().split('T')[0],
      priority: newAnnouncement.priority,
      course: newAnnouncement.course || undefined,
    }
    setAnnouncements([announcement, ...announcements])
    setIsDialogOpen(false)
    setNewAnnouncement({ title: "", content: "", priority: "Medium", course: "" })
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600">Create, review, and manage announcements for your courses.</p>
        </div>
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
                Broadcast an announcement to your course students.
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
                <Label htmlFor="ann-course">Course (optional)</Label>
                <select
                  id="ann-course"
                  value={newAnnouncement.course}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, course: e.target.value })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">All courses</option>
                  {courseOptions.map((course) => (
                    <option key={course.id} value={course.title}>{course.title}</option>
                  ))}
                </select>
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
                      {announcement.course && (
                        <span className="text-xs text-muted-foreground">
                          Course: {announcement.course}
                        </span>
                      )}
                    </div>
                    {announcement.attachments && announcement.attachments.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {announcement.attachments.map((file, i) => (
                          <span key={i} className="inline-flex items-center gap-1 text-xs bg-gray-100 rounded-full px-2 py-1">
                            <Paperclip className="w-3 h-3" />
                            {file}
                          </span>
                        ))}
                      </div>
                    )}
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
