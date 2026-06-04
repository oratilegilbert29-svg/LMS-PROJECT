"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { mockCourses, mockModules, mockAssignments, mockResources } from "@/lib/mock-data"
import { ArrowLeft, BookOpen, Clock, Users, CheckCircle2, Lock, FileText, Download, ExternalLink } from "lucide-react"
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

  // Get course-specific data
  const courseModules = mockModules.filter((m) => m.courseId === courseId)
  const courseAssignments = mockAssignments.filter((a) => a.courseId === courseId)
  const courseResources = mockResources.filter((r) => r.courseId === courseId)

  // Calculate progress
  const totalLessons = courseModules.reduce((sum, mod) => sum + mod.lessons, 0)
  const totalCompleted = courseModules.reduce((sum, mod) => sum + mod.completed, 0)
  const progressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link href="/student/courses">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="mt-3 text-gray-600 leading-relaxed">{course.description}</p>
        </div>
      </div>

      {/* Course Info Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Instructor</CardTitle>
            <Users className="h-4 w-4 text-[#0d4f4f]" />
          </CardHeader>
          <CardContent>
            <p className="text-base font-semibold">{course.instructor}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Duration</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-base font-semibold">{course.duration}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Students</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-base font-semibold">{course.enrolledStudents}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <p className="text-base font-semibold">{progressPercent}%</p>
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

      {/* Modules Summary */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Modules</h2>
        <div className="space-y-3">
          {courseModules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{module.title}</h3>
                      {module.locked ? (
                        <Badge variant="outline" className="bg-gray-100 text-gray-700">
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
                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
                      <span>{module.lessons} lessons</span>
                      <span>•</span>
                      <span>{module.duration}</span>
                      <span>•</span>
                      <span>{module.completed}/{module.lessons} completed</span>
                    </div>
                    <Progress
                      value={Math.round((module.completed / module.lessons) * 100)}
                      className="mt-2 h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Assignments Summary */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Assignments</h2>
        {courseAssignments.length > 0 ? (
          <div className="space-y-3">
            {courseAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{assignment.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
                        <span>Due: {assignment.dueDate}</span>
                        <span>•</span>
                        <span>Max: {assignment.maxGrade} points</span>
                      </div>
                    </div>
                    <Badge
                      className={
                        assignment.status === "graded"
                          ? "bg-green-100 text-green-700"
                          : assignment.status === "submitted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {assignment.status === "graded"
                        ? `${assignment.grade}/${assignment.maxGrade}`
                        : assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500">No assignments for this course yet</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Resources Summary */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Resources</h2>
        {courseResources.length > 0 ? (
          <div className="space-y-3">
            {courseResources.map((resource) => (
              <Card key={resource.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {resource.type === "PDF" && <FileText className="h-5 w-5 text-red-500" />}
                      {resource.type === "Video" && <BookOpen className="h-5 w-5 text-blue-500" />}
                      {resource.type === "Link" && <ExternalLink className="h-5 w-5 text-purple-500" />}
                      <div>
                        <h3 className="font-semibold">{resource.title}</h3>
                        <p className="text-sm text-gray-500">{resource.type}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(resource.url, "_blank")}
                    >
                      {resource.type === "PDF" ? (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </>
                      ) : (
                        <>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500">No resources available for this course</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
