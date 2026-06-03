"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { mockCourses } from "@/lib/mock-data"
import { ArrowLeft, BookOpen, Clock, Users, CheckCircle2, Lock } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.courseId as string

  // Find the course by ID
  const course = mockCourses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/student/courses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Course not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Mock course modules/lessons
  const courseModules = [
    {
      id: 1,
      title: "Introduction to the Course",
      lessons: 5,
      completed: 3,
      duration: "45 min",
      locked: false,
    },
    {
      id: 2,
      title: "Core Concepts",
      lessons: 8,
      completed: 2,
      duration: "2 hours",
      locked: false,
    },
    {
      id: 3,
      title: "Advanced Topics",
      lessons: 6,
      completed: 0,
      duration: "1.5 hours",
      locked: false,
    },
    {
      id: 4,
      title: "Project & Assessment",
      lessons: 3,
      completed: 0,
      duration: "3 hours",
      locked: true,
    },
  ]

  const totalLessons = courseModules.reduce((sum, mod) => sum + mod.lessons, 0)
  const totalCompleted = courseModules.reduce((sum, mod) => sum + mod.completed, 0)
  const progressPercent = Math.round((totalCompleted / totalLessons) * 100)

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/student/courses">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="mt-2 text-gray-600">{course.description}</p>
        </div>
      </div>

      {/* Course Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Instructor</CardTitle>
            <Users className="h-4 w-4 text-[#0d4f4f]" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{course.instructor}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Duration</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{course.duration}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{progressPercent}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>
            You have completed {totalCompleted} out of {totalLessons} lessons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercent} className="h-3" />
          <p className="mt-2 text-sm text-gray-500">{progressPercent}% Complete</p>
        </CardContent>
      </Card>

      {/* Course Modules */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Course Modules</h2>
        <div className="space-y-4">
          {courseModules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{module.title}</h3>
                      {module.locked ? (
                        <Badge variant="outline" className="bg-gray-100">
                          <Lock className="mr-1 h-3 w-3" />
                          Locked
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                      <span className="text-sm text-gray-600">{module.lessons} lessons</span>
                      <span className="hidden text-gray-300 sm:inline">•</span>
                      <span className="text-sm text-gray-600">{module.duration}</span>
                      <span className="hidden text-gray-300 sm:inline">•</span>
                      <span className="text-sm text-gray-600">
                        {module.completed} of {module.lessons} completed
                      </span>
                    </div>
                    <div className="mt-3">
                      <Progress
                        value={Math.round((module.completed / module.lessons) * 100)}
                        className="h-2"
                      />
                    </div>
                  </div>
                  <Button
                    className="ml-4 bg-[#005792] hover:bg-[#004a7a]"
                    disabled={module.locked}
                  >
                    {module.locked ? "Locked" : module.completed === module.lessons ? "Review" : "Continue"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Course Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            📚 Course Materials
          </Button>
          <Button variant="outline" className="w-full justify-start">
            📝 Assignment Submissions
          </Button>
          <Button variant="outline" className="w-full justify-start">
            💬 Discussion Forum
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
