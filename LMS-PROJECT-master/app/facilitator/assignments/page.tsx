"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockAssignments } from "@/lib/mock-data"
import { Plus, FileText, Calendar, Users, Edit, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function FacilitatorAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-500">Create and manage course assignments</p>
        </div>
        <Button className="gap-2 bg-[#0d4f4f] hover:bg-[#0a3d3d]">
          <Plus className="h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">156</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">23</div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
          <CardDescription>Manage assignments across your courses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0d4f4f]/10">
                  <FileText className="h-6 w-6 text-[#0d4f4f]" />
                </div>
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-gray-500">{assignment.courseName}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      45 submissions
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={
                    assignment.status === "pending"
                      ? "bg-orange-100 text-orange-700"
                      : assignment.status === "submitted"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }
                >
                  {assignment.status}
                </Badge>
                <span className="text-sm text-gray-500">{assignment.maxGrade} pts</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Submissions</DropdownMenuItem>
                    <DropdownMenuItem>Grade All</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
