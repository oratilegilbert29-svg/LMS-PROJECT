"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { mockFacilitatorStats, mockCourses, mockSubmissions, mockAssignments } from "@/lib/mock-data"
import {
  Users,
  BookOpen,
  FileText,
  Star,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle,
  X,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FacilitatorDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [showAssignmentForm, setShowAssignmentForm] = useState(false)
  const [assignmentTitle, setAssignmentTitle] = useState("")
  const [assignmentCourse, setAssignmentCourse] = useState("")
  const [assignmentDescription, setAssignmentDescription] = useState("")
  const stats = mockFacilitatorStats
  const myCourses = mockCourses.filter((c) => c.instructor === "Mike Facilitator")
  const pendingSubmissions = mockSubmissions.filter((s) => s.status === "pending")

  const handleCreateAssignment = () => {
    if (!assignmentTitle || !assignmentCourse) return
    const newAssignment = {
      id: mockAssignments.length + 1,
      title: assignmentTitle,
      courseName: assignmentCourse,
      dueDate: new Date().toISOString(),
      status: "active",
      maxGrade: 100,
    }
    mockAssignments.push(newAssignment as any)
    setAssignmentTitle("")
    setAssignmentCourse("")
    setAssignmentDescription("")
    setShowAssignmentForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facilitator Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}. Here&apos;s your teaching overview.</p>
        </div>
        <Button
          className="gap-2 bg-[#005792] hover:bg-[#00437a]"
          onClick={() => setShowAssignmentForm(true)}
        >
          <Plus className="h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      {showAssignmentForm && (
        <Card className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">New Assignment</h2>
              <p className="text-sm text-gray-500">Add a new assignment and publish it for students.</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowAssignmentForm(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <Label htmlFor="assignment-title">Assignment Title</Label>
              <Input
                id="assignment-title"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                placeholder="e.g. Week 5 Homework"
              />
            </div>
            <div>
              <Label htmlFor="assignment-course">Course</Label>
              <select
                id="assignment-course"
                value={assignmentCourse}
                onChange={(e) => setAssignmentCourse(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select course</option>
                {myCourses.map((course) => (
                  <option key={course.id} value={course.title}>{course.title}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="assignment-desc">Description</Label>
              <Textarea
                id="assignment-desc"
                value={assignmentDescription}
                onChange={(e) => setAssignmentDescription(e.target.value)}
                placeholder="Brief description of the assignment"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAssignmentForm(false)}>Cancel</Button>
              <Button className="bg-[#005792] hover:bg-[#00437a]" onClick={handleCreateAssignment}>Create Assignment</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
            <Users className="h-4 w-4 text-[#005792]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-green-500">+8 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCourses}</div>
            <p className="text-xs text-gray-500">2 drafts pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Grading</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingGrading}</div>
            <p className="text-xs text-orange-500">Needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold">{stats.averageRating}</span>
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-xs text-gray-500">Based on 45 reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* My Courses */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Courses you are teaching</CardDescription>
            </div>
            <Link href="/facilitator/courses">
              <Button variant="ghost" size="sm" className="gap-1 text-[#005792]">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {myCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#005792]/10">
                      <BookOpen className="h-6 w-6 text-[#005792]" />
                    </div>
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-gray-500">{course.duration}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      course.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {course.status}
                  </Badge>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Users className="h-4 w-4" />
                      {course.enrolledStudents} students
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <FileText className="h-4 w-4" />
                      12 lessons
                    </span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => router.push(`/facilitator/courses`)}>
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Submissions</CardTitle>
            <CardDescription>Assignments awaiting review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingSubmissions.map((submission) => (
              <div key={submission.id} className="rounded-lg border p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{submission.studentName}</h4>
                    <p className="text-sm text-gray-500">{submission.assignmentTitle}</p>
                  </div>
                  <Clock className="h-4 w-4 text-orange-500" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                  </span>
                  <Button
                    size="sm"
                    className="h-7 bg-[#005792] hover:bg-[#00437a]"
                    onClick={() => router.push("/facilitator/grading")}
                  >
                    Grade
                  </Button>
                </div>
              </div>
            ))}
            <Link href="/facilitator/grading">
              <Button variant="outline" className="w-full">
                View All Submissions
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Student Progress Overview</CardTitle>
          <CardDescription>Average completion rates across your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myCourses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{course.title}</span>
                  <span className="text-sm text-gray-500">
                    {Math.floor(Math.random() * 30) + 60}% avg. completion
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={Math.floor(Math.random() * 30) + 60} className="h-2 flex-1" />
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>{Math.floor(Math.random() * 20) + 10} completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
