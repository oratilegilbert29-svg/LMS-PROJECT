"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockAnnouncements } from "@/lib/mock-data"
import { Bell, Calendar } from "lucide-react"

export default function StudentAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <p className="text-gray-500">Stay updated with the latest news</p>
      </div>

      <div className="space-y-4">
        {mockAnnouncements.map((announcement, index) => (
          <Card key={announcement.id} className={index === 0 ? "border-[#005792]" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    index === 0 ? "bg-[#005792]" : "bg-gray-100"
                  }`}>
                    <Bell className={`h-5 w-5 ${index === 0 ? "text-white" : "text-gray-500"}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {new Date(announcement.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                {index === 0 && (
                  <Badge className="bg-[#005792]">New</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{announcement.content}</p>
              <p className="mt-4 text-sm text-gray-400">Posted by {announcement.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
