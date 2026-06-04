"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockCourses } from "@/lib/mock-data"
import { Search, Filter } from "lucide-react"
import { Plus, Users, FileText, MoreHorizontal, Trash2, Ban, Play, Pencil } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Course {
  id: string | number
  title: string
  description: string
  instructor: string
  duration: string
  status: string
  enrolledStudents: number
  category: string
  progress: number
  startDate?: string
  endDate?: string
}

export default function FacilitatorCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(
    mockCourses.filter((c) => c.instructor === "Mike Facilitator") as Course[]
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formDuration, setFormDuration] = useState("")
  const [formStatus, setFormStatus] = useState("draft")
  const [formStartDate, setFormStartDate] = useState("")
  const [formEndDate, setFormEndDate] = useState("")

  const filteredCourses = courses.filter(course => {
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (filterStatus !== "all" && course.status !== filterStatus) return false
    return true
  })

  const resetForm = () => {
    setFormTitle("")
    setFormDescription("")
    setFormDuration("")
    setFormStatus("draft")
    setFormStartDate("")
    setFormEndDate("")
    setEditingCourse(null)
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (course: Course) => {
    setEditingCourse(course)
    setFormTitle(course.title)
    setFormDescription(course.description)
    setFormDuration(course.duration)
    setFormStatus(course.status)
    setFormStartDate(course.startDate || "")
    setFormEndDate(course.endDate || "")
    setIsDialogOpen(true)
  }

  const handleSaveCourse = () => {
    if (!formTitle) return
    if (editingCourse) {
      setCourses(courses.map(c =>
        c.id === editingCourse.id
          ? { ...c, title: formTitle, description: formDescription, duration: formDuration, status: formStatus, startDate: formStartDate, endDate: formEndDate }
          : c
      ))
    } else {
      const course: Course = {
        id: courses.length + 1,
        title: formTitle,
        description: formDescription || "Course description pending",
        instructor: "Mike Facilitator",
        duration: formDuration || "TBD",
        status: formStatus,
        enrolledStudents: 0,
        category: "General",
        progress: 0,
        startDate: formStartDate,
        endDate: formEndDate,
      }
      setCourses([...courses, course])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDeleteCourse = (id: string | number) => {
    setCourses(courses.filter(c => c.id !== id))
  }

  const handleToggleStatus = (id: string | number) => {
    setCourses(courses.map(c =>
      c.id === id
        ? { ...c, status: c.status === "active" ? "suspended" : "active" }
        : c
    ))
  }

  const totalStudents = courses.reduce((sum, c) => sum + c.enrolledStudents, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-500">Manage the courses you teach</p>
        </div>
        <Button className="gap-2 bg-[#005792] hover:bg-[#00437a]" onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); setIsDialogOpen(open) }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
            <DialogDescription>
              {editingCourse ? "Update course information." : "Add a new course to your teaching portfolio."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="course-title">Course Title</Label>
              <Input
                id="course-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Advanced React Patterns"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-desc">Description</Label>
              <Textarea
                id="course-desc"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Brief course description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-duration">Duration</Label>
                <Input
                  id="course-duration"
                  value={formDuration}
                  onChange={(e) => setFormDuration(e.target.value)}
                  placeholder="e.g. 8 weeks"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-status">Status</Label>
                <Select value={formStatus} onValueChange={setFormStatus}>
                  <SelectTrigger id="course-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-start">Start Date</Label>
                <Input
                  id="course-start"
                  type="date"
                  value={formStartDate}
                  onChange={(e) => setFormStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-end">End Date</Label>
                <Input
                  id="course-end"
                  type="date"
                  value={formEndDate}
                  onChange={(e) => setFormEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { resetForm(); setIsDialogOpen(false) }}>Cancel</Button>
            <Button onClick={handleSaveCourse} className="bg-[#005792] hover:bg-[#00437a]">
              {editingCourse ? "Update Course" : "Create Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats */}
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
            <CardTitle className="text-sm font-medium text-gray-500">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{courses.filter(c => c.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{courses.filter(c => c.status === "draft").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      {showFilters && (
        <div className="flex gap-4 p-4 border rounded-lg bg-gray-50">
          <div className="space-y-1">
            <Label className="text-xs">Status</Label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      )}

      {/* Course List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.duration}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(course)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(course.id)}>
                      {course.status === "active" || course.status === "Active" ? (
                        <><Ban className="mr-2 h-4 w-4" />Suspend</>
                      ) : (
                        <><Play className="mr-2 h-4 w-4" />Activate</>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteCourse(course.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{course.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Course Progress</span>
                  <span>{course.enrolledStudents} students</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <Badge
                  variant={course.status === "active" ? "default" : "secondary"}
                  className={course.status === "active" ? "bg-green-600" : course.status === "suspended" ? "bg-orange-600" : ""}
                >
                  {course.status}
                </Badge>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-[#005792] hover:bg-[#00437a]"
                    onClick={() => openEditDialog(course)}
                  >
                    Manage
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(course)}>
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
