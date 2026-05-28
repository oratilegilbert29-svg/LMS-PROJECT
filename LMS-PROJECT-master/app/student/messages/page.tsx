"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Send } from "lucide-react"

interface Conversation {
  id: string
  name: string
  role: string
  course: string
  lastMessage: string
  time: string
  unread: boolean
}

interface Message {
  id: string
  sender: "student" | "facilitator"
  text: string
  time: string
}

const conversations: Conversation[] = [
  { 
    id: "1", 
    name: "Mike Facilitator", 
    role: "Facilitator",
    course: "Introduction to Web Development",
    lastMessage: "Great question! For this assignment...", 
    time: "10 min ago", 
    unread: true 
  },
  { 
    id: "2", 
    name: "Dr. Emily Chen", 
    role: "Facilitator",
    course: "Data Science Fundamentals",
    lastMessage: "Your project looks good so far.", 
    time: "2 hours ago", 
    unread: false 
  },
  { 
    id: "3", 
    name: "Alex Designer", 
    role: "Facilitator",
    course: "UI/UX Design Principles",
    lastMessage: "Please review the design guidelines.", 
    time: "1 day ago", 
    unread: false 
  },
]

const initialMessages: Message[] = [
  { id: "1", sender: "student", text: "Hi Professor, I have a question about the assignment.", time: "10:30 AM" },
  { id: "2", sender: "facilitator", text: "Of course! What would you like to know?", time: "10:32 AM" },
  { id: "3", sender: "student", text: "I'm confused about the requirements for the landing page project. Should we use React or vanilla HTML/CSS?", time: "10:35 AM" },
  { id: "4", sender: "facilitator", text: "Great question! For this assignment, you can use either. The focus is on demonstrating your understanding of responsive design principles. If you're comfortable with React, feel free to use it!", time: "10:38 AM" },
]

export default function StudentMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: Message = {
      id: String(messages.length + 1),
      sender: "student",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Communicate with your facilitators</p>
      </div>

      <div className="grid h-[calc(100vh-220px)] gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 p-3">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`cursor-pointer rounded-lg p-3 transition-colors hover:bg-muted ${
                  selectedConversation.id === conv.id ? "bg-[#0d4f4f]/10 border border-[#0d4f4f]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0d4f4f] text-sm font-semibold text-white">
                    {conv.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{conv.name}</p>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-xs text-[#0d4f4f]">{conv.course}</p>
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm text-muted-foreground">{conv.lastMessage}</p>
                      {conv.unread && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0d4f4f] text-xs text-white">
                          1
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0d4f4f] text-sm font-semibold text-white">
                {selectedConversation.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <CardTitle className="text-lg">{selectedConversation.name}</CardTitle>
                <CardDescription>{selectedConversation.course}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col p-0">
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "student" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "student"
                        ? "bg-[#0d4f4f] text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.sender === "student" ? "text-teal-200" : "text-muted-foreground"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type your message..." 
                  className="flex-1" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Button 
                  className="bg-[#0d4f4f] hover:bg-[#0a3d3d]"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
