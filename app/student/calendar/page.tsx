"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockAssignments } from "@/lib/mock-data"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StudentCalendarPage() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // State for current displayed month/year
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  // Generate calendar days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const startPadding = firstDayOfMonth.getDay()
  const totalDays = lastDayOfMonth.getDate()

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < startPadding; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i)
  }

  // Helper: get assignments due on a specific date (year, month, day)
  const getAssignmentsForDate = (year: number, month: number, day: number) => {
    return mockAssignments.filter((assignment) => {
      const dueDate = new Date(assignment.dueDate)
      return (
        dueDate.getFullYear() === year &&
        dueDate.getMonth() === month &&
        dueDate.getDate() === day
      )
    })
  }

  // Check if a given day has any assignments (for dot indicator)
  const hasAssignmentOnDay = (day: number) => {
    return getAssignmentsForDate(currentYear, currentMonth, day).length > 0
  }

  // Handle day click
  const handleDayClick = (day: number) => {
    setSelectedDay(day)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedDay(null)
  }

  // Navigate months
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const assignmentsForSelectedDay =
    selectedDay !== null
      ? getAssignmentsForDate(currentYear, currentMonth, selectedDay)
      : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-500">Keep track of your schedule and deadlines</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{monthName}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[80px] rounded-lg border p-2 cursor-pointer transition-colors ${
                    day === currentDate.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
                      ? "border-[#005792] bg-[#005792]/5"
                      : day
                      ? "border-gray-100 hover:bg-gray-50"
                      : "border-transparent cursor-default"
                  }`}
                  onClick={() => day !== null && handleDayClick(day)}
                >
                  {day && (
                    <>
                      <span
                        className={`text-sm ${
                          day === currentDate.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
                            ? "font-bold text-[#005792]"
                            : "text-gray-700"
                        }`}
                      >
                        {day}
                      </span>
                      {hasAssignmentOnDay(day) && (
                        <div className="mt-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events (pending assignments) */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAssignments
              .filter((a) => a.status === "pending")
              .map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-600">
                    {new Date(assignment.dueDate).getDate()}
                  </div>
                  <div>
                    <h4 className="font-medium">{assignment.title}</h4>
                    <p className="text-sm text-gray-500">{assignment.courseName}</p>
                    <Badge variant="outline" className="mt-2 text-orange-600">
                      Due {new Date(assignment.dueDate).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Modal Popup for clicked day */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Assignments for {monthName} {selectedDay}
              </h3>
              {assignmentsForSelectedDay.length === 0 ? (
                <p className="text-gray-500 py-4">No assignments due on this day.</p>
              ) : (
                <div className="space-y-3 mt-4">
                  {assignmentsForSelectedDay.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="rounded-lg border p-4 bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{assignment.title}</h4>
                          <p className="text-sm text-gray-600">{assignment.courseName}</p>
                        </div>
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
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                        <p>Max points: {assignment.maxGrade}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button
                onClick={closeModal}
                className="w-full mt-6 bg-[#005792] hover:bg-[#00437a]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}