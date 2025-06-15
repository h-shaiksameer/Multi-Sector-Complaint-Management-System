"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { UtensilsCrossed, MapPin, Calendar, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FoodComplaintPage() {
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantAddress: "",
    issueType: "",
    foodOrdered: "",
    incidentDate: "",
    incidentTime: "",
    description: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Auto-fill user data if logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const userData = localStorage.getItem("user")
      const user = userData ? JSON.parse(userData) : null

      const complaintData = {
        ...formData,
        type: "Food",
        status: "Pending",
        submittedAt: new Date().toLocaleString(),
        userId: user?.id || null,
      }

      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaintData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Your food complaint has been submitted successfully!",
        })
        router.push("/dashboard")
      } else {
        throw new Error("Failed to submit complaint")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const issueTypes = [
    "Food Quality Issues",
    "Food Poisoning",
    "Hygiene Concerns",
    "Service Problems",
    "Billing Disputes",
    "Expired Food Items",
    "Foreign Objects in Food",
    "Allergic Reactions",
    "Other",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <UtensilsCrossed className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Food & Restaurant Complaint
            </CardTitle>
            <CardDescription className="text-lg">
              Report food quality issues, hygiene concerns, and service problems
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-orange-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Restaurant Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-orange-600" />
                  Restaurant Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input
                      id="restaurantName"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleInputChange}
                      placeholder="Enter restaurant name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurantAddress">Restaurant Address</Label>
                    <Input
                      id="restaurantAddress"
                      name="restaurantAddress"
                      value={formData.restaurantAddress}
                      onChange={handleInputChange}
                      placeholder="Enter restaurant address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Incident Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                  Incident Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueType">Issue Type</Label>
                    <Select onValueChange={(value) => handleSelectChange("issueType", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foodOrdered">Food Ordered</Label>
                    <Input
                      id="foodOrdered"
                      name="foodOrdered"
                      value={formData.foodOrdered}
                      onChange={handleInputChange}
                      placeholder="What food did you order?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incidentDate">Date of Incident</Label>
                    <Input
                      id="incidentDate"
                      name="incidentDate"
                      type="date"
                      value={formData.incidentDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incidentTime">Time of Incident</Label>
                    <Input
                      id="incidentTime"
                      name="incidentTime"
                      type="time"
                      value={formData.incidentTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Complaint Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please provide a detailed description of your complaint..."
                  rows={6}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Submitting Complaint..." : "Submit Food Complaint"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
