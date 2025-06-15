import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Target, Award, Heart, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Your data is protected with enterprise-grade security and encryption.",
    },
    {
      icon: Users,
      title: "Multi-Sector Support",
      description: "Comprehensive complaint handling for Food, Healthcare, and Hospitality sectors.",
    },
    {
      icon: Target,
      title: "Quick Resolution",
      description: "AI-powered complaint routing ensures faster resolution times.",
    },
    {
      icon: Award,
      title: "Transparent Process",
      description: "Track your complaint status in real-time with complete transparency.",
    },
  ]

  const stats = [
    { number: "15,000+", label: "Complaints Resolved" },
    { number: "8,500+", label: "Active Users" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About ComplaintPortal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing how public complaints are handled across multiple sectors, ensuring your voice is
            heard and your concerns are addressed with the urgency they deserve.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                To create a transparent, efficient, and user-friendly platform that bridges the gap between consumers
                and service providers across Food, Healthcare, and Hospitality sectors. We believe every complaint
                deserves attention, and every resolution should be swift and satisfactory.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-2xl font-semibold">Empathy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  We understand that behind every complaint is a person seeking resolution. We approach each case with
                  genuine care and understanding.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
              <CardHeader className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl font-semibold">Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  We maintain the highest standards of honesty and transparency in all our processes, ensuring fair and
                  unbiased complaint resolution.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-2xl font-semibold">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  We continuously strive to improve our platform and services, setting new standards for complaint
                  management systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Commitment</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            ComplaintPortal is more than just a platform—it's a commitment to better public services. We work tirelessly
            to ensure that every complaint is handled with the attention it deserves, fostering better relationships
            between consumers and service providers across all sectors.
          </p>
        </div>
      </section>
    </div>
  )
}
