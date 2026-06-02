"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockCourses } from "@/lib/mock-data"
import { Plus, Users, FileText, Clock, Edit, MoreHorizontal, X, BarChart3 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Course = typeof mockCourses[number]

type InfoMode = "manage" | "view" | "edit" | "analytics"

export default function FacilitatorCoursesPage() {
  const [courses, setCourses] = useState(() =>
    mockCourses.filter((c) => c.instructor === "Mike Facilitator")
  )
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState<{ id: string; mode: InfoMode } | null>(null)
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [courseDuration, setCourseDuration] = useState("")
  const [courseCategory, setCourseCategory] = useState("")
  const [courseStatus, setCourseStatus] = useState<"active" | "draft" | "archived">("draft")

  const resetCourseForm = () => {
    setCourseTitle("")
    setCourseDescription("")
    setCourseDuration("")
    setCourseCategory("")
    setCourseStatus("draft")
  }

  const handleCreateCourse = () => {
    if (!courseTitle || !courseDescription || !courseDuration || !courseCategory) {
      return
    }

    const newCourse: Course = {
      id: `${courses.length + 1}`,
      title: courseTitle,
      description: courseDescription,
      instructor: "Mike Facilitator",
      duration: courseDuration,
      category: courseCategory,
      thumbnail: "/placeholder.svg?height=200&width=300",
      status: courseStatus,
      enrolledStudents: 0,
      progress: 0,
    }

    setCourses((current) => [newCourse, ...current])
    resetCourseForm()
    setShowCourseForm(false)
  }

  const handleToggleInfo = (courseId: string, mode: InfoMode) => {
    setSelectedInfo((current) =>
      current?.id === courseId && current.mode === mode ? null : { id: courseId, mode }
    )
  }

  const handleViewDetails = (course: Course) => {
    setSelectedInfo({ id: course.id, mode: "view" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-500">Manage the courses you teach</p>
        </div>
        <Button className="gap-2 bg-[#0d4f4f] hover:bg-[#0a3d3d]" onClick={() => setShowCourseForm(true)}>
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      {showCourseForm && (
        <Card className="border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Create a New Course</CardTitle>
              <CardDescription>Fill in the course information to add it to your teaching dashboard.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => { resetCourseForm(); setShowCourseForm(false) }}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 py-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="course-title">Course Title</Label>
              <Input
                id="course-title"
                value={courseTitle}
                onChange={(event) => setCourseTitle(event.target.value)}
                placeholder="Enter course title"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="course-description">Description</Label>
              <Input
                id="course-description"
                value={courseDescription}
                onChange={(event) => setCourseDescription(event.target.value)}
                placeholder="Enter course summary"
              />
            </div>
            <div>
              <Label htmlFor="course-duration">Duration</Label>
              <Input
                id="course-duration"
                value={courseDuration}
                onChange={(event) => setCourseDuration(event.target.value)}
                placeholder="e.g. 8 weeks"
              />
            </div>
            <div>
              <Label htmlFor="course-category">Category</Label>
              <Input
                id="course-category"
                value={courseCategory}
                onChange={(event) => setCourseCategory(event.target.value)}
                placeholder="e.g. Development"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="course-status">Status</Label>
              <select
                id="course-status"
                value={courseStatus}
                onChange={(event) => setCourseStatus(event.target.value as "active" | "draft" | "archived")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => { resetCourseForm(); setShowCourseForm(false) }}>
              Cancel
            </Button>
            <Button className="bg-[#0d4f4f] hover:bg-[#0a3d3d]" onClick={handleCreateCourse}>
              Add Course
            </Button>
          </div>
        </Card>
      )}

      {/* Course Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((acc, c) => acc + (c.enrolledStudents || 0), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {courses.filter((c) => c.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {courses.filter((c) => c.status === "draft").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.category}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      course.status === "active"
                        ? "bg-green-100 text-green-700"
                        : course.status === "draft"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {course.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleToggleInfo(course.id, "manage") }>
                        <Edit className="mr-2 h-4 w-4" />
                        Manage Course
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleInfo(course.id, "view") }>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleInfo(course.id, "analytics") }>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleInfo(course.id, "edit") }>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{course.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.enrolledStudents} students
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  12 lessons
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Avg. Completion</span>
                  <span className="font-medium">{course.progress ?? 0}%</span>
                </div>
                <Progress value={course.progress ?? 0} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-[#0d4f4f] hover:bg-[#0a3d3d]" onClick={() => handleToggleInfo(course.id, "manage") }>
                  Manage
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => handleViewDetails(course)}>
                  View Details
                </Button>
              </div>

              {selectedInfo?.id === course.id && selectedInfo.mode === "manage" ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold">Manage Course</p>
                  <p className="mt-2">Course status: <strong>{course.status}</strong></p>
                  <p className="mt-1">Expected duration: <strong>{course.duration}</strong></p>
                  <p className="mt-1">Instructor: <strong>{course.instructor}</strong></p>
                  <p className="mt-1">Category: <strong>{course.category}</strong></p>
                  <p className="mt-2">Use this view to manage syllabus updates, student messaging, enrollment settings, and grading workflow.</p>
                </div>
              ) : null}

              {selectedInfo?.id === course.id && selectedInfo.mode === "view" ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold">Course Details</p>
                  <p className="mt-2">Students enrolled: <strong>{course.enrolledStudents}</strong></p>
                  <p className="mt-1">Average completion: <strong>{course.progress ?? 0}%</strong></p>
                  <p className="mt-1">Duration: <strong>{course.duration}</strong></p>
                  <p className="mt-1">Category: <strong>{course.category}</strong></p>
                  <p className="mt-2">This panel shows the current course performance and learner engagement details.</p>
                </div>
              ) : null}

              {selectedInfo?.id === course.id && selectedInfo.mode === "analytics" ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold">Course Analytics</p>
                  <p className="mt-2">Completion progress: <strong>{course.progress ?? 0}%</strong></p>
                  <p className="mt-1">Enrollment count: <strong>{course.enrolledStudents}</strong></p>
                  <p className="mt-1">Learner activity: <strong>Monitoring engagement and assignment completion</strong></p>
                  <p className="mt-2">Use this view to understand how the course is performing and where students need support.</p>
                </div>
              ) : null}

              {selectedInfo?.id === course.id && selectedInfo.mode === "edit" ? (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold">Edit Course</p>
                  <p className="mt-2">To update this course, change the title, description, category, duration, or status.</p>
                  <p className="mt-2">Current title: <strong>{course.title}</strong></p>
                  <p className="mt-1">Current description: <strong>{course.description}</strong></p>
                  <p className="mt-1">Current category: <strong>{course.category}</strong></p>
                  <p className="mt-1">Current status: <strong>{course.status}</strong></p>
                  <p className="mt-2">This panel is a placeholder for an edit form in the final workflow.</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
