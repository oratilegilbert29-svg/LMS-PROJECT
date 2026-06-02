"use client"

<<<<<<< HEAD
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { mockNotifications } from "@/lib/mock-data"
import { Bell, Menu } from "lucide-react"
=======
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Bell, Search, Menu, X, AlertCircle, CheckCircle, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface NavbarProps {
  onMenuClick?: () => void
}

const notifications = [
  { id: 1, title: "New facilitator application", description: "Sarah Johnson applied as Mathematics facilitator", time: "2 hours ago", icon: AlertCircle, color: "text-orange-500" },
  { id: 2, title: "Course assignment needed", description: "Chemistry Fundamentals has no facilitator assigned", time: "5 hours ago", icon: AlertCircle, color: "text-red-500" },
  { id: 3, title: "System maintenance", description: "LMS maintenance scheduled for May 25th", time: "1 day ago", icon: Info, color: "text-blue-500" },
  { id: 4, title: "New student enrolled", description: "5 new students enrolled in Mathematics 101", time: "2 days ago", icon: CheckCircle, color: "text-green-500" },
]

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useAuth()
<<<<<<< HEAD
  const router = useRouter()
=======
  const [notifOpen, setNotifOpen] = useState(false)
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc

  if (!user) return null

  return (
<<<<<<< HEAD
    <header className="fixed left-64 right-0 top-0 z-30 h-16 border-b border-slate-200 bg-white text-slate-900">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-[#0f3b92] text-white hover:bg-[#0d3675] lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2 text-slate-900">
            {user.role === "facilitator" ? (
              <>
                <img
                  src="/MDiHub%20Logo%20Black-01.png"
                  alt="MDIHUB Logo"
                  className="h-10 w-auto rounded-sm bg-white p-1"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">MDIHUB</p>
                  <p className="text-xs text-slate-500">Facilitator Portal</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f3b92] text-sm font-bold text-white">
                  L
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">LMS</p>
                  <p className="text-xs text-slate-500">Learning Portal</p>
                </div>
              </>
            )}
          </Link>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative bg-[#0f3b92] text-white hover:bg-[#0d3675]"
            onClick={() =>
              router.push(
                user.role === "student" || user.role === "facilitator"
                  ? `/${user.role}/messages`
                  : `/${user.role}`
              )
            }
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
              {mockNotifications.length}
            </span>
          </Button>

          <Link href={`/${user.role}/profile`} className="flex items-center gap-3">
=======
    <header className="fixed left-0 lg:left-64 right-0 top-0 z-30 h-16 border-b border-border bg-[#005792]">
      <div className="flex h-full items-center justify-between px-6">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#00437a] lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden max-w-md flex-1 md:block lg:flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-200" />
            <Input
              type="search"
              placeholder="Search courses, assignments..."
              className="w-full border-[#00437a] bg-[#00437a]/50 pl-10 text-white placeholder:text-teal-300 focus:border-teal-400 focus:ring-teal-400"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <Popover open={notifOpen} onOpenChange={setNotifOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-[#00437a]"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                  {notifications.length}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <span className="font-semibold text-sm">Notifications</span>
                <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon
                  return (
                    <div key={n.id} className="flex gap-3 px-4 py-3 hover:bg-gray-50 border-b last:border-0">
                      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${n.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground">{n.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-3">
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs capitalize text-slate-500">{user.role}</p>
            </div>
<<<<<<< HEAD
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f3b92] text-sm font-semibold text-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
=======
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
              {user.name.split(" ").map((n) => n[0]).join("")}
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}