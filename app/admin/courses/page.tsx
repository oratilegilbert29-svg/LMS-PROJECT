"use client"

import { useState } from "react"
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
=======
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreVertical, Eye, Pencil, Trash2, Ban, Play, UserPlus, UserMinus } from "lucide-react"
import { adminCourses, adminFacilitators, type AdminCourse } from "@/lib/mock-data"

export default function Courses() {
  const [courses, setCourses] = useState(adminCourses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isFacilitatorDialogOpen, setIsFacilitatorDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<AdminCourse | null>(null)
  const [managingCourseFacilitator, setManagingCourseFacilitator] = useState<AdminCourse | null>(null)
  const [selectedFacilitator, setSelectedFacilitator] = useState<string>("Unassigned")
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    facilitator: "Unassigned",
    facilitatorId: null as number | null,
    status: "Draft",
    startDate: "",
    endDate: "",
  })

  const handleCreateCourse = () => {
    const course = {
      id: courses.length + 1,
      title: newCourse.title,
      description: newCourse.description,
      facilitator: newCourse.facilitator,
      facilitatorId: newCourse.facilitatorId,
      students: 0,
      status: newCourse.status,
      startDate: newCourse.startDate,
      endDate: newCourse.endDate,
    }
    setCourses([...courses, course])
    setIsDialogOpen(false)
    setNewCourse({
      title: "",
      description: "",
      facilitator: "Unassigned",
      facilitatorId: null,
      status: "Draft",
      startDate: "",
      endDate: "",
    })
  }

  const handleUpdateCourse = () => {
    if (!editingCourse) return

    setCourses(courses.map(c =>
      c.id === editingCourse.id ? editingCourse : c
    ))
    setEditingCourse(null)
    setIsDialogOpen(false)
  }

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  const handleSuspendCourse = (id: number) => {
    setCourses(courses.map(c =>
      c.id === id ? { ...c, status: c.status === "Suspended" ? "Active" : "Suspended" } : c
    ))
  }

  const handleEditClick = (course: AdminCourse) => {
    setEditingCourse({ ...course })
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingCourse(null)
    setNewCourse({
      title: "",
      description: "",
      facilitator: "Unassigned",
      facilitatorId: null,
      status: "Draft",
      startDate: "",
      endDate: "",
    })
  }

  const handleManageFacilitator = (course: AdminCourse) => {
    setManagingCourseFacilitator(course)
    setSelectedFacilitator(course.facilitator)
    setIsFacilitatorDialogOpen(true)
  }

  const handleAssignFacilitator = () => {
    if (!managingCourseFacilitator) return

    const facilitator = adminFacilitators.find(f => f.name === selectedFacilitator)
    setCourses(courses.map(c =>
      c.id === managingCourseFacilitator.id
        ? { ...c, facilitator: selectedFacilitator, facilitatorId: facilitator?.id ?? null }
        : c
    ))
    setIsFacilitatorDialogOpen(false)
    setManagingCourseFacilitator(null)
  }

<<<<<<< HEAD
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

=======
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Courses Management</h1>
          <p className="text-muted-foreground mt-1">Manage all courses and assignments</p>
        </div>
<<<<<<< HEAD
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
=======
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#005792] hover:bg-[#00437a]">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
              <DialogDescription>
                {editingCourse ? "Update course information" : "Add a new course to the LMS platform."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  value={editingCourse ? editingCourse.title : newCourse.title}
                  onChange={(e) => editingCourse
                    ? setEditingCourse({ ...editingCourse, title: e.target.value })
                    : setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  placeholder="Enter course title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingCourse ? editingCourse.description : newCourse.description}
                  onChange={(e) => editingCourse
                    ? setEditingCourse({ ...editingCourse, description: e.target.value })
                    : setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  placeholder="Enter course description"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={editingCourse ? editingCourse.startDate : newCourse.startDate}
                    onChange={(e) => editingCourse
                      ? setEditingCourse({ ...editingCourse, startDate: e.target.value })
                      : setNewCourse({ ...newCourse, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={editingCourse ? editingCourse.endDate : newCourse.endDate}
                    onChange={(e) => editingCourse
                      ? setEditingCourse({ ...editingCourse, endDate: e.target.value })
                      : setNewCourse({ ...newCourse, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="facilitator">Facilitator</Label>
                <Select
                  value={editingCourse ? editingCourse.facilitator : newCourse.facilitator}
                  onValueChange={(value) => {
                    const facilitator = adminFacilitators.find(f => f.name === value)
                    if (editingCourse) {
                      setEditingCourse({
                        ...editingCourse,
                        facilitator: value,
                        facilitatorId: facilitator?.id ?? null
                      })
                    } else {
                      setNewCourse({
                        ...newCourse,
                        facilitator: value,
                        facilitatorId: facilitator?.id ?? null
                      })
                    }
                  }}
                >
                  <SelectTrigger id="facilitator">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {adminFacilitators.map(f => (
                      <SelectItem key={f.id ?? 'unassigned'} value={f.name}>
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-status">Status</Label>
                <Select
                  value={editingCourse ? editingCourse.status : newCourse.status}
                  onValueChange={(value) => editingCourse
                    ? setEditingCourse({ ...editingCourse, status: value })
                    : setNewCourse({ ...newCourse, status: value })
                  }
                >
                  <SelectTrigger id="course-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button
                onClick={editingCourse ? handleUpdateCourse : handleCreateCourse}
                className="bg-[#005792] hover:bg-[#00437a]"
              >
                {editingCourse ? "Update Course" : "Create Course"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Facilitator</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    {course.facilitator === "Unassigned" ? (
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        Unassigned
                      </Badge>
                    ) : (
                      course.facilitator
                    )}
                  </TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {course.startDate} to {course.endDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        course.status === "Active"
                          ? "default"
                          : course.status === "Draft"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        course.status === "Active"
                          ? "bg-green-600 hover:bg-green-700"
                          : course.status === "Suspended"
                          ? "bg-orange-600 hover:bg-orange-700"
                          : ""
                      }
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
<<<<<<< HEAD
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
=======
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(course)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleManageFacilitator(course)}>
                          {course.facilitator === "Unassigned" ? (
                            <>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Assign Facilitator
                            </>
                          ) : (
                            <>
                              <UserMinus className="w-4 h-4 mr-2" />
                              Change Facilitator
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSuspendCourse(course.id)}>
                          {course.status === "Suspended" ? (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Activate
                            </>
                          ) : (
                            <>
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
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

<<<<<<< HEAD
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
=======
      <Dialog open={isFacilitatorDialogOpen} onOpenChange={setIsFacilitatorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Facilitator</DialogTitle>
            <DialogDescription>
              {managingCourseFacilitator?.facilitator === "Unassigned"
                ? "Assign a facilitator to this course"
                : "Change or remove the facilitator from this course"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Course</Label>
              <Input value={managingCourseFacilitator?.title || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facilitator-select">Facilitator</Label>
              <Select value={selectedFacilitator} onValueChange={setSelectedFacilitator}>
                <SelectTrigger id="facilitator-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {adminFacilitators.map(f => (
                    <SelectItem key={f.id ?? 'unassigned'} value={f.name}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFacilitatorDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignFacilitator} className="bg-[#005792] hover:bg-[#00437a]">
              {selectedFacilitator === "Unassigned" ? "Remove Facilitator" : "Assign Facilitator"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
    </div>
  )
}