"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockAssignments } from "@/lib/mock-data"
import { FileText, Clock, CheckCircle, AlertCircle, Upload } from "lucide-react"

export default function StudentAssignmentsPage() {
  const pendingAssignments = mockAssignments.filter((a) => a.status === "pending")
  const submittedAssignments = mockAssignments.filter((a) => a.status === "submitted")
  const gradedAssignments = mockAssignments.filter((a) => a.status === "graded")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <p className="text-gray-500">Track and submit your coursework</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Submitted</CardTitle>
            <Upload className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submittedAssignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Graded</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gradedAssignments.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Pending Assignments
          </CardTitle>
          <CardDescription>Complete these before the deadline</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-gray-500">{assignment.courseName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    <Clock className="mr-1 h-3 w-3" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </Badge>
                  <p className="mt-1 text-xs text-gray-500">Max: {assignment.maxGrade} points</p>
                </div>
                <Button className="bg-[#0d4f4f] hover:bg-[#0a3d3d]">Submit</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submitted Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-500" />
            Submitted
          </CardTitle>
          <CardDescription>Awaiting grading</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {submittedAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-gray-500">{assignment.courseName}</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Awaiting Grade</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Graded Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Graded
          </CardTitle>
          <CardDescription>View your results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {gradedAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-gray-500">{assignment.courseName}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {assignment.grade}/{assignment.maxGrade}
                </div>
                <p className="text-sm text-gray-500">
                  {Math.round((assignment.grade! / assignment.maxGrade) * 100)}%
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
