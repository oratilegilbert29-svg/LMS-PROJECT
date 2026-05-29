"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Users, GraduationCap, BookOpen, BookOpenCheck, Megaphone, UserCheck, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { adminUsers, adminCourses, adminAnnouncements } from "@/lib/mock-data";

const initialApplications = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", date: "2026-05-15", subject: "Mathematics" },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", date: "2026-05-17", subject: "Computer Science" },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", date: "2026-05-18", subject: "Physics" },
  { id: 4, name: "James Wilson", email: "j.wilson@email.com", date: "2026-05-19", subject: "Chemistry" },
];

const upcomingEvents = [
  { id: 1, type: "exam", title: "Final Exam - Mathematics 101", date: "2026-05-25" },
  { id: 2, type: "assignment", title: "Physics Assignment Due", date: "2026-05-22" },
  { id: 3, type: "exam", title: "Midterm - Computer Science", date: "2026-05-28" },
  { id: 4, type: "assignment", title: "Chemistry Lab Report", date: "2026-05-23" },
];

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [applications, setApplications] = useState(initialApplications);

  const totalUsers = adminUsers.length;
  const students = adminUsers.filter(u => u.role === "Student").length;
  const facilitators = adminUsers.filter(u => u.role === "Facilitator").length;
  const courses = adminCourses.length;
  const unassignedCourses = adminCourses.filter(c => c.facilitatorId === null).length;
  const pendingApplications = applications.length;

  const stats = [
    { title: "Total Users", value: totalUsers.toLocaleString(), icon: Users, color: "text-blue-600" },
    { title: "Students", value: students.toLocaleString(), icon: GraduationCap, color: "text-green-600" },
    { title: "Facilitators", value: facilitators.toLocaleString(), icon: UserCheck, color: "text-purple-600" },
    { title: "Courses", value: courses.toLocaleString(), icon: BookOpen, color: "text-orange-600" },
    { title: "Unassigned Courses", value: unassignedCourses.toLocaleString(), icon: BookOpenCheck, color: "text-red-600" },
    { title: "Facilitator Pending Applications", value: pendingApplications.toLocaleString(), icon: UserCheck, color: "text-purple-600" },
  ];

  const handleApprove = (id: number) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const handleDecline = (id: number) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Facilitator Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {applications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No pending applications</p>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="p-3 border rounded-lg space-y-2">
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-sm text-muted-foreground">{app.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">Subject: {app.subject}</p>
                      <p className="text-xs text-muted-foreground">{app.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(app.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDecline(app.id)}
                        className="flex-1"
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {adminAnnouncements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Megaphone className="w-4 h-4 text-[#005792] mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{announcement.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{announcement.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-xs text-muted-foreground">{announcement.date}</p>
                        <Badge
                          variant="outline"
                          className={
                            announcement.priority === "High"
                              ? "text-red-600 border-red-600"
                              : announcement.priority === "Medium"
                              ? "text-orange-600 border-orange-600"
                              : "text-green-600 border-green-600"
                          }
                        >
                          {announcement.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar & Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="space-y-2 mt-4">
              <h4 className="font-medium">Upcoming Deadlines</h4>
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-2 hover:bg-accent rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <Badge variant={event.type === 'exam' ? 'destructive' : 'secondary'}>
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}