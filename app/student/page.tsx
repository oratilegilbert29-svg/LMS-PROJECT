"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  mockStudentStats,
  mockCourses,
  mockAssignments,
  mockAnnouncements,
} from "@/lib/mock-data"
import { BookOpen, FileText, Award, Clock, ArrowRight, Bell } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const { user } = useAuth()
  const stats = mockStudentStats
  const courses = mockCourses.slice(0, 3)
  const assignments = mockAssignments.filter((a) => a.status === "pending").slice(0, 3)
  const announcements = mockAnnouncements.slice(0, 2)

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with your learning today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-[#0d4f4f]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enrolledCourses}</div>
            <p className="text-xs text-gray-500">{stats.completedCourses} completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Assignments</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingAssignments}</div>
            <p className="text-xs text-gray-500">Due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Grade</CardTitle>
            <Award className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageGrade}%</div>
            <p className="text-xs text-green-500">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5h</div>
            <p className="text-xs text-gray-500">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Courses In Progress */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Courses In Progress</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </div>
            <Link href="/student/courses">
              <Button variant="ghost" size="sm" className="gap-1 text-[#0d4f4f]">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0d4f4f]/10">
                  <BookOpen className="h-6 w-6 text-[#0d4f4f]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{course.title}</h4>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={course.progress} className="h-2 flex-1" />
                    <span className="text-xs font-medium text-gray-500">{course.progress}%</span>
                  </div>
                </div>
                <Button size="sm" className="bg-[#0d4f4f] hover:bg-[#0a3d3d]">
                  Continue
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Assignments. */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Don&apos;t miss the deadlines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="rounded-lg border p-3">
                <h4 className="font-medium">{assignment.title}</h4>
                <p className="text-xs text-gray-500">{assignment.courseName}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="outline" className="text-orange-600">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            ))}
            <Link href="/student/assignments">
              <Button variant="outline" className="w-full">
                View All Assignments
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Stay updated with the latest news</CardDescription>
          </div>
          <Bell className="h-5 w-5 text-gray-400" />
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{announcement.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{announcement.content}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(announcement.date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500">Posted by {announcement.author}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
