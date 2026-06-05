"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockCourses } from "@/lib/mock-data"
import { BookOpen, Clock, Users, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function StudentCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOption, setFilterOption] = useState<"all" | "enrolled" | "available">("all")

  // Original lists
  const allEnrolled = mockCourses.slice(0, 3)
  const allAvailable = mockCourses.slice(3)

  // Filter courses by search query (title or description)
  const filterBySearch = (course: any) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    )
  }

  const enrolledCourses = allEnrolled.filter(filterBySearch)
  const availableCourses = allAvailable.filter(filterBySearch)

  // Determine which sections to show based on filterOption
  const showEnrolled = filterOption === "all" || filterOption === "enrolled"
  const showAvailable = filterOption === "all" || filterOption === "available"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-500">Manage and explore your learning journey</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search courses by title or description..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            className="flex h-10 w-full sm:w-40 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#0d4f4f]"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value as any)}
          >
            <option value="all">All Courses</option>
            <option value="enrolled">Enrolled Only</option>
            <option value="available">Available Only</option>
          </select>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      {showEnrolled && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Enrolled Courses {enrolledCourses.length > 0 && `(${enrolledCourses.length})`}
          </h2>
          {enrolledCourses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                No enrolled courses match your search.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <Link key={course.id} href={`/student/courses/${course.id}`} className="block cursor-pointer">
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="h-32 bg-gradient-to-r from-[#0d4f4f] to-[#1a6b6b]" />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <CardDescription>{course.instructor}</CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Enrolled</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.enrolledStudents}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button
                        className="w-full bg-[#0d4f4f] hover:bg-[#0a3d3d]"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link href={`/student/courses/${course.id}`}>Continue Learning</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Available Courses Section */}
      {showAvailable && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Available Courses {availableCourses.length > 0 && `(${availableCourses.length})`}
          </h2>
          {availableCourses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                No available courses match your search.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableCourses.map((course) => (
                <Link key={course.id} href={`/student/courses/${course.id}`} className="block cursor-pointer">
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="h-32 bg-gradient-to-r from-gray-400 to-gray-500" />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <CardDescription>{course.instructor}</CardDescription>
                        </div>
                        <Badge variant="outline">{course.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.enrolledStudents} enrolled
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link href={`/student/courses/${course.id}`}>Enroll Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}