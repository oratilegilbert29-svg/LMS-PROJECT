"use client"

import { ReactNode, useState } from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-white">
      <Sidebar />
      <Navbar />
      <main className="ml-64 min-h-screen pt-16 bg-white">
=======
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <Navbar onMenuClick={toggleMobileMenu} />
      
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}
      
      <main className="lg:ml-64 pt-16">
>>>>>>> 86379045a3875e29d4f8e8049d195aeeefbc8afc
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}