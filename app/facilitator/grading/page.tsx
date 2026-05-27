"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { mockSubmissions } from "@/lib/mock-data"
import { Clock, CheckCircle, User, FileText, Send } from "lucide-react"

export default function FacilitatorGradingPage() {
  const pendingSubmissions = mockSubmissions.filter((s) => s.status === "pending")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Grading</h1>
        <p className="text-gray-500">Review and grade student submissions</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingSubmissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Graded Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Grade Given</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Submissions Queue */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Submissions Queue</CardTitle>
            <CardDescription>Click to review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSubmissions.map((submission, index) => (
              <div
                key={submission.id}
                className={`cursor-pointer rounded-lg border p-3 transition-colors hover:bg-gray-50 ${
                  index === 0 ? "border-[#0d4f4f] bg-[#0d4f4f]/5" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0d4f4f] text-xs font-semibold text-white">
                      {submission.studentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{submission.studentName}</p>
                      <p className="text-xs text-gray-500">{submission.assignmentTitle}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      submission.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }
                  >
                    {submission.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Grading Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Review Submission</CardTitle>
                <CardDescription>John Student - Build a Landing Page</CardDescription>
              </div>
              <Badge className="bg-orange-100 text-orange-700">Pending</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Student Info */}
            <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d4f4f] text-lg font-semibold text-white">
                JS
              </div>
              <div>
                <p className="font-medium">John Student</p>
                <p className="text-sm text-gray-500">
                  Introduction to Web Development
                </p>
                <p className="text-xs text-gray-400">Submitted Feb 14, 2024</p>
              </div>
            </div>

            {/* Submission Content */}
            <div className="space-y-2">
              <h4 className="font-medium">Submission</h4>
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>landing-page-project.zip</span>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  Download Submission
                </Button>
              </div>
            </div>

            {/* Grading Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Grade (out of 100)</label>
                <Input type="number" placeholder="Enter grade" max={100} min={0} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Feedback</label>
                <Textarea
                  placeholder="Provide feedback for the student..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 gap-2 bg-[#0d4f4f] hover:bg-[#0a3d3d]">
                  <Send className="h-4 w-4" />
                  Submit Grade
                </Button>
                <Button variant="outline">Save Draft</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
