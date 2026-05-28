"use client"

import { useAuth } from "@/lib/auth-context"
import { Bell, Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useAuth()

  if (!user) return null

  return (
    <header className="fixed left-0 lg:left-64 right-0 top-0 z-30 h-16 border-b border-border bg-[#21647f]">
      <div className="flex h-full items-center justify-between px-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-black/40 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="hidden max-w-md flex-1 md:block lg:flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-200" />
            <Input
              type="search"
              placeholder="Search courses, assignments..."
              className="w-full border-teal-600 bg-teal-800/50 pl-10 text-white placeholder:text-teal-300 focus:border-teal-400 focus:ring-teal-400"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-black/40"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
              3
            </span>
          </Button>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs capitalize text-teal-200">{user.role}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
