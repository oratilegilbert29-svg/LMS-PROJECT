"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { mockNotifications } from "@/lib/mock-data"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) return null

  return (
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
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs capitalize text-slate-500">{user.role}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f3b92] text-sm font-semibold text-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
