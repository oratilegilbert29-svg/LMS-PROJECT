"use client"

import Link from "next/link"
import { useLayoutEffect, useRef } from "react"
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
  FolderOpen,
  MessageSquare,
  Calendar,
  Award,
<<<<<<< HEAD
  User,
=======
  Megaphone,
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
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
  { title: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { title: "Settings", href: "/admin/settings", icon: Settings },
]

const facilitatorNavItems: SidebarItem[] = [
  { title: "Dashboard", href: "/facilitator", icon: LayoutDashboard },
  { title: "Courses", href: "/facilitator/courses", icon: BookOpen },
  { title: "Assessments", href: "/facilitator/assessments", icon: ClipboardList },
  { title: "Announcements", href: "/facilitator/announcements", icon: Bell },
  { title: "Reports", href: "/facilitator/reports", icon: BarChart3 },
  { title: "Account", href: "/facilitator/account", icon: User },
  { title: "Profile", href: "/facilitator/profile", icon: User },
  { title: "Settings", href: "/facilitator/settings", icon: Settings },
]

const navItemsByRole: Record<UserRole, SidebarItem[]> = {
  student: studentNavItems,
  admin: adminNavItems,
  facilitator: facilitatorNavItems,
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const sidebarRef = useRef<HTMLBaseElement>(null)

  if (!user) return null

  if (!user) return null

  const navItems = navItemsByRole[user.role]

  useLayoutEffect(() => {
    const updateSidebarStyle = () => {
      if (sidebarRef.current) {
        const isMobile = window.innerWidth < 1024
        if (!isMobile) {
          sidebarRef.current.style.transform = 'translateX(0)'
        } else {
          sidebarRef.current.style.transform = isOpen ? 'translateX(0)' : 'translateX(-100%)'
        }
      }
    }

    updateSidebarStyle()
    window.addEventListener('resize', updateSidebarStyle)
    return () => window.removeEventListener('resize', updateSidebarStyle)
  }, [isOpen])

  return (
<<<<<<< HEAD
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#0f3b92] text-white">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-white/20 px-6">
          {user.role === "facilitator" ? (
            <>
              <img
                src="/MDiHub%20Logo%20Black-01.png"
                alt="MDIHUB Logo"
                className="h-10 w-auto rounded-sm bg-white/10 p-1"
              />
              <div>
                <h1 className="text-lg font-bold">MDIHUB</h1>
                <p className="text-xs text-teal-200">{roleLabel}</p>
              </div>
            </>
          ) : (
            <>
              <GraduationCap className="h-8 w-8" />
              <div>
                <h1 className="text-lg font-bold">LMS</h1>
                <p className="text-xs text-teal-200">{roleLabel}</p>
              </div>
            </>
          )}
=======
    <aside
      ref={sidebarRef}
      className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#005792] text-white transition-transform duration-300"
      style={{
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-[#00437a] px-6">
          <img
            src="/MDiHub Logo Black-01.png"
            alt="MDIHub LMS"
            className="h-8 brightness-0 invert"
          />
          <span className="text-lg font-bold">MDIHub LMS</span>
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
<<<<<<< HEAD
                    ? "bg-white/10 text-white"
                    : "text-slate-100 hover:bg-white/10 hover:text-white"
=======
                    ? "bg-white text-[#005792]"
                    : "text-white hover:bg-[#00437a]"
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>

<<<<<<< HEAD
        {/* User Info & Logout */}
        <Link href={`/${user.role}/profile`} className="block border-t border-teal-700 p-4 hover:bg-white/10 transition-colors rounded-lg">
=======
        <div className="border-t border-[#00437a] p-4">
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
          <div className="mb-3 flex items-center gap-3">
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
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#00437a]"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </Link>
      </div>
    </aside>
  )
}