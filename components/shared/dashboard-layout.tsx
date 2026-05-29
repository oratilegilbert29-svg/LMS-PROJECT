"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth, UserRole } from "@/lib/auth-context"
import {
  LayoutDashboard, Users, BookOpen, Bell, Megaphone, Settings,
  FileText, GraduationCap, Award,
  MessageSquare, Calendar, ClipboardList, FolderOpen,
  LogOut, X, CheckCircle, AlertCircle, Info,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

const studentNav: NavItem[] = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "My Courses", href: "/student/courses", icon: BookOpen },
  { label: "Assignments", href: "/student/assignments", icon: FileText },
  { label: "Grades", href: "/student/grades", icon: Award },
  { label: "Messages", href: "/student/messages", icon: MessageSquare },
  { label: "Calendar", href: "/student/calendar", icon: Calendar },
  { label: "Announcements", href: "/student/announcements", icon: Bell },
  { label: "Settings", href: "/student/settings", icon: Settings },
]

const facilitatorNav: NavItem[] = [
  { label: "Dashboard", href: "/facilitator", icon: LayoutDashboard },
  { label: "My Courses", href: "/facilitator/courses", icon: BookOpen },
  { label: "Students", href: "/facilitator/students", icon: GraduationCap },
  { label: "Assignments", href: "/facilitator/assignments", icon: ClipboardList },
  { label: "Grading", href: "/facilitator/grading", icon: FileText },
  { label: "Resources", href: "/facilitator/resources", icon: FolderOpen },
  { label: "Messages", href: "/facilitator/messages", icon: MessageSquare },
  { label: "Settings", href: "/facilitator/settings", icon: Settings },
]

const navByRole: Record<UserRole, NavItem[]> = {
  admin: adminNav,
  student: studentNav,
  facilitator: facilitatorNav,
}

interface DashboardLayoutProps {
  children: ReactNode
}

const notifications = [
  { id: 1, title: "New facilitator application", description: "Sarah Johnson applied as Mathematics facilitator", time: "2 hours ago", icon: AlertCircle, color: "text-orange-500" },
  { id: 2, title: "Course assignment needed", description: "Chemistry Fundamentals has no facilitator assigned", time: "5 hours ago", icon: AlertCircle, color: "text-red-500" },
  { id: 3, title: "System maintenance", description: "LMS maintenance scheduled for May 25th", time: "1 day ago", icon: Info, color: "text-blue-500" },
  { id: 4, title: "New student enrolled", description: "5 new students enrolled in Mathematics 101", time: "2 days ago", icon: CheckCircle, color: "text-green-500" },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [notifOpen, setNotifOpen] = useState(false)

  if (!user) return null

  const navItems = navByRole[user.role]

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-[#005792] text-white flex flex-col">
        <div className="p-6 border-b border-[#00437a] flex items-center gap-3">
          <img
            src="/MDiHub Logo Black-01.png"
            alt="MDIHub LMS"
            className="h-10 brightness-0 invert"
          />
          <span className="text-lg font-bold">MDIHub LMS</span>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-white text-[#005792]"
                        : "text-white hover:bg-[#00437a]"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-[#00437a]">
          <div className="mb-3 flex items-center gap-3 px-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-teal-200">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#00437a]"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-white px-8 py-3 flex items-center justify-between">
          <div />
          <Popover open={notifOpen} onOpenChange={setNotifOpen}>
            <PopoverTrigger asChild>
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {notifications.length}
                </span>
              </button>
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
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}