"use client"

import { useState } from "react"
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

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Courses Management</h1>
          <p className="text-muted-foreground mt-1">Manage all courses and assignments</p>
        </div>
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
    </div>
  )
}