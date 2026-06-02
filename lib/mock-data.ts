// Mock data for the LMS

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  progress?: number
  enrolledStudents?: number
  duration: string
  category: string
  thumbnail: string
  status: "active" | "draft" | "archived"
}

export interface Assignment {
  id: string
  title: string
  courseId: string
  courseName: string
  dueDate: string
  status: "pending" | "submitted" | "graded"
  grade?: number
  maxGrade: number
}

export interface Announcement {
  id: string
  title: string
  content: string
  date: string
  author: string
}

export interface Notification {
  id: string
  type: string
  title: string
  message: string
  date: string
}

export interface StudentStats {
  enrolledCourses: number
  completedCourses: number
  pendingAssignments: number
  averageGrade: number
}

export interface AdminStats {
  totalStudents: number
  totalFacilitators: number
  totalCourses: number
  activeEnrollments: number
  monthlyRevenue: number
  completionRate: number
}

export interface FacilitatorStats {
  totalStudents: number
  activeCourses: number
  pendingGrading: number
  averageRating: number
}

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript",
    instructor: "Mike Facilitator",
    progress: 65,
    enrolledStudents: 45,
    duration: "8 weeks",
    category: "Development",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "active",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Master advanced React concepts and design patterns",
    instructor: "Mike Facilitator",
    progress: 30,
    enrolledStudents: 32,
    duration: "6 weeks",
    category: "Development",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "active",
  },
  {
    id: "3",
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis and machine learning",
    instructor: "Dr. Emily Chen",
    progress: 80,
    enrolledStudents: 78,
    duration: "10 weeks",
    category: "Data Science",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "active",
  },
  {
    id: "4",
    title: "UI/UX Design Principles",
    description: "Learn modern design principles and tools",
    instructor: "Alex Designer",
    progress: 0,
    enrolledStudents: 56,
    duration: "5 weeks",
    category: "Design",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "draft",
  },
  {
    id: "5",
    title: "Project Management Essentials",
    description: "Master agile and traditional project management",
    instructor: "Sarah Manager",
    progress: 100,
    enrolledStudents: 120,
    duration: "4 weeks",
    category: "Business",
    thumbnail: "/placeholder.svg?height=200&width=300",
    status: "active",
  },
]

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Build a Landing Page",
    courseId: "1",
    courseName: "Introduction to Web Development",
    dueDate: "2024-02-15",
    status: "pending",
    maxGrade: 100,
  },
  {
    id: "2",
    title: "React Component Library",
    courseId: "2",
    courseName: "Advanced React Patterns",
    dueDate: "2024-02-20",
    status: "submitted",
    maxGrade: 100,
  },
  {
    id: "3",
    title: "Data Visualization Project",
    courseId: "3",
    courseName: "Data Science Fundamentals",
    dueDate: "2024-02-10",
    status: "graded",
    grade: 92,
    maxGrade: 100,
  },
  {
    id: "4",
    title: "CSS Flexbox Exercise",
    courseId: "1",
    courseName: "Introduction to Web Development",
    dueDate: "2024-02-18",
    status: "pending",
    maxGrade: 50,
  },
]

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Welcome to the New Semester",
    content: "We are excited to welcome all students to the new semester. Check out our new course offerings!",
    date: "2024-02-01",
    author: "Admin Team",
  },
  {
    id: "2",
    title: "System Maintenance Notice",
    content: "The LMS will undergo scheduled maintenance on February 10th from 2 AM to 4 AM EST.",
    date: "2024-02-05",
    author: "IT Department",
  },
  {
    id: "3",
    title: "New Course: AI Fundamentals",
    content: "We are launching a new course on AI Fundamentals starting March 1st. Enroll now!",
    date: "2024-02-08",
    author: "Course Team",
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "Assessment",
    title: "New assessment published",
    message: "A new quiz has been added for your Web Development course.",
    date: "May 28, 2026",
  },
  {
    id: "2",
    type: "Course",
    title: "Course enrollment update",
    message: "12 students enrolled in your Advanced React course today.",
    date: "May 27, 2026",
  },
  {
    id: "3",
    type: "Message",
    title: "Student message received",
    message: "A learner sent you a question about assignment deadlines.",
    date: "May 26, 2026",
  },
]

// Mock Stats
export const mockStudentStats: StudentStats = {
  enrolledCourses: 4,
  completedCourses: 1,
  pendingAssignments: 3,
  averageGrade: 87,
}

export const mockAdminStats: AdminStats = {
  totalStudents: 1250,
  totalFacilitators: 45,
  totalCourses: 78,
  activeEnrollments: 3420,
  monthlyRevenue: 45000,
  completionRate: 72,
}

export const mockFacilitatorStats: FacilitatorStats = {
  totalStudents: 156,
  activeCourses: 4,
  pendingGrading: 23,
  averageRating: 4.7,
}

// Mock Users for Admin
export const mockUsers = [
  { id: "1", name: "John Student", email: "john@example.com", role: "student", status: "active", enrolledCourses: 3 },
  { id: "2", name: "Jane Doe", email: "jane@example.com", role: "student", status: "active", enrolledCourses: 5 },
  { id: "3", name: "Bob Smith", email: "bob@example.com", role: "student", status: "inactive", enrolledCourses: 1 },
  { id: "4", name: "Mike Facilitator", email: "mike@example.com", role: "facilitator", status: "active", courses: 4 },
  { id: "5", name: "Dr. Emily Chen", email: "emily@example.com", role: "facilitator", status: "active", courses: 2 },
  { id: "6", name: "Sarah Admin", email: "admin@lms.com", role: "admin", status: "active" },
]

// Admin page data sources (shared so dashboard counts match)
export type AdminUser = { id: number; name: string; email: string; role: string; status: string }
export type AdminCourse = { id: number; title: string; description: string; facilitator: string; facilitatorId: number | null; students: number; status: string; startDate: string; endDate: string }
export type AdminAnnouncement = { id: number; title: string; content: string; date: string; priority: string }
export type FacilitatorOption = { id: number | null; name: string }

export const adminUsers: AdminUser[] = [
  { id: 1, name: "John Doe", email: "john.doe@email.com", role: "Student", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@email.com", role: "Facilitator", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob.j@email.com", role: "Student", status: "Active" },
  { id: 4, name: "Alice Brown", email: "alice.b@email.com", role: "Facilitator", status: "Suspended" },
  { id: 5, name: "Charlie Wilson", email: "charlie.w@email.com", role: "Student", status: "Active" },
  { id: 6, name: "Ethan Davis", email: "ethan.d@email.com", role: "Student", status: "Active" },
  { id: 7, name: "Fiona Garcia", email: "fiona.g@email.com", role: "Facilitator", status: "Active" },
  { id: 8, name: "George Taylor", email: "george.t@email.com", role: "Student", status: "Suspended" },
  { id: 9, name: "Sarah Admin", email: "admin@lms.com", role: "Admin", status: "Active" },
]

export const adminCourses: AdminCourse[] = [
  { id: 1, title: "Introduction to Mathematics", description: "Foundational mathematics course covering algebra and calculus", facilitator: "Jane Smith", facilitatorId: 2, students: 45, status: "Active", startDate: "2026-01-15", endDate: "2026-05-30" },
  { id: 2, title: "Advanced Computer Science", description: "Advanced topics in algorithms and data structures", facilitator: "Bob Johnson", facilitatorId: 3, students: 32, status: "Active", startDate: "2026-01-20", endDate: "2026-06-15" },
  { id: 3, title: "Physics 101", description: "Introduction to classical mechanics and thermodynamics", facilitator: "Alice Brown", facilitatorId: 4, students: 28, status: "Active", startDate: "2026-02-01", endDate: "2026-06-20" },
  { id: 4, title: "Chemistry Fundamentals", description: "Basic chemistry principles and laboratory techniques", facilitator: "Unassigned", facilitatorId: null, students: 0, status: "Draft", startDate: "2026-06-01", endDate: "2026-12-15" },
  { id: 5, title: "English Literature", description: "Survey of British and American literature", facilitator: "Fiona Garcia", facilitatorId: 8, students: 38, status: "Active", startDate: "2026-01-10", endDate: "2026-05-25" },
  { id: 6, title: "Data Structures", description: "Comprehensive study of data structures and their applications", facilitator: "Jane Smith", facilitatorId: 2, students: 41, status: "Active", startDate: "2026-02-05", endDate: "2026-06-30" },
  { id: 7, title: "Biology Basics", description: "Introduction to cellular biology and genetics", facilitator: "Unassigned", facilitatorId: null, students: 0, status: "Draft", startDate: "2026-06-15", endDate: "2026-12-20" },
]

export const adminFacilitators: FacilitatorOption[] = [
  { id: null, name: "Unassigned" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
  { id: 4, name: "Alice Brown" },
  { id: 8, name: "Fiona Garcia" },
]

export const adminAnnouncements: AdminAnnouncement[] = [
  { id: 1, title: "System Maintenance Scheduled", content: "The LMS will undergo scheduled maintenance on May 25th from 2:00 AM to 4:00 AM. Please plan accordingly.", date: "2026-05-18", priority: "High" },
  { id: 2, title: "New Course Available", content: "We're excited to announce a new course on Machine Learning. Enrollment opens next week!", date: "2026-05-17", priority: "Medium" },
  { id: 3, title: "Exam Schedule Released", content: "The final exam schedule for the semester has been published. Check your course dashboards for details.", date: "2026-05-15", priority: "High" },
  { id: 4, title: "Welcome New Facilitators", content: "Please join us in welcoming our 5 new facilitators who joined this month!", date: "2026-05-12", priority: "Low" },
  { id: 5, title: "Library Resources Update", content: "New digital resources have been added to the library. Check them out in the Resources section.", date: "2026-05-10", priority: "Medium" },
]

// Mock Submissions for Facilitator
export const mockSubmissions = [
  {
    id: "1",
    studentName: "John Student",
    assignmentTitle: "Build a Landing Page",
    courseName: "Introduction to Web Development",
    submittedAt: "2024-02-14",
    status: "pending",
  },
  {
    id: "2",
    studentName: "Jane Doe",
    assignmentTitle: "Build a Landing Page",
    courseName: "Introduction to Web Development",
    submittedAt: "2024-02-13",
    status: "pending",
  },
  {
    id: "3",
    studentName: "Bob Smith",
    assignmentTitle: "React Component Library",
    courseName: "Advanced React Patterns",
    submittedAt: "2024-02-12",
    status: "graded",
    grade: 85,
  },
]
