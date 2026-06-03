"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Users, BarChart3, ArrowRight, CheckCircle, Shield, MessageSquare, Sparkles } from "lucide-react"


const features = [
  {
    icon: BookOpen,
    title: "Interactive Courses",
    description: "Engage with multimedia-rich courses designed for modern learners with real-time progress tracking.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Dedicated portals for students, facilitators, and administrators with tailored experiences.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Comprehensive insights into student performance, course completion rates, and platform growth.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Communication",
    description: "Built-in messaging and notification system to keep everyone connected and informed.",
  },
  {
    icon: Shield,
    title: "Secure & Scalable",
    description: "Enterprise-grade security with role-based permissions and cloud-ready infrastructure.",
  },
  {
    icon: Sparkles,
    title: "Smart Grading",
    description: "Streamlined assignment submission and grading workflow with instant feedback loops.",
  },
]

const stats = [
  { value: "5,000+", label: "Active Learners" },
  { value: "200+", label: "Courses" },
  { value: "50+", label: "Expert Facilitators" },
  { value: "92%", label: "Completion Rate" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src="/MDiHub Logo Black-01.png"
                alt="MDIHub Logo"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">MDIHub LMS</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth">
                <Button variant="outline" className="border-gray-300">Sign In</Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-[#005792] hover:bg-[#00437a] text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#005792]/5 via-white to-[#005792]/5" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#005792]/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005792]/10 text-[#005792] text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Next-Generation Learning Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Empower Learning.
                <br />
                <span className="text-[#005792]">Inspire Growth.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                A comprehensive learning management system that connects students, facilitators, and administrators
                in a seamless educational experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth">
                  <Button size="lg" className="bg-[#005792] hover:bg-[#00437a] text-white w-full sm:w-auto text-base px-8">
                    Start Learning Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button size="lg" variant="outline" className="border-gray-300 w-full sm:w-auto text-base px-8">
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> No credit card</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Free trial</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Cancel anytime</span>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl bg-gradient-to-br from-[#005792] to-[#00437a] p-1">
                <div className="rounded-2xl bg-white p-6 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3 p-4 rounded-xl bg-gray-50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#005792]/10">
                        <Users className="h-5 w-5 text-[#005792]" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">5K+</p>
                      <p className="text-sm text-gray-500">Active Students</p>
                    </div>
                    <div className="space-y-3 p-4 rounded-xl bg-gray-50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <BookOpen className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">200+</p>
                      <p className="text-sm text-gray-500">Courses</p>
                    </div>
                    <div className="space-y-3 p-4 rounded-xl bg-gray-50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                        <GraduationCap className="h-5 w-5 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">50+</p>
                      <p className="text-sm text-gray-500">Facilitators</p>
                    </div>
                    <div className="space-y-3 p-4 rounded-xl bg-gray-50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                        <BarChart3 className="h-5 w-5 text-orange-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">92%</p>
                      <p className="text-sm text-gray-500">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#005792]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-[#8fc9e8] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to manage learning
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A complete platform that brings together students, facilitators, and administrators
              for an unparalleled educational experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group p-6 rounded-xl border border-gray-200 hover:border-[#005792]/30 hover:shadow-lg hover:shadow-[#005792]/5 transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#005792]/10 text-[#005792] mb-4 group-hover:bg-[#005792] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Designed for every role
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored experiences for students, facilitators, and administrators — all in one platform.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Students",
                description: "Access courses, track progress, submit assignments, and communicate with facilitators in real-time.",
                features: ["Interactive course content", "Progress tracking", "Assignment submission", "Direct messaging"],
                color: "bg-blue-50 text-blue-600",
                border: "border-blue-200",
              },
              {
                title: "Facilitators",
                description: "Create courses, manage students, grade submissions, and share resources effortlessly.",
                features: ["Course management", "Student analytics", "Grading tools", "Resource library"],
                color: "bg-green-50 text-green-600",
                border: "border-green-200",
              },
              {
                title: "Administrators",
                description: "Oversee the entire platform, manage users, generate reports, and control settings.",
                features: ["User management", "System analytics", "Course oversight", "Platform settings"],
                color: "bg-purple-50 text-purple-600",
                border: "border-purple-200",
              },
            ].map((role) => (
              <div
                key={role.title}
                className="rounded-xl border border-gray-200 p-8 bg-white hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{role.title}</h3>
                <p className="text-gray-600 mb-6">{role.description}</p>
                <ul className="space-y-3">
                  {role.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#005792]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to transform your learning experience?
          </h2>
          <p className="text-lg text-[#8fc9e8] mb-8 max-w-2xl mx-auto">
            Join thousands of learners and educators already using MDIHub LMS. Get started for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-white text-[#005792] hover:bg-gray-100 text-base px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-[#00437a] text-base px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/MDiHub Logo Black-01.png"
                  alt="MDIHub Logo"
                  className="h-10 w-auto brightness-0 invert"
                />
                <span className="text-lg font-bold text-white">MDIHub LMS</span>
              </div>
              <p className="text-sm">Empowering education through technology.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} MDIHub LMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
