"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Bot, User, Calendar, Utensils, Building2, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Complaint {
  type: string
  status: string
  submittedAt: string
  description: string
  businessName?: string
  location?: string
  priority?: string
}

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  complaints?: Complaint[]
  userEmail?: string
  hasComplaintData?: boolean
  isDirectComplaintQuery?: boolean
}

const ComplaintTable = ({ complaints, userEmail }: { complaints: Complaint[]; userEmail?: string }) => {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "food":
        return <Utensils className="h-4 w-4 text-orange-600" />
      case "hospital":
        return <Heart className="h-4 w-4 text-red-600" />
      case "hotel":
        return <Building2 className="h-4 w-4 text-blue-600" />
      default:
        return <Calendar className="h-4 w-4 text-purple-600" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden my-4">
      {/* Header with User Email */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">📩 Complaints logged by:</h3>
          <p className="text-xl font-bold">{userEmail}</p>
        </div>
      </div>

      {/* Table Title */}
      <div className="bg-gray-50 px-4 py-3 border-b">
        <h4 className="text-lg font-semibold text-gray-800 flex items-center">🗃️ Your Complaint Summary:</h4>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">S.No</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Complaint Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Complaint Summary</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((complaint, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(complaint.type)}
                    <span className="text-sm font-medium text-gray-900 capitalize">{complaint.type}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                  <div className="truncate" title={complaint.description}>
                    {complaint.description.length > 60
                      ? `${complaint.description.substring(0, 60)}...`
                      : complaint.description}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(complaint.submittedAt)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatTime(complaint.submittedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 text-center">
        <p className="text-sm text-gray-600">
          Total Complaints: <span className="font-semibold">{complaints.length}</span>
        </p>
      </div>
    </div>
  )
}

export default function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI complaint assistant powered by Gemini. I can help you track your complaints, understand the process, or answer any questions you have. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Check if message is a direct complaint query
  const isDirectComplaintQuery = (message: string) => {
    const triggerPhrases = [
      "track my complaints",
      "complaints",
      "my complaints",
      "complaint",
      "track",
      "show my complaints",
      "view my complaints",
      "what complaints have I filed",
      "status of my complaint",
      "complaint list",
      "my complaint status",
      "show complaint status",
      "what did I complain about",
      "list my complaints",
      "complaint history",
    ]

    const lowerMessage = message.toLowerCase()
    return triggerPhrases.some((phrase) => lowerMessage.includes(phrase))
  }

  // Fetch complaints directly from Firebase
  const fetchUserComplaints = async (userId: string) => {
    try {
      const { database } = await import("@/lib/firebase")
      const { ref, get } = await import("firebase/database")

      const userComplaintsRef = ref(database, `users/${userId}/complaints`)
      const snapshot = await get(userComplaintsRef)

      if (snapshot.exists()) {
        return Object.values(snapshot.val()) as Complaint[]
      }
      return []
    } catch (error) {
      console.error("Error fetching complaints:", error)
      return []
    }
  }

  const parseComplaintData = (response: string) => {
    // Check if response contains complaint data
    if (response.includes("USER'S COMPLAINT DATA:")) {
      try {
        // Extract complaint information from the response
        const lines = response.split("\n")
        const complaints: Complaint[] = []
        let currentComplaint: Partial<Complaint> = {}
        let isParsingComplaint = false

        for (const line of lines) {
          const trimmedLine = line.trim()

          if (trimmedLine.match(/^\d+\.\s+Type:/)) {
            // Save previous complaint if exists
            if (Object.keys(currentComplaint).length > 0) {
              complaints.push(currentComplaint as Complaint)
            }
            // Start new complaint
            currentComplaint = {}
            isParsingComplaint = true
            currentComplaint.type = trimmedLine.split("Type:")[1]?.trim() || ""
          } else if (isParsingComplaint && trimmedLine.includes("Status:")) {
            currentComplaint.status = trimmedLine.split("Status:")[1]?.trim() || ""
          } else if (isParsingComplaint && trimmedLine.includes("Submitted:")) {
            currentComplaint.submittedAt = trimmedLine.split("Submitted:")[1]?.trim() || ""
          } else if (isParsingComplaint && trimmedLine.includes("Description:")) {
            currentComplaint.description = trimmedLine.split("Description:")[1]?.trim() || ""
          } else if (isParsingComplaint && trimmedLine.includes("Business:")) {
            currentComplaint.businessName = trimmedLine.split("Business:")[1]?.trim() || ""
          } else if (isParsingComplaint && trimmedLine.includes("Location:")) {
            currentComplaint.location = trimmedLine.split("Location:")[1]?.trim() || ""
          } else if (isParsingComplaint && trimmedLine.includes("Priority:")) {
            currentComplaint.priority = trimmedLine.split("Priority:")[1]?.trim() || ""
          }
        }

        // Add the last complaint
        if (Object.keys(currentComplaint).length > 0) {
          complaints.push(currentComplaint as Complaint)
        }

        if (complaints.length > 0) {
          // Clean the response text
          const cleanResponse = response
            .replace(/USER'S COMPLAINT DATA:[\s\S]*?COMPLAINT STATISTICS:/g, "")
            .replace(/COMPLAINT STATISTICS:[\s\S]*$/g, "")
            .trim()

          return {
            complaints,
            cleanResponse: cleanResponse || "Here are your complaint details:",
            userEmail: user?.email || "",
          }
        }
      } catch (error) {
        console.error("Error parsing complaint data:", error)
      }
    }
    return null
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      // Check if this is a direct complaint query
      if (isDirectComplaintQuery(currentInput) && user?.id) {
        // Fetch complaints directly from Firebase
        const complaints = await fetchUserComplaints(user.id)

        if (complaints.length > 0) {
          const botResponse: Message = {
            id: Date.now() + 1,
            text: "Here are your complaint details:",
            isBot: true,
            timestamp: new Date(),
            complaints: complaints,
            userEmail: user.email,
            hasComplaintData: true,
            isDirectComplaintQuery: true,
          }
          setMessages((prev) => [...prev, botResponse])
        } else {
          const botResponse: Message = {
            id: Date.now() + 1,
            text: "You haven't filed any complaints yet. Would you like to file a complaint or need help with something else?",
            isBot: true,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botResponse])
        }
        setIsTyping(false)
        return
      }

      // For other queries, use Gemini API
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          userId: user?.id || null,
        }),
      })

      const data = await response.json()

      // Parse complaint data if present
      const parsedData = parseComplaintData(data.response)

      const botResponse: Message = {
        id: Date.now() + 1,
        text: parsedData
          ? parsedData.cleanResponse
          : data.response || "I'm sorry, I couldn't process your request right now. Please try again later.",
        isBot: true,
        timestamp: new Date(),
        complaints: parsedData?.complaints,
        userEmail: parsedData?.userEmail,
        hasComplaintData: !!parsedData,
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: "I'm experiencing some technical difficulties. Please try again later or contact our support team.",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
        >
          <Bot className="h-8 w-8 text-white" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-[900px] h-[650px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Gemini Assistant</h3>
                    <p className="text-sm opacity-90">AI-powered support</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-full ${message.isBot ? "max-w-[95%]" : "max-w-xs"}`}>
                    <div
                      className={`flex items-start space-x-2 ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isBot
                            ? "bg-gradient-to-r from-purple-500 to-pink-500"
                            : "bg-gradient-to-r from-blue-500 to-cyan-500"
                        }`}
                      >
                        {message.isBot ? (
                          <Bot className="h-4 w-4 text-white" />
                        ) : (
                          <User className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`p-3 rounded-2xl ${
                            message.isBot
                              ? "bg-gray-100 text-gray-800"
                              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.isBot ? "text-gray-500" : "text-blue-100"}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>

                        {/* Render complaint table if present */}
                        {message.hasComplaintData && message.complaints && (
                          <div className="mt-3">
                            <ComplaintTable complaints={message.complaints} userEmail={message.userEmail} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your complaints..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={isTyping || !inputValue.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
