"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, CheckCircle, Clock, Users } from "lucide-react"

export default function StatsSection() {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolved: 0,
    pending: 0,
    users: 0,
  })

  useEffect(() => {
    // Animate numbers on mount
    const timer = setTimeout(() => {
      setStats({
        totalComplaints: 422,
        resolved: 420,
        pending: 2,
        users: 422,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const statItems = [
    {
      icon: TrendingUp,
      label: "Total Complaints",
      value: stats.totalComplaints,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: CheckCircle,
      label: "Resolved",
      value: stats.resolved,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Clock,
      label: "Pending",
      value: stats.pending,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: Users,
      label: "Active Users",
      value: stats.users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Platform Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time statistics showing our commitment to resolving public concerns across multiple sectors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`inline-flex p-4 rounded-2xl ${item.bgColor} mb-6`}>
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{item.value.toLocaleString()}</h3>
                <p className="text-gray-600 font-medium">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
