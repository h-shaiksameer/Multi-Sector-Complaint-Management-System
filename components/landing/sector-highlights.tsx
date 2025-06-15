"use client"

import { motion } from "framer-motion"
import { UtensilsCrossed, Heart, Building2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SectorHighlights() {
  const sectors = [
    {
      icon: UtensilsCrossed,
      title: "Food & Restaurant",
      description:
        "Report food quality issues, hygiene concerns, and service problems at restaurants and food establishments.",
      features: ["Food Quality", "Hygiene Standards", "Service Issues", "Billing Disputes"],
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      href: "/complaint/food",
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Address medical service concerns, hospital facilities, and healthcare provider issues.",
      features: ["Medical Care", "Hospital Facilities", "Staff Behavior", "Billing Issues"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      href: "/complaint/hospital",
    },
    {
      icon: Building2,
      title: "Hospitality",
      description: "Report hotel service problems, accommodation issues, and hospitality concerns.",
      features: ["Room Quality", "Service Standards", "Amenities", "Booking Issues"],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      href: "/complaint/hotel",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Complaint Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your sector to file a complaint. Our specialized teams handle each category with expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`${sector.bgColor} rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group`}
            >
              <div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${sector.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <sector.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">{sector.title}</h3>

              <p className="text-gray-600 mb-6 leading-relaxed">{sector.description}</p>

              <div className="space-y-2 mb-8">
                {sector.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={sector.href}>
                <Button
                  className={`w-full bg-gradient-to-r ${sector.color} hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                >
                  File Complaint
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
