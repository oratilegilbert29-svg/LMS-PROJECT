"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import {
  mockStudentStats,
  mockCourses,
  mockAssignments,
  mockAnnouncements,
} from "@/lib/mock-data"
import { BookOpen, FileText, Award, Clock, ArrowRight, Bell, Calendar } from "lucide-react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function StudentDashboard() {
  const { user } = useAuth()
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  
  const stats = mockStudentStats
  const courses = mockCourses.slice(0, 3)
  const allAssignments = mockAssignments
  const assignments = allAssignments.filter((a) => a.status === "pending").slice(0, 3)
  const announcements = mockAnnouncements.slice(0, 2)

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const currentDate = new Date()
  const displayDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1)
  const currentMonth = displayDate.toLocaleString("default", { month: "long", year: "numeric" })

  // Generate calendar days
  const firstDay = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1)
  const lastDay = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0)
  const startPadding = firstDay.getDay()
  const totalDays = lastDay.getDate()

  const calendarDays = []
  for (let i = 0; i < startPadding; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i)
  }

  // Get assignments with due dates
  const assignmentDates = allAssignments.map((a) => new Date(a.dueDate).getDate())

  // Get assignments due on selected day
  const assignmentsOnSelectedDay = selectedDay
    ? allAssignments.filter((a) => new Date(a.dueDate).getDate() === selectedDay)
    : []

  const handlePrevMonth = () => setMonthOffset(monthOffset - 1)
  const handleNextMonth = () => setMonthOffset(monthOffset + 1)
  const handleDayClick = (day: number) => setSelectedDay(day)


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
            <BookOpen className="h-4 w-4 text-[#005792]" />
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
            <CardTitle className="text-sm font-medium text-gray-500">Completed Courses</CardTitle>
            <Award className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCourses}</div>
            <p className="text-xs text-green-500">+2 from last month</p>
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

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Courses In Progress */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Courses In Progress</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </div>
            <Link href="/student/courses">
              <Button variant="ghost" size="sm" className="gap-1 text-[#005792]">
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
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#005792]/10">
                  <BookOpen className="h-6 w-6 text-[#005792]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{course.title}</h4>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={course.progress} className="h-2 flex-1" />
                    <span className="text-xs font-medium text-gray-500">{course.progress}%</span>
                  </div>
                </div>

                  <Link href={`/student/courses/${course.id}`}>
                    <Button size="sm" className="bg-[#005792] hover:bg-[#004a7a]">
                      Continue
                    </Button>
                  </Link>
                  
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{currentMonth}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  onClick={() => day && handleDayClick(day)}
                  className={`min-h-[80px] rounded-lg border p-2 cursor-pointer transition-colors ${
                    day === currentDate.getDate()
                      ? "border-[#0d4f4f] bg-[#0d4f4f]/5"
                      : day
                      ? "border-gray-100 hover:bg-gray-50"
                      : "border-transparent"
                  }`}
                >
                  {day && (
                    <>
                      <span
                        className={`text-sm ${
                          day === currentDate.getDate()
                            ? "font-bold text-[#0d4f4f]"
                            : "text-gray-700"
                        }`}
                      >
                        {day}
                      </span>
                      {assignmentDates.includes(day) && (
                        <div className="mt-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Day Details Modal */}
      <Dialog open={selectedDay !== null} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#0d4f4f]" />
              Due on {selectedDay && `${currentMonth.split(" ")[0]} ${selectedDay}`}
            </DialogTitle>
            <DialogDescription>
              {assignmentsOnSelectedDay.length === 0
                ? "No assignments due on this day"
                : `${assignmentsOnSelectedDay.length} assignment${assignmentsOnSelectedDay.length > 1 ? "s" : ""} due`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {assignmentsOnSelectedDay.length > 0 ? (
              assignmentsOnSelectedDay.map((assignment) => (
                <div key={assignment.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{assignment.courseName}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        assignment.status === "pending"
                          ? "bg-orange-50 text-orange-700 border-orange-200"
                          : "bg-green-50 text-green-700 border-green-200"
                      }`}
                    >
                      {assignment.status === "pending" ? "Due" : "Completed"}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                    <Link href="/student/assignments">
                      <Button size="sm" className="bg-[#0d4f4f] hover:bg-[#0a3d3d]">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <Calendar className="mx-auto h-8 w-8 text-gray-300" />
                <p className="mt-2 text-sm text-gray-500">No assignments on this day</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
