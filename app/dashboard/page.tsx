"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UtensilsCrossed, Heart, Building2, Plus, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [complaints, setComplaints] = useState<any[]>([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  })
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

    // Load user complaints
    loadUserComplaints(parsedUser.id)
  }, [router])

  const loadUserComplaints = async (userId: string) => {
    try {
      const response = await fetch(`/api/complaints/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setComplaints(data.complaints || [])
        calculateStats(data.complaints || [])
      }
    } catch (error) {
      console.error("Failed to load complaints:", error)
    }
  }

  const calculateStats = (complaintsData: any[]) => {
    const stats = {
      total: complaintsData.length,
      pending: complaintsData.filter((c) => c.status === "Pending").length,
      inProgress: complaintsData.filter((c) => c.status === "In Progress").length,
      resolved: complaintsData.filter((c) => c.status === "Resolved").length,
      rejected: complaintsData.filter((c) => c.status === "Rejected").length,
    }
    setStats(stats)
  }

  const pieData = [
    { name: "Pending", value: stats.pending, color: "#f59e0b" },
    { name: "In Progress", value: stats.inProgress, color: "#3b82f6" },
    { name: "Resolved", value: stats.resolved, color: "#10b981" },
    { name: "Rejected", value: stats.rejected, color: "#ef4444" },
  ]

  const barData = [
    { name: "Food", complaints: complaints.filter((c) => c.type === "Food").length },
    { name: "Hospital", complaints: complaints.filter((c) => c.type === "Hospital").length },
    { name: "Hotel", complaints: complaints.filter((c) => c.type === "Hotel").length },
  ]

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
      Resolved: "bg-green-100 text-green-800 border-green-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 text-lg">Manage your complaints and track their progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Complaint Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Complaints by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="complaints" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
          <CardHeader>
            <CardTitle>File New Complaint</CardTitle>
            <CardDescription>Choose a category to file your complaint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/complaint/food">
                <Button className="w-full h-20 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                  <div className="flex flex-col items-center space-y-2">
                    <UtensilsCrossed className="h-6 w-6" />
                    <span>Food Complaint</span>
                  </div>
                </Button>
              </Link>

              <Link href="/complaint/hospital">
                <Button className="w-full h-20 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                  <div className="flex flex-col items-center space-y-2">
                    <Heart className="h-6 w-6" />
                    <span>Hospital Complaint</span>
                  </div>
                </Button>
              </Link>

              <Link href="/complaint/hotel">
                <Button className="w-full h-20 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <div className="flex flex-col items-center space-y-2">
                    <Building2 className="h-6 w-6" />
                    <span>Hotel Complaint</span>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Complaints */}
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
            <CardDescription>Your latest complaint submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {complaints.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No complaints filed yet</p>
                <Link href="/complaint/food">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    File Your First Complaint
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {complaints.slice(0, 5).map((complaint, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{complaint.title || `${complaint.type} Complaint`}</h4>
                      <p className="text-sm text-gray-600">{complaint.description?.substring(0, 100)}...</p>
                      <p className="text-xs text-gray-500 mt-1">{complaint.submittedAt}</p>
                    </div>
                    <Badge className={getStatusBadge(complaint.status)}>{complaint.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
