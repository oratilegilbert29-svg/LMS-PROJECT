"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "student" | "admin" | "facilitator"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string, role: UserRole, extraData?: Record<string, string>) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const MOCK_USERS: { email: string; password: string; user: User }[] = [
  {
    email: "student@lms.com",
    password: "student123",
    user: { id: "1", email: "student@lms.com", name: "John Student", role: "student" },
  },
  {
    email: "admin@lms.com",
    password: "admin123",
    user: { id: "2", email: "admin@lms.com", name: "Sarah Admin", role: "admin" },
  },
  {
    email: "facilitator@lms.com",
    password: "facilitator123",
    user: { id: "3", email: "facilitator@lms.com", name: "Mike Facilitator", role: "facilitator" },
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("lms_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      setUser(foundUser.user)
      localStorage.setItem("lms_user", JSON.stringify(foundUser.user))

      // Redirect based on role
      switch (foundUser.user.role) {
        case "student":
          router.push("/student")
          break
        case "admin":
          router.push("/admin")
          break
        case "facilitator":
          router.push("/facilitator")
          break
      }

      return { success: true }
    }

    return { success: false, error: "Invalid email or password" }
  }

  const register = async (name: string, email: string, password: string, role: UserRole, extraData?: Record<string, string>): Promise<{ success: boolean; error?: string }> => {
    const exists = MOCK_USERS.find((u) => u.email === email)
    if (exists) {
      return { success: false, error: "Email already registered" }
    }

    const newUser: User = {
      id: String(Date.now()),
      email,
      name,
      role,
    }

    setUser(newUser)
    localStorage.setItem("lms_user", JSON.stringify(newUser))
    if (extraData) {
      localStorage.setItem("lms_profile", JSON.stringify(extraData))
    }

    switch (role) {
      case "student":
        break
      case "admin":
        router.push("/admin")
        break
      case "facilitator":
        router.push("/facilitator")
        break
    }

    return { success: true }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem("lms_user")
    localStorage.removeItem("lms_profile")
    // Use a small delay to ensure state updates before navigation
    setTimeout(() => {
      router.push("/auth")
    }, 100)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
