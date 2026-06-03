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
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}