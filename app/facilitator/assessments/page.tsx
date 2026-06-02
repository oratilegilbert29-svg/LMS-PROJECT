"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, Trash2, Edit, Paperclip } from "lucide-react"
import { mockCourses } from "@/lib/mock-data"

const initialAssessments = [
  {
    id: "1",
    title: "Midterm Quiz",
    type: "Quiz",
    course: "Introduction to Web Development",
    due: "2026-06-01",
    description: "A short quiz covering HTML, CSS, and JavaScript fundamentals.",
    attachments: ["midterm-guidelines.pdf"],
    questions: [
      {
        id: "q1",
        prompt: "Which tag is used to insert an image in HTML?",
        options: [
          { label: "A", text: "<img>" },
          { label: "B", text: "<image>" },
          { label: "C", text: "<picture>" },
          { label: "D", text: "<src>" },
          { label: "E", text: "<figure>" },
          { label: "F", text: "<photo>" },
        ],
        correctAnswer: "A",
        marks: 2,
      },
    ],
    status: "Open",
  },
]

const emptyQuestion = (id: string) => ({
  id,
  prompt: "",
  options: [
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
    { label: "D", text: "" },
    { label: "E", text: "" },
    { label: "F", text: "" },
  ],
  correctAnswer: "A",
  marks: 1,
})

export default function FacilitatorAssessmentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [type, setType] = useState("Quiz")
  const [courseId, setCourseId] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [description, setDescription] = useState("")
  const [attachment, setAttachment] = useState("")
  const [questions, setQuestions] = useState([emptyQuestion("q1")])
  const [assessments, setAssessments] = useState(initialAssessments)

  const courseOptions = mockCourses.filter((course) => course.instructor === "Mike Facilitator")
  const selectedCourse = courseOptions.find((course) => course.id === courseId)

  const resetForm = () => {
    setEditingId(null)
    setTitle("")
    setType("Quiz")
    setCourseId("")
    setDueDate("")
    setDescription("")
    setAttachment("")
    setQuestions([emptyQuestion("q1")])
  }

  const handleAddQuestion = () => {
    const nextIndex = questions.length + 1
    setQuestions((current) => [...current, emptyQuestion(`q${nextIndex}`)])
  }

  const handleQuestionChange = (index: number, field: string, value: string | number) => {
    setQuestions((current) =>
      current.map((question, i) =>
        i === index
          ? {
              ...question,
              [field]: value,
            }
          : question
      )
    )
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions((current) =>
      current.map((question, qi) =>
        qi === questionIndex
          ? {
              ...question,
              options: question.options.map((option, oi) =>
                oi === optionIndex ? { ...option, text: value } : option
              ),
            }
          : question
      )
    )
  }

  const handleRemoveQuestion = (index: number) => {
    setQuestions((current) => current.filter((_, i) => i !== index))
  }

  const handleSaveAssessment = () => {
    if (!title || !dueDate || !courseId || questions.length === 0) return

    const newAssessment = {
      id: editingId || `${assessments.length + 1}`,
      title,
      type,
      course: selectedCourse?.title || "",
      due: dueDate,
      description,
      attachments: attachment ? [attachment] : [],
      questions,
      status: "Open",
    }

    setAssessments((current) => {
      if (editingId) {
        return current.map((assessment) =>
          assessment.id === editingId ? newAssessment : assessment
        )
      }
      return [newAssessment, ...current]
    })

    resetForm()
    setShowForm(false)
  }

  const handleEdit = (assessmentId: string) => {
    const assessment = assessments.find((item) => item.id === assessmentId)
    if (!assessment) return

    setEditingId(assessment.id)
    setTitle(assessment.title)
    setType(assessment.type)
    setCourseId(courseOptions.find((course) => course.title === assessment.course)?.id || "")
    setDueDate(assessment.due)
    setDescription(assessment.description)
    setAttachment(assessment.attachments?.[0] || "")
    setQuestions(assessment.questions)
    setShowForm(true)
  }

  const handleDelete = (assessmentId: string) => {
    setAssessments((current) => current.filter((item) => item.id !== assessmentId))
  }

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAttachment(file.name)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-600">Create quizzes, tests, and track assessment content for your courses.</p>
        </div>
        <Button className="gap-2 bg-[#0f3b92] hover:bg-[#0d3675]" onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
          New Assessment
        </Button>
      </div>

      {showForm && (
        <Card className="border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>{editingId ? "Edit Assessment" : "Create Assessment"}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => { setShowForm(false); resetForm() }}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 py-4 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <Label htmlFor="assessment-title">Title</Label>
              <Input
                id="assessment-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Assessment title"
              />
            </div>
            <div>
              <Label htmlFor="assessment-type">Type</Label>
              <select
                id="assessment-type"
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Quiz">Quiz</option>
                <option value="Test">Test</option>
                <option value="Project">Project</option>
              </select>
            </div>
            <div>
              <Label htmlFor="assessment-course">Course</Label>
              <select
                id="assessment-course"
                value={courseId}
                onChange={(event) => setCourseId(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Choose course</option>
                {courseOptions.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="assessment-due">Due Date</Label>
              <Input
                id="assessment-due"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="assessment-description">Description</Label>
              <Textarea
                id="assessment-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add details, instructions, or exam scope"
                className="h-24"
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="assessment-attachment">Attachment</Label>
              <input
                id="assessment-attachment"
                type="file"
                className="w-full text-sm text-slate-600"
                onChange={handleAttachmentChange}
              />
              {attachment && (
                <p className="mt-2 text-sm text-slate-500 flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  {attachment}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => (
              <Card key={question.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Question {index + 1}</h2>
                    <p className="text-sm text-gray-500">Add question text, answers, correct choice, and mark allocation.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveQuestion(index)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`question-${index}`}>Question</Label>
                    <Textarea
                      id={`question-${index}`}
                      value={question.prompt}
                      onChange={(event) => handleQuestionChange(index, "prompt", event.target.value)}
                      placeholder="Enter question text"
                      className="h-20"
                    />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label>Answer Options</Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {question.options.map((option, optionIndex) => (
                          <Input
                            key={option.label}
                            value={option.text}
                            onChange={(event) => handleOptionChange(index, optionIndex, event.target.value)}
                            placeholder={`${option.label}. Answer`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <div>
                        <Label htmlFor={`correct-answer-${index}`}>Correct Answer</Label>
                        <select
                          id={`correct-answer-${index}`}
                          value={question.correctAnswer}
                          onChange={(event) => handleQuestionChange(index, "correctAnswer", event.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {question.options.map((option) => (
                            <option key={option.label} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor={`marks-${index}`}>Mark Allocation</Label>
                        <Input
                          id={`marks-${index}`}
                          type="number"
                          min={1}
                          value={question.marks}
                          onChange={(event) => handleQuestionChange(index, "marks", Number(event.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Button variant="outline" onClick={handleAddQuestion}>
              Add Question
            </Button>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => { setShowForm(false); resetForm() }}>
                Cancel
              </Button>
              <Button className="bg-[#0f3b92] hover:bg-[#0d3675]" onClick={handleSaveAssessment}>
                {editingId ? "Update Assessment" : "Create Assessment"}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {assessments.map((assessment) => (
          <Card key={assessment.id}>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>{assessment.title}</CardTitle>
                <CardDescription>{assessment.type} • {assessment.course}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(assessment.id)}>
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(assessment.id)}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-500">Due {assessment.due}</div>
              <p className="text-sm text-gray-600">{assessment.description}</p>
              <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                <span>{assessment.questions.length} questions</span>
                <span>•</span>
                <span>{assessment.attachments.length} attachment(s)</span>
              </div>
              {assessment.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                  <Paperclip className="h-3.5 w-3.5" />
                  {assessment.attachments.join(", ")}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
