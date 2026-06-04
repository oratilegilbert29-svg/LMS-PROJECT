"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, FileText, Video, Image, File, MoreHorizontal, Download, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const resources = [
  { id: "1", name: "Week 1 - Introduction Slides", type: "presentation", size: "2.4 MB", course: "Web Development", date: "2024-01-15" },
  { id: "2", name: "HTML Basics Video Tutorial", type: "video", size: "156 MB", course: "Web Development", date: "2024-01-20" },
  { id: "3", name: "CSS Cheat Sheet", type: "document", size: "450 KB", course: "Web Development", date: "2024-01-22" },
  { id: "4", name: "React Components Guide", type: "document", size: "1.2 MB", course: "Advanced React", date: "2024-02-01" },
  { id: "5", name: "Project Wireframes", type: "image", size: "3.8 MB", course: "Advanced React", date: "2024-02-05" },
]

const getIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="h-5 w-5 text-purple-500" />
    case "image":
      return <Image className="h-5 w-5 text-blue-500" />
    case "presentation":
      return <FileText className="h-5 w-5 text-orange-500" />
    default:
      return <File className="h-5 w-5 text-gray-500" />
  }
}

export default function FacilitatorResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
          <p className="text-gray-500">Manage course materials and resources</p>
        </div>
        <Button className="gap-2 bg-[#005792] hover:bg-[#00437a]">
          <Upload className="h-4 w-4" />
          Upload Resource
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">28</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input placeholder="Search resources..." className="pl-10" />
      </div>

      {/* Resources List */}
      <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
          <CardDescription>Your uploaded course materials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  {getIcon(resource.type)}
                </div>
                <div>
                  <p className="font-medium">{resource.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{resource.course}</span>
                    <span>•</span>
                    <span>{resource.size}</span>
                    <span>•</span>
                    <span>{new Date(resource.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {resource.type}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>Share with Students</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
