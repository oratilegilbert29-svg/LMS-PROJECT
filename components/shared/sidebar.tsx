"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth, UserRole } from "@/lib/auth-context"
import {
  BookOpen,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  GraduationCap,
  ClipboardList,
  Bell,
  BarChart3,
  FolderOpen,
  MessageSquare,
  Calendar,
  Award,
} from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ElementType
}

const studentNavItems: SidebarItem[] = [
  { title: "Dashboard", href: "/student", icon: LayoutDashboard },
  { title: "My Courses", href: "/student/courses", icon: BookOpen },
  { title: "Assignments", href: "/student/assignments", icon: FileText },
  { title: "Grades", href: "/student/grades", icon: Award },
  { title: "Messages", href: "/student/messages", icon: MessageSquare },
  { title: "Calendar", href: "/student/calendar", icon: Calendar },
  { title: "Announcements", href: "/student/announcements", icon: Bell },
  { title: "Settings", href: "/student/settings", icon: Settings },
]

const adminNavItems: SidebarItem[] = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Courses", href: "/admin/courses", icon: BookOpen },
  { title: "Reports", href: "/admin/reports", icon: BarChart3 },
  { title: "Announcements", href: "/admin/announcements", icon: Bell },
  { title: "Settings", href: "/admin/settings", icon: Settings },
]

const facilitatorNavItems: SidebarItem[] = [
  { title: "Dashboard", href: "/facilitator", icon: LayoutDashboard },
  { title: "My Courses", href: "/facilitator/courses", icon: BookOpen },
  { title: "Students", href: "/facilitator/students", icon: GraduationCap },
  { title: "Assignments", href: "/facilitator/assignments", icon: ClipboardList },
  { title: "Grading", href: "/facilitator/grading", icon: FileText },
  { title: "Resources", href: "/facilitator/resources", icon: FolderOpen },
  { title: "Messages", href: "/facilitator/messages", icon: MessageSquare },
  { title: "Settings", href: "/facilitator/settings", icon: Settings },
]

const navItemsByRole: Record<UserRole, SidebarItem[]> = {
  student: studentNavItems,
  admin: adminNavItems,
  facilitator: facilitatorNavItems,
}

const roleLabels: Record<UserRole, string> = {
  student: "Student Portal",
  admin: "Admin Dashboard",
  facilitator: "Facilitator Dashboard",
}

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  if (!user) return null

  const navItems = navItemsByRole[user.role]
  const roleLabel = roleLabels[user.role]

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#21647f] text-white">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-teal-700 px-6">
          <GraduationCap className="h-8 w-8" />
          <div>
            <h1 className="text-lg font-bold">LMS</h1>
            <p className="text-xs text-teal-200">{roleLabel}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-black text-white"
                    : "text-teal-100 hover:bg-black/40 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-teal-700 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-teal-200">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-teal-100 transition-colors hover:bg-black/40 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  )
}
