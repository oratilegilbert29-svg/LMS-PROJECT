"use client"

import { ReactNode, useState } from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <Navbar onMenuClick={handleMenuClick} />
      <main className={`pt-16 transition-all duration-300 lg:ml-64 ${
        sidebarOpen ? "blur-sm" : ""
      }`}>
        <div className="p-6">{children}</div>
      </main>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 top-16 z-20 bg-black/50 lg:hidden"
          onClick={handleCloseSidebar}
        />
      )}
    </div>
  )
}
