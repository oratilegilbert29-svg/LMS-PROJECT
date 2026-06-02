"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockCourses } from "@/lib/mock-data"
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Course = typeof mockCourses[number]

type AdminCourseAction = "view" | "edit" | "manage" | "analytics"

type AdminCourseInfo = {
  course: Course
  action: AdminCourseAction
} | null

const handleCreateCourse = () => {
  alert("Create course flow is not configured yet.")
}

const handleFilter = () => {
  alert("Filter options are not configured yet.")
}

export default function AdminCoursesPage() {
  const [selectedCourseInfo, setSelectedCourseInfo] = useState<AdminCourseInfo>(null)

  const handleCourseAction = (course: Course, action: AdminCourseAction | "delete") => {
    if (action === "delete") {
      alert(`Delete flow for ${course.title} is not configured yet.`)
      return
    }
    setSelectedCourseInfo({ course, action })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500">Manage all courses in the system</p>
        </div>
        <Button className="gap-2 bg-[#0d4f4f] hover:bg-[#0a3d3d]" onClick={handleCreateCourse}>
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">65</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">10</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Archived</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search courses..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2" onClick={handleFilter}>
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Courses Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-gray-500">{course.duration}</p>
                    </div>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.category}</Badge>
                  </TableCell>
                  <TableCell>{course.enrolledStudents}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleCourseAction(course, "view") }>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCourseAction(course, "edit") }>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCourseAction(course, "manage") }>
                          <MoreHorizontal className="mr-2 h-4 w-4" />
                          Manage Course
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCourseAction(course, "analytics") }>
                          <Eye className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleCourseAction(course, "delete") }>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedCourseInfo ? (
        <Card>
          <CardHeader>
            <CardTitle>{`${selectedCourseInfo.action === "manage" ? "Manage Course" : selectedCourseInfo.action === "edit" ? "Edit Course" : selectedCourseInfo.action === "analytics" ? "Course Analytics" : "Course Details"}`}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">{selectedCourseInfo.course.title}</p>
            <p className="text-sm text-gray-500">Instructor: {selectedCourseInfo.course.instructor}</p>
            <p className="text-sm text-gray-500">Category: {selectedCourseInfo.course.category}</p>
            <p className="text-sm text-gray-500">Duration: {selectedCourseInfo.course.duration}</p>
            {selectedCourseInfo.action === "view" ? (
              <p className="text-sm text-slate-700">Use this view to inspect basic course details and quick stats.</p>
            ) : null}
            {selectedCourseInfo.action === "edit" ? (
              <div className="space-y-2 text-sm text-slate-700">
                <p>Title: <strong>{selectedCourseInfo.course.title}</strong></p>
                <p>Description: <strong>{selectedCourseInfo.course.description}</strong></p>
                <p>Status: <strong>{selectedCourseInfo.course.status}</strong></p>
                <p>This panel is a placeholder for editing course metadata.</p>
              </div>
            ) : null}
            {selectedCourseInfo.action === "manage" ? (
              <div className="space-y-2 text-sm text-slate-700">
                <p>Active status: <strong>{selectedCourseInfo.course.status}</strong></p>
                <p>Enrolled students: <strong>{selectedCourseInfo.course.enrolledStudents}</strong></p>
                <p>Use this panel to manage enrollment, course settings, and content workflow.</p>
              </div>
            ) : null}
            {selectedCourseInfo.action === "analytics" ? (
              <div className="space-y-2 text-sm text-slate-700">
                <p>Progress: <strong>{selectedCourseInfo.course.progress ?? 0}%</strong></p>
                <p>Enrollment: <strong>{selectedCourseInfo.course.enrolledStudents}</strong></p>
                <p>This panel shows course analytics and completion trends.</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
