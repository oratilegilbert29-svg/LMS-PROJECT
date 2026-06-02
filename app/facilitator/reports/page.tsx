"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Clock } from "lucide-react"

const initialReports = [
  { id: "1", title: "Weekly engagement", status: "Ready", updated: "Today" },
  { id: "2", title: "Assignment completion", status: "Pending", updated: "Yesterday" },
]

export default function FacilitatorReportsPage() {
  const [reports, setReports] = useState(initialReports)
  const [generated, setGenerated] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">View course performance, student progress, and assessment reports.</p>
        </div>
        <Button
          className="gap-2 bg-[#0f3b92] hover:bg-[#0d3675]"
          onClick={() => setGenerated(true)}
        >
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {generated && (
        <Card className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Report Generated</CardTitle>
              <CardDescription>Your course analytics are now ready to review.</CardDescription>
            </div>
            <span className="rounded-full bg-[#0f3b92] px-3 py-1 text-sm font-semibold text-white">
              Updated
            </span>
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{report.updated}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-500">Status: {report.status}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BarChart3 className="h-4 w-4" />
                <span>Run analysis across course activity and grades.</span>
              </div>
              <div className="flex justify-end">
                <Link href={`/facilitator/reports/${report.id}`} className="w-full sm:w-auto">
                  <Button asChild variant="outline" size="sm">
                    <span>View Details</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
