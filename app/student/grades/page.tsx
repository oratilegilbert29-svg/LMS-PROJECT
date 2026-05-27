"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockCourses, mockAssignments } from "@/lib/mock-data"
import { Award, TrendingUp, BookOpen } from "lucide-react"

export default function StudentGradesPage() {
  const gradedAssignments = mockAssignments.filter((a) => a.status === "graded")
  const averageGrade = gradedAssignments.reduce((acc, a) => acc + (a.grade! / a.maxGrade) * 100, 0) / gradedAssignments.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Grades</h1>
        <p className="text-gray-500">View your academic performance</p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Overall GPA</CardTitle>
            <Award className="h-4 w-4 text-[#0d4f4f]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.7</div>
            <p className="text-xs text-green-500">Top 15% of class</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Math.round(averageGrade)}%</div>
            <p className="text-xs text-gray-500">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{gradedAssignments.length}</div>
            <p className="text-xs text-gray-500">Assignments graded</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Grades */}
      <Card>
        <CardHeader>
          <CardTitle>Course Performance</CardTitle>
          <CardDescription>Your grades by course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockCourses.slice(0, 3).map((course, index) => {
            const grades = [87, 92, 78]
            const grade = grades[index]
            return (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-gray-500">{course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{grade}%</div>
                    <p className="text-sm text-gray-500">
                      {grade >= 90 ? "A" : grade >= 80 ? "B" : grade >= 70 ? "C" : "D"}
                    </p>
                  </div>
                </div>
                <Progress value={grade} className="h-2" />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Recent Grades */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Grades</CardTitle>
          <CardDescription>Your latest graded assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gradedAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-gray-500">{assignment.courseName}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {assignment.grade}/{assignment.maxGrade}
                  </div>
                  <p className="text-sm text-gray-500">
                    {Math.round((assignment.grade! / assignment.maxGrade) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
