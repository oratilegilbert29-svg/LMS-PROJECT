"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, AlertCircle, UserPlus, LogIn, BookOpen, Briefcase, Shield, Phone, Hash, ChevronDown } from "lucide-react"

const courseOptions = [
  "Introduction to Web Development",
  "Advanced React Patterns",
  "Data Science Fundamentals",
  "UI/UX Design Principles",
  "Project Management Essentials",
]

const expertiseAreas = [
  "Web Development",
  "Data Science",
  "Mobile Development",
  "Design",
  "Business",
  "Mathematics",
  "Science",
  "Languages",
  "Other",
]

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")

  // Login fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Register fields (shared)
  const [regName, setRegName] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regConfirmPassword, setRegConfirmPassword] = useState("")
  const [regRole, setRegRole] = useState<UserRole>("student")
  const [regPhone, setRegPhone] = useState("")

  // Student-specific
  const [studentId, setStudentId] = useState("")
  const [courseInterest, setCourseInterest] = useState("")
  const [enrollmentType, setEnrollmentType] = useState("Full-time")

  // Facilitator-specific
  const [expertise, setExpertise] = useState("")
  const [yearsExp, setYearsExp] = useState("")
  const [qualifications, setQualifications] = useState("")
  const [bio, setBio] = useState("")

  // Admin-specific (no extra fields)

  // Auto-generate student ID
  useEffect(() => {
    if (regRole === "student") {
      const year = new Date().getFullYear()
      const rand = String(Math.floor(1000 + Math.random() * 9000))
      setStudentId(`STU-${year}-${rand}`)
    }
  }, [regRole])

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    const result = await login(email, password)
    if (!result.success) setError(result.error || "Login failed")
    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (regPassword !== regConfirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    const extraData: Record<string, string> = { phone: regPhone }

    if (regRole === "student") {
      extraData.studentId = studentId
      extraData.courseInterest = courseInterest
      extraData.enrollmentType = enrollmentType
    } else if (regRole === "facilitator") {
      extraData.expertise = expertise
      extraData.yearsExp = yearsExp
      extraData.qualifications = qualifications
      extraData.bio = bio
    } else if (regRole === "admin") {
      // No extra fields needed
    }

    const result = await register(regName, regEmail, regPassword, regRole, extraData)
    if (!result.success) setError(result.error || "Registration failed")
    setIsLoading(false)
  }

  const renderRoleSelector = () => (
    <div className="space-y-2">
      <Label>Role</Label>
      <div className="grid grid-cols-3 gap-2">
        {([
          { value: "student" as UserRole, label: "Student", icon: BookOpen },
          { value: "facilitator" as UserRole, label: "Facilitator", icon: Briefcase },
          { value: "admin" as UserRole, label: "Admin", icon: Shield },
        ]).map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setRegRole(value)}
            className={`flex flex-col items-center gap-1 rounded-lg border-2 px-3 py-3 text-sm font-medium capitalize transition-colors ${
              regRole === value
                ? "border-[#005792] bg-[#005792]/10 text-[#005792]"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )

  const renderCommonFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="regName">Full Name</Label>
        <Input id="regName" type="text" placeholder="Enter your full name" value={regName} onChange={(e) => setRegName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="regEmail">Email</Label>
        <Input id="regEmail" type="email" placeholder="Enter your email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="regPhone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input id="regPhone" type="tel" placeholder="+1 (555) 000-0000" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} className="pl-10" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="regPassword">Password</Label>
          <Input id="regPassword" type="password" placeholder="Create a password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required minLength={6} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="regConfirmPassword">Confirm Password</Label>
          <Input id="regConfirmPassword" type="password" placeholder="Confirm password" value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} required minLength={6} />
        </div>
      </div>
    </>
  )

  const renderStudentFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="studentId">Student ID / Registration Number</Label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input id="studentId" type="text" value={studentId} readOnly className="pl-10 bg-gray-50 text-gray-600 cursor-not-allowed" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="courseInterest">Course of Interest</Label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <select
            id="courseInterest"
            value={courseInterest}
            onChange={(e) => setCourseInterest(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none"
            required
          >
            <option value="">Select a course</option>
            {courseOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Enrollment Type</Label>
        <div className="grid grid-cols-3 gap-2">
          {["Full-time", "Part-time", "Online"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setEnrollmentType(type)}
              className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors ${
                enrollmentType === type
                  ? "border-[#005792] bg-[#005792]/10 text-[#005792]"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </>
  )

  const renderFacilitatorFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="expertise">Area of Expertise</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <select
            id="expertise"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none"
            required
          >
            <option value="">Select expertise</option>
            {expertiseAreas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="yearsExp">Years of Experience</Label>
        <Input id="yearsExp" type="number" placeholder="e.g. 5" value={yearsExp} onChange={(e) => setYearsExp(e.target.value)} required min={0} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="qualifications">Qualifications / Certifications</Label>
        <textarea
          id="qualifications"
          placeholder="List your relevant qualifications..."
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Professional Bio</Label>
        <textarea
          id="bio"
          placeholder="Tell us about your teaching experience..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
          required
        />
      </div>
    </>
  )

  const renderAdminFields = () => null

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#005792] to-[#00437a] p-4">
      <Card className="w-full max-w-lg border-0 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-2 -mt-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mx-auto flex items-center justify-center">
            <img src="/MDiHub Logo Black-01.png" alt="MDIHub Logo" className="h-14 w-auto" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Welcome to LMS</CardTitle>
            <CardDescription className="mt-2">
              {mode === "login" ? "Sign in to access your learning portal" : "Create your account"}
            </CardDescription>
          </div>

          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => { setMode("login"); setError("") }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                mode === "login" ? "bg-white text-[#005792] shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
            <button
              onClick={() => { setMode("register"); setError("") }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                mode === "register" ? "bg-white text-[#005792] shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              Register
            </button>
          </div>
        </CardHeader>
        <CardContent className="max-h-[calc(100vh-260px)] overflow-y-auto">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-[#005792] hover:bg-[#00437a]" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {renderRoleSelector()}
              <hr className="border-gray-200" />
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Personal Information</p>
              {renderCommonFields()}
              {regRole !== "admin" && <hr className="border-gray-200" />}
              {regRole !== "admin" && <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{regRole === "student" ? "Student Details" : "Professional Details"}</p>}
              {regRole === "student" && renderStudentFields()}
              {regRole === "facilitator" && renderFacilitatorFields()}
              <Button type="submit" className="w-full bg-[#005792] hover:bg-[#00437a]" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</> : "Create Account"}
              </Button>
            </form>
          )}

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