"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockCourses } from "@/lib/mock-data"
import { BookOpen, Clock, Users, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function StudentCoursesPage() {
  const enrolledCourses = mockCourses.slice(0, 3)
  const availableCourses = mockCourses.slice(3)

  const CourseCard = ({ course, isEnrolled }: { course: (typeof enrolledCourses)[0], isEnrolled: boolean }) => (
    <Link href={`/student/courses/${course.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="h-32 bg-gradient-to-r from-[#0d4f4f] to-[#1a6b6b]" />
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.instructor}</CardDescription>
            </div>
            <Badge className={isEnrolled ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
              {isEnrolled ? "Enrolled" : course.category}
            </Badge>
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
          {isEnrolled && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )

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
          <Input placeholder="Search courses..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Enrolled Courses</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
<<<<<<< HEAD
            <CourseCard key={course.id} course={course} isEnrolled={true} />
=======
            <Card key={course.id} className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-[#005792] to-[#00437a]" />
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
                <Button className="w-full bg-[#005792] hover:bg-[#00437a]">
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
>>>>>>> d5fd3819bd9b658203cb59ce845af23037f1d58b
          ))}
        </div>
      </div>

      {/* Available Courses */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Available Courses</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableCourses.map((course) => (
            <CourseCard key={course.id} course={course} isEnrolled={false} />
          ))}
        </div>
      </div>
    </div>
  )
}
