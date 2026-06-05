"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockAssignments } from "@/lib/mock-data"
import { FileText, Clock, CheckCircle, AlertCircle, Upload, ChevronDown, ChevronRight } from "lucide-react"

// Extend assignments with a duration field (if not already present)
// In a real app, you would add this to mock-data.ts
const assignmentsWithDuration = mockAssignments.map(assignment => ({
  ...assignment,
  duration: assignment.duration || (
    // Fallback: estimate duration based on due date difference or default
    "2 hours"
  )
}))

// Group assignments by course name
const groupByCourse = (assignments: any[]) => {
  const grouped: Record<string, any[]> = {}
  assignments.forEach(assignment => {
    if (!grouped[assignment.courseName]) {
      grouped[assignment.courseName] = []
    }
    grouped[assignment.courseName].push(assignment)
  })
  return grouped
}

export default function StudentAssignmentsPage() {
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({})

  const toggleCourse = (courseName: string) => {
    setExpandedCourses(prev => ({ ...prev, [courseName]: !prev[courseName] }))
  }

  // All assignments (no status filtering for this view – show everything grouped)
  const groupedAssignments = groupByCourse(assignmentsWithDuration)

  // For stats, we still need counts by status
  const pendingAssignments = assignmentsWithDuration.filter((a) => a.status === "pending")
  const submittedAssignments = assignmentsWithDuration.filter((a) => a.status === "submitted")
  const gradedAssignments = assignmentsWithDuration.filter((a) => a.status === "graded")

  const getStatusBadge = (status: string, grade?: number, maxGrade?: number) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-50">Pending</Badge>
      case "submitted":
        return <Badge className="bg-blue-100 text-blue-700">Submitted</Badge>
      case "graded":
        return <Badge className="bg-green-100 text-green-700">Grade: {grade}/{maxGrade}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <p className="text-gray-500">All your coursework, grouped by course</p>
      </div>

      {/* Stats Cards (unchanged) */}
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

      {/* Assignments Grouped by Course */}
      <div className="space-y-4">
        {Object.entries(groupedAssignments).map(([courseName, assignments]) => {
          const isExpanded = expandedCourses[courseName] ?? true // default open
          const courseStats = {
            pending: assignments.filter(a => a.status === "pending").length,
            submitted: assignments.filter(a => a.status === "submitted").length,
            graded: assignments.filter(a => a.status === "graded").length
          }

          return (
            <Card key={courseName} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCourse(courseName)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isExpanded ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />}
                    <CardTitle>{courseName}</CardTitle>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="text-orange-600">{courseStats.pending} pending</span>
                    <span className="text-blue-600">{courseStats.submitted} submitted</span>
                    <span className="text-green-600">{courseStats.graded} graded</span>
                  </div>
                </div>
                <CardDescription>
                  {assignments.length} assignment{assignments.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              {isExpanded && (
                <CardContent className="space-y-4 pt-0">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className={`rounded-lg border p-4 transition-colors ${
                        assignment.status === "pending"
                          ? "border-orange-200 bg-orange-50"
                          : assignment.status === "graded"
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            assignment.status === "pending"
                              ? "bg-orange-100"
                              : assignment.status === "submitted"
                                ? "bg-blue-100"
                                : "bg-green-100"
                          }`}>
                            <FileText className={`h-5 w-5 ${
                              assignment.status === "pending"
                                ? "text-orange-600"
                                : assignment.status === "submitted"
                                  ? "text-blue-600"
                                  : "text-green-600"
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Duration: {assignment.duration}
                              </span>
                              <span>•</span>
                              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>Max points: {assignment.maxGrade}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(assignment.status, assignment.grade, assignment.maxGrade)}
                          {assignment.status === "pending" && (
                            <Button size="sm" className="bg-[#005792] hover:bg-[#00437a]">
                              Submit
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}