"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
  {
    name: "Anjali Reddy",
    role: "Restaurant Customer - Banjara Hills, Hyderabad",
    content:
      "I raised a complaint about stale food and got it resolved the same day. The support was quick and helpful.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Dr. Faheem Khan",
    role: "Healthcare Professional - Mehdipatnam, Hyderabad",
    content:
      "Patients now have a voice with this platform. It makes hospital feedback management smooth and transparent.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Kavitha Sharma",
    role: "Hotel Guest - Gachibowli, Hyderabad",
    content:
      "Faced an issue with hotel cleanliness. Filed a complaint and the response was timely and professional.",
    rating: 4,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Ramesh Yadav",
    role: "Food Inspector - Charminar, Hyderabad",
    content:
      "This system empowers both customers and inspectors. It’s a great way to ensure better standards in service sectors.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
  }

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What People Say</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Real experiences from users who have used our platform to resolve their concerns
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20"
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < testimonials[currentIndex].rating ? "text-yellow-400 fill-current" : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full border-2 border-white/30"
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-blue-200">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="border-white/30 text-white hover:bg-white/10 rounded-full p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="border-white/30 text-white hover:bg-white/10 rounded-full p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
