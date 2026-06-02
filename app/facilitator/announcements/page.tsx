"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, Paperclip } from "lucide-react"
import { mockCourses } from "@/lib/mock-data"

const initialAnnouncements = [
  {
    id: "1",
    title: "Welcome to the new course term",
    date: "2026-05-20",
    summary: "Start strong and check the first assignment schedule.",
    course: "Introduction to Web Development",
    attachments: ["term-schedule.pdf"],
  },
  {
    id: "2",
    title: "Live Q&A session",
    date: "2026-05-25",
    summary: "Join the live session for course questions and grading details.",
    course: "Advanced React Patterns",
    attachments: [],
  },
]

export default function FacilitatorAnnouncementsPage() {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [courseId, setCourseId] = useState("")
  const [attachment, setAttachment] = useState("")
  const [announcements, setAnnouncements] = useState(initialAnnouncements)

  const courseOptions = mockCourses.filter((course) => course.instructor === "Mike Facilitator")
  const selectedCourse = courseOptions.find((course) => course.id === courseId)

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAttachment(file.name)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600">Create, review, and manage announcements for your courses.</p>
        </div>
        <Button className="gap-2 bg-[#0f3b92] hover:bg-[#0d3675]" onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
          New Announcement
        </Button>
      </div>

      {showForm && (
        <Card className="border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Publish Announcement</CardTitle>
              <CardDescription>Share a message with students in a specific course.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 py-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="announcement-title">Title</Label>
              <Input
                id="announcement-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Announcement title"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="announcement-message">Description</Label>
              <Textarea
                id="announcement-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write your announcement..."
                className="h-28"
              />
            </div>
            <div>
              <Label htmlFor="announcement-course">Course</Label>
              <select
                id="announcement-course"
                value={courseId}
                onChange={(event) => setCourseId(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select course</option>
                {courseOptions.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="announcement-attachment">Attachment</Label>
              <input
                id="announcement-attachment"
                type="file"
                className="w-full text-sm text-slate-600"
                onChange={handleAttachmentChange}
              />
              {attachment && (
                <p className="mt-2 text-sm text-slate-500 flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  {attachment}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#0f3b92] hover:bg-[#0d3675]"
              onClick={() => {
                if (!title || !message || !courseId) return
                setAnnouncements([
                  {
                    id: `${announcements.length + 1}`,
                    title,
                    date: new Date().toLocaleDateString("en-US"),
                    summary: message,
                    course: selectedCourse?.title || "",
                    attachments: attachment ? [attachment] : [],
                  },
                  ...announcements,
                ])
                setTitle("")
                setMessage("")
                setCourseId("")
                setAttachment("")
                setShowForm(false)
              }}
            >
              Publish Announcement
            </Button>
          </div>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Published Announcements</CardTitle>
          <CardDescription>Latest messages shared with your students.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{announcement.title}</h2>
                  <p className="text-sm text-gray-500">{announcement.date}</p>
                  <p className="text-sm text-slate-600">Course: {announcement.course}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  Live
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-600">{announcement.summary}</p>
              {announcement.attachments?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {announcement.attachments.map((file, index) => (
                    <span key={index} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      <Paperclip className="h-3.5 w-3.5" />
                      {file}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
