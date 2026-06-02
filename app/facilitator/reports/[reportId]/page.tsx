import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const reportDetails: Record<string, {
  title: string
  summary: string
  status: string
  generatedAt: string
}> = {
  "1": {
    title: "Weekly engagement",
    summary: "Detailed weekly activity, attendance, and engagement scores.",
    status: "Ready",
    generatedAt: "Today",
  },
  "2": {
    title: "Assignment completion",
    summary: "Performance tracking for recent assignment submissions.",
    status: "Pending",
    generatedAt: "Yesterday",
  },
}

export default function ReportDetailPage({ params }: { params: { reportId: string } }) {
  const report = reportDetails[params.reportId]

  if (!report) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Report not found</h1>
        <p className="mt-3 text-gray-600">The requested report could not be loaded.</p>
        <Link href="/facilitator/reports">
          <Button className="mt-6">Back to Reports</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{report.title}</h1>
          <p className="text-gray-600">{report.summary}</p>
        </div>
        <Link href="/facilitator/reports">
          <Button variant="outline">Back to Reports</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
          <CardDescription>{report.generatedAt}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Status</p>
            <p className="mt-1 text-lg font-semibold">{report.status}</p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              This report provides an overview of course performance metrics and student progress for the selected period.
            </p>
            <p>
              Use the Back to Reports button to return to the full facilitator reports list.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
