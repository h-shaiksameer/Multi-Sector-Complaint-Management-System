"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Phone, MapPin, Calendar, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [complaints, setComplaints] = useState<any[]>([])
  const [filteredComplaints, setFilteredComplaints] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [filter, setFilter] = useState("all")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    loadUserComplaints(parsedUser.id)
  }, [router])

  useEffect(() => {
    // Filter complaints based on selected filter
    if (filter === "all") {
      setFilteredComplaints(complaints)
    } else {
      setFilteredComplaints(complaints.filter((complaint) => complaint.status === filter))
    }
  }, [complaints, filter])

  const loadUserComplaints = async (userId: string) => {
    try {
      const response = await fetch(`/api/complaints/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setComplaints(data.complaints || [])
      }
    } catch (error) {
      console.error("Failed to load complaints:", error)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    // Profile update logic would go here
    toast({
      title: "Success",
      description: "Profile updated successfully!",
    })
    setIsEditing(false)
  }

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
      Resolved: "bg-green-100 text-green-800 border-green-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Food: "text-orange-600",
      Hospital: "text-blue-600",
      Hotel: "text-purple-600",
    }
    return colors[type] || "text-gray-600"
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your account and track your complaints</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="complaints">My Complaints</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <User className="h-6 w-6 mr-2 text-blue-600" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          value={user.name}
                          disabled={!isEditing}
                          className="pl-10"
                          onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          disabled={!isEditing}
                          className="pl-10"
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={user.phone}
                          disabled={!isEditing}
                          className="pl-10"
                          onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="joinDate">Member Since</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="joinDate"
                          value={new Date(user.createdAt).toLocaleDateString()}
                          disabled
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {isEditing ? (
                      <>
                        <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
                          Save Changes
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button type="button" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints">
            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">My Complaints</CardTitle>
                <CardDescription>Track and manage all your submitted complaints</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                    All ({complaints.length})
                  </Button>
                  <Button
                    variant={filter === "Pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("Pending")}
                  >
                    Pending ({complaints.filter((c) => c.status === "Pending").length})
                  </Button>
                  <Button
                    variant={filter === "In Progress" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("In Progress")}
                  >
                    In Progress ({complaints.filter((c) => c.status === "In Progress").length})
                  </Button>
                  <Button
                    variant={filter === "Resolved" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("Resolved")}
                  >
                    Resolved ({complaints.filter((c) => c.status === "Resolved").length})
                  </Button>
                </div>

                {/* Complaints List */}
                {filteredComplaints.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">
                      {filter === "all" ? "No complaints found" : `No ${filter.toLowerCase()} complaints`}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredComplaints.map((complaint, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className={`font-semibold text-lg ${getTypeColor(complaint.type)}`}>
                                {complaint.type} Complaint
                              </h3>
                              <Badge className={getStatusBadge(complaint.status)}>{complaint.status}</Badge>
                            </div>
                            <p className="text-gray-600 mb-2">
                              {complaint.description?.substring(0, 150)}
                              {complaint.description?.length > 150 && "..."}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {complaint.submittedAt}
                              </span>
                              {complaint.restaurantName && (
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {complaint.restaurantName}
                                </span>
                              )}
                              {complaint.hospitalName && (
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {complaint.hospitalName}
                                </span>
                              )}
                              {complaint.hotelName && (
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {complaint.hotelName}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
