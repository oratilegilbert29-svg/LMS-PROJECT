"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockAssignments } from "@/lib/mock-data"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StudentCalendarPage() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  // Generate calendar days
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const startPadding = firstDay.getDay()
  const totalDays = lastDay.getDate()

  const calendarDays = []
  for (let i = 0; i < startPadding; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i)
  }

  // Get assignments with due dates
  const assignmentDates = mockAssignments.map((a) => new Date(a.dueDate).getDate())

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
            <CardTitle>{currentMonth}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
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
                  className={`min-h-[80px] rounded-lg border p-2 ${
                    day === currentDate.getDate()
                      ? "border-[#0d4f4f] bg-[#0d4f4f]/5"
                      : day
                      ? "border-gray-100 hover:bg-gray-50"
                      : "border-transparent"
                  }`}
                >
                  {day && (
                    <>
                      <span
                        className={`text-sm ${
                          day === currentDate.getDate()
                            ? "font-bold text-[#0d4f4f]"
                            : "text-gray-700"
                        }`}
                      >
                        {day}
                      </span>
                      {assignmentDates.includes(day) && (
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

        {/* Upcoming Events */}
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
    </div>
  )
}
