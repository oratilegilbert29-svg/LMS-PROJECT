"use client"

import { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <Navbar />
      <main className="ml-64 min-h-screen pt-16 bg-white">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
