"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Users, BarChart3, ArrowRight, CheckCircle, Shield, MessageSquare, Sparkles, Clock, User, X, Phone, Mail, Globe, Send } from "lucide-react"

const allCourses = [
  {
    id: 1,
    title: "Web Development Bootcamp 2025",
    description: "Master full-stack development with React, Next.js, Node.js, and MongoDB. Build real-world projects.",
    modules: ["HTML/CSS Fundamentals", "JavaScript ES6+", "React & Hooks", "Node.js & Express", "MongoDB Integration", "Deployment & DevOps"],
    duration: "12 weeks",
    instructor: "Dr. Sarah Johnson",
    level: "Beginner to Advanced",
    imageBg: "bg-blue-100",
  },
  {
    id: 2,
    title: "Data Science & AI Fundamentals",
    description: "Learn Python, data analysis, machine learning, and AI ethics. Hands-on with real datasets.",
    modules: ["Python Programming", "Data Visualization", "Statistics & Probability", "Machine Learning Basics", "Neural Networks", "AI Ethics"],
    duration: "10 weeks",
    instructor: "Prof. Michael Chen",
    level: "Intermediate",
    imageBg: "bg-green-100",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "SEO, social media marketing, content strategy, analytics, and campaign management.",
    modules: ["SEO Fundamentals", "Social Media Strategy", "Content Marketing", "Google Analytics", "Email Campaigns", "PPC Advertising"],
    duration: "8 weeks",
    instructor: "Emily Rodriguez",
    level: "All Levels",
    imageBg: "bg-purple-100",
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    description: "Design thinking, wireframing, prototyping, user research, and Figma mastery.",
    modules: ["Design Thinking", "Wireframing & Prototyping", "User Research", "Figma Advanced", "Usability Testing", "Portfolio Project"],
    duration: "8 weeks",
    instructor: "David Kim",
    level: "Beginner",
    imageBg: "bg-orange-100",
  },
  {
    id: 5,
    title: "Cybersecurity Essentials",
    description: "Network security, cryptography, threat detection, and ethical hacking basics.",
    modules: ["Network Security", "Cryptography", "Threat Intelligence", "Ethical Hacking", "Incident Response", "Compliance & Regulations"],
    duration: "10 weeks",
    instructor: "Lisa Thompson",
    level: "Intermediate",
    imageBg: "bg-red-100",
  },
  {
    id: 6,
    title: "Business English & Communication",
    description: "Professional writing, presentations, negotiation skills, and cross-cultural communication.",
    modules: ["Business Writing", "Presentation Skills", "Negotiation Tactics", "Cross-cultural Communication", "Meeting Etiquette", "Email Proficiency"],
    duration: "6 weeks",
    instructor: "James Wilson",
    level: "All Levels",
    imageBg: "bg-yellow-100",
  },
]

const stats = [
  { value: "5,000+", label: "Active Learners" },
  { value: "200+", label: "Courses" },
  { value: "50+", label: "Expert Facilitators" },
  { value: "92%", label: "Completion Rate" },
]

const registrationSteps = [
  {
    step: 1,
    title: "Browse Courses",
    description: "Explore our wide range of courses across various disciplines. Find the one that matches your goals.",
    icon: BookOpen,
  },
  {
    step: 2,
    title: "Select Your Course",
    description: "Click on any course to view detailed curriculum, modules, and instructor information.",
    icon: GraduationCap,
  },
  {
    step: 3,
    title: "Create an Account",
    description: "Sign up with your email or social account. It's free and takes less than a minute.",
    icon: Users,
  },
  {
    step: 4,
    title: "Login & Access Dashboard",
    description: "After login, you will have a student dashboard where you can track progress, access materials, and submit assignments.",
    icon: BarChart3,
    highlight: true,
  },
]

export default function LandingPage() {
  const [showAllCourses, setShowAllCourses] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<typeof allCourses[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Contact form state
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const displayedCourses = showAllCourses ? allCourses : allCourses.slice(0, 3)

  const openCourseModal = (course: typeof allCourses[0]) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCourse(null)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    
    // Simulate API call (replace with actual backend logic)
    setTimeout(() => {
      console.log("Contact form submitted:", { name: contactName, email: contactEmail, message: contactMessage })
      setSubmitStatus("success")
      setContactName("")
      setContactEmail("")
      setContactMessage("")
      setIsSubmitting(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src="/MDiHub Logo Black-01.png"
                alt="MDiHub Logo"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">MDiHub Learning</span>
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
            {/* Left side: Text content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005792]/10 text-[#005792] text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Your Learning Journey Starts Here
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Learn Skills That
                <br />
                <span className="text-[#005792]">Shape Your Future.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Access 200+ expert-led courses, track your progress, and earn certificates. Join a community of passionate learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth">
                  <Button size="lg" className="bg-[#005792] hover:bg-[#00437a] text-white w-full sm:w-auto text-base px-8">
                    Start Learning Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#courses">
                  <Button size="lg" variant="outline" className="border-gray-300 w-full sm:w-auto text-base px-8">
                    Explore Courses
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> No credit card</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Free trial</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" /> Cancel anytime</span>
              </div>
            </div>

            {/* Right side: Real image of student at desk with laptop */}
            <div className="relative hidden lg:block">
              {/* Aspect-square ensures rounded-full creates a perfect circle */}
              <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-full overflow-hidden">
                <img
                  src="/study.jpg"
                  alt="Student sitting at desk with laptop studying"
                  className="w-full h-full object-cover"
                />
                {/* Overlay matching the section's right side background highlight */}
                <div className="absolute inset-0 bg-gradient-to-l from-[#005792]/15 to-transparent pointer-events-none" />
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

      {/* Courses Section */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Popular Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover expert-led courses across technology, business, design, and more.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => openCourseModal(course)}
                className="group cursor-pointer rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl hover:border-[#005792]/30 transition-all duration-300"
              >
                <div className={`h-32 ${course.imageBg} flex items-center justify-center`}>
                  <BookOpen className="h-12 w-12 text-gray-700 opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#005792] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{course.instructor.split(" ")[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!showAllCourses && allCourses.length > 3 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setShowAllCourses(true)}
                variant="outline"
                className="border-[#005792] text-[#005792] hover:bg-[#005792] hover:text-white"
              >
                Show More Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Registration Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your path to mastering new skills begins here. Follow these steps to start learning today.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {registrationSteps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.step}
                  className={`relative rounded-xl p-6 bg-white border ${
                    step.highlight ? "border-[#005792] shadow-lg shadow-[#005792]/10" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#005792]/10 text-[#005792] text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#005792]/10 text-[#005792] mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  {step.highlight && (
                    <div className="mt-3 inline-block px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                      Final Step
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#005792] mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Card - Contact Info */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#005792] to-[#00437a] px-6 py-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                <p className="text-[#8fc9e8]">Reach out to us through any of the channels below</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#005792]/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-[#005792]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone Numbers</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#005792]/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-[#005792]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Addresses</h4>
                    <p className="text-gray-600">support@mdihub.com</p>
                    <p className="text-gray-600">info@mdihub.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#005792]/10 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-[#005792]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
                    <p className="text-gray-600">www.mdihub.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card - Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Send us a message</h3>
                <p className="text-gray-500 text-sm mt-1">We'll get back to you within 24 hours</p>
              </div>
              <form onSubmit={handleContactSubmit} className="p-6 space-y-5">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005792] focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005792] focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-700 mb-1">
                    Message / Query *
                  </label>
                  <textarea
                    id="contactMessage"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005792] focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#005792] hover:bg-[#00437a] text-white"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                {submitStatus === "success" && (
                  <p className="text-green-600 text-sm text-center">✓ Message sent successfully! We'll contact you soon.</p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-600 text-sm text-center">✗ Something went wrong. Please try again later.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#005792]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Advance Your Career?
          </h2>
          <p className="text-lg text-[#8fc9e8] mb-8 max-w-2xl mx-auto">
            Join thousands of students who are building valuable skills and achieving their goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-white text-[#005792] hover:bg-gray-100 text-base px-8">
                Enroll Now - Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#courses">
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-[#00437a] text-base px-8">
                Browse Courses
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
                  alt="MDiHub Logo"
                  className="h-10 w-auto brightness-0 invert"
                />
                <span className="text-lg font-bold text-white">MDiHub Learning</span>
              </div>
              <p className="text-sm">Empowering students through accessible, high-quality education.</p>
           </div>
            <div>
              <h4 className="font-medium text-white mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#courses" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Certifications</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth" className="hover:text-white transition-colors">Student Community</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li> 
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} MDiHub Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Course Details Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
            <div className="p-6 md:p-8">
              <div className={`h-24 rounded-xl ${selectedCourse.imageBg} flex items-center justify-center mb-6`}>
                <BookOpen className="h-12 w-12 text-gray-700 opacity-50" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{selectedCourse.title}</h2>
              <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Duration: {selectedCourse.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Instructor: {selectedCourse.instructor}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <BarChart3 className="h-4 w-4" />
                  <span>Level: {selectedCourse.level}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Modules</h3>
                <ul className="space-y-2">
                  {selectedCourse.modules.map((module, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t">
                <Link href="/auth">
                  <Button className="w-full bg-[#005792] hover:bg-[#00437a] text-white">
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}