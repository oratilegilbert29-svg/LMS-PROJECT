"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redirect based on role
        switch (user.role) {
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
      } else {
        router.push("/auth")
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d4f4f]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <p className="text-white">Loading...</p>
      </div>
    </div>
  )
}
