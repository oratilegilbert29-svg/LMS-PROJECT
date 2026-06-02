"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockAdminStats } from "@/lib/mock-data"
import { Download, TrendingUp, Users, BookOpen, DollarSign, ChevronDown, ChevronUp } from "lucide-react"

type DetailView = "revenue" | "enrollments" | "completions" | "satisfaction" | "trends" | "weeklyEngagement" | "assignmentCompletion" | "topCourses" | null

const handleExportReport = () => {
  alert("Export report flow is not configured yet.")
}

export default function AdminReportsPage() {
  const [expandedDetail, setExpandedDetail] = useState<DetailView>(null)

  const toggleDetail = (view: DetailView) => {
    setExpandedDetail(expandedDetail === view ? null : view)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">Analytics and insights for your LMS</p>
        </div>
        <Button className="gap-2 bg-[#0d4f4f] hover:bg-[#0a3d3d]" onClick={handleExportReport}>
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockAdminStats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +12% from last month
            </p>
            <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => toggleDetail("revenue")}>
              {expandedDetail === "revenue" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Details
            </Button>
            {expandedDetail === "revenue" ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                <p className="font-semibold">Revenue Insights</p>
                <p className="mt-2">Monthly total: ${mockAdminStats.monthlyRevenue.toLocaleString()}</p>
                <p className="mt-1">Growth: +12% compared to previous month</p>
                <p className="mt-1">Top revenue sources: Course enrollments and premium features</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">New Enrollments</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +8% from last month
            </p>
            <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => toggleDetail("enrollments")}>
              {expandedDetail === "enrollments" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Details
            </Button>
            {expandedDetail === "enrollments" ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                <p className="font-semibold">Enrollment Growth</p>
                <p className="mt-2">New enrollments this month: 234</p>
                <p className="mt-1">Growth rate: +8% from last month</p>
                <p className="mt-1">Most popular courses: Web Development, Data Science</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Course Completions</CardTitle>
            <BookOpen className="h-4 w-4 text-[#0d4f4f]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +15% from last month
            </p>
            <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => toggleDetail("completions")}>
              {expandedDetail === "completions" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Details
            </Button>
            {expandedDetail === "completions" ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                <p className="font-semibold">Completion Analytics</p>
                <p className="mt-2">Total completions this month: 89</p>
                <p className="mt-1">Improvement: +15% from last month</p>
                <p className="mt-1">Average completion time: 42 days</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5</div>
            <p className="text-xs text-gray-500">Based on 1,234 reviews</p>
            <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => toggleDetail("satisfaction")}>
              {expandedDetail === "satisfaction" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Details
            </Button>
            {expandedDetail === "satisfaction" ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                <p className="font-semibold">Student Feedback</p>
                <p className="mt-2">Average rating: 4.6 out of 5.0</p>
                <p className="mt-1">Total reviews: 1,234</p>
                <p className="mt-1">Top feedback: Course content quality and instructor responsiveness</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
            <CardDescription>Monthly enrollment statistics</CardDescription>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => toggleDetail("trends")}>
              {expandedDetail === "trends" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg bg-gray-50">
              <p className="text-gray-500">Enrollment chart visualization</p>
            </div>
            {expandedDetail === "trends" ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold">Enrollment Trend Insights</p>
                <p className="mt-2">January: 1,200 enrollments</p>
                <p className="mt-1">February: 1,400 enrollments</p>
                <p className="mt-1">March: 1,650 enrollments (peak season)</p>
                <p className="mt-2">Trend: Strong growth in spring semester. Peak during course launch promotions.</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue breakdown</CardDescription>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => toggleDetail("revenue")}> 
              {expandedDetail === "revenue" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg bg-gray-50">
              <p className="text-gray-500">Revenue chart visualization</p>
            </div>
            {expandedDetail === "revenue" ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold">Revenue Breakdown</p>
                <p className="mt-2">Subscriptions: $45,000 (60%)</p>
                <p className="mt-1">One-time purchases: $20,000 (27%)</p>
                <p className="mt-1">Premium features: $10,000 (13%)</p>
                <p className="mt-2">Total monthly revenue: ${mockAdminStats.monthlyRevenue.toLocaleString()}</p>
                <p className="mt-1">Revenue is stable with recurring subscription growth and strong premium add-on adoption.</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
            <CardDescription>Student activity by week</CardDescription>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => toggleDetail("weeklyEngagement")}> 
              {expandedDetail === "weeklyEngagement" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg bg-gray-50">
              <p className="text-gray-500">Weekly engagement visualization</p>
            </div>
            {expandedDetail === "weeklyEngagement" ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold">Weekly Engagement Summary</p>
                <p className="mt-2">Active learners this week: 1,880</p>
                <p className="mt-1">Average session length: 18 minutes</p>
                <p className="mt-1">Top engagement days: Tuesday and Thursday</p>
                <p className="mt-2">Engagement is up 9% versus last week, driven by live sessions and discussion activity.</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignment Completion</CardTitle>
            <CardDescription>Weekly assignment progress</CardDescription>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => toggleDetail("assignmentCompletion")}> 
              {expandedDetail === "assignmentCompletion" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg bg-gray-50">
              <p className="text-gray-500">Assignment completion visualization</p>
            </div>
            {expandedDetail === "assignmentCompletion" ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold">Assignment Completion Insights</p>
                <p className="mt-2">Assignments completed this week: 274</p>
                <p className="mt-1">On-time completion rate: 92%</p>
                <p className="mt-1">Late submissions: 8%</p>
                <p className="mt-2">Top completed assignment: Final Project.</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Top Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Courses</CardTitle>
          <CardDescription>Courses with highest enrollment and completion rates</CardDescription>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => toggleDetail("topCourses")}>
            {expandedDetail === "topCourses" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            View Details
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Introduction to Web Development", enrollments: 245, completion: 78 },
              { name: "Data Science Fundamentals", enrollments: 198, completion: 72 },
              { name: "Advanced React Patterns", enrollments: 156, completion: 85 },
              { name: "Project Management Essentials", enrollments: 134, completion: 91 },
            ].map((course, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d4f4f]/10 text-lg font-bold text-[#0d4f4f]">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-gray-500">{course.enrollments} enrollments</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{course.completion}%</p>
                  <p className="text-sm text-gray-500">completion rate</p>
                </div>
              </div>
            ))}
          </div>
          {expandedDetail === "topCourses" ? (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold">Top Course Insights</p>
              <p className="mt-2">Best performing: Advanced React Patterns (85% completion)</p>
              <p className="mt-1">Most enrolled: Introduction to Web Development (245 students)</p>
              <p className="mt-1">Average completion across top 4: 81.5%</p>
              <p className="mt-2">These courses show strong student engagement and high satisfaction rates.</p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
