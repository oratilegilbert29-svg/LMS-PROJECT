"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { GraduationCap, Loader2, AlertCircle } from "lucide-react"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await login(email, password)

    if (!result.success) {
      setError(result.error || "Login failed")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#21647f] to-[#0a3d3d] p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#21647f]">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Welcome to LMS</CardTitle>
            <CardDescription className="mt-2">
              Sign in to access your learning portal
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#21647f] hover:bg-[#0a3d3d]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-3 rounded-lg bg-gray-50 p-4">
            <p className="text-center text-sm font-medium text-gray-600">Demo Credentials</p>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex justify-between rounded bg-white p-2">
                <span className="font-medium">Student:</span>
                <span>student@lms.com / student123</span>
              </div>
              <div className="flex justify-between rounded bg-white p-2">
                <span className="font-medium">Admin:</span>
                <span>admin@lms.com / admin123</span>
              </div>
              <div className="flex justify-between rounded bg-white p-2">
                <span className="font-medium">Facilitator:</span>
                <span>facilitator@lms.com / facilitator123</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
