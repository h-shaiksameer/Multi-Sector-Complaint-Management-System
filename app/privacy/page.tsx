import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, UserCheck, FileText } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number) when you register",
        "Complaint details and supporting documentation",
        "Usage data and analytics to improve our services",
        "Communication records for support purposes",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Process and resolve your complaints efficiently",
        "Send notifications about complaint status updates",
        "Improve our platform and user experience",
        "Comply with legal requirements and regulations",
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Enterprise-grade encryption for all data transmission",
        "Secure cloud storage with regular backups",
        "Access controls and authentication protocols",
        "Regular security audits and vulnerability assessments",
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access your personal data at any time",
        "Request correction of inaccurate information",
        "Delete your account and associated data",
        "Opt-out of non-essential communications",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: December 15, 2024</p>
        </div>

        {/* Introduction */}
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              ComplaintPortal ("we," "our," or "us") is committed to protecting your privacy and ensuring the security
              of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you use our complaint management platform.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <section.icon className="h-6 w-6 mr-2 text-blue-600" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">We retain your personal information only as long as necessary to:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Provide our services to you</li>
                <li>• Comply with legal obligations</li>
                <li>• Resolve disputes and enforce agreements</li>
                <li>• Improve our platform and services</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">We may use third-party services for:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Email delivery and notifications</li>
                <li>• Analytics and performance monitoring</li>
                <li>• Cloud storage and hosting</li>
                <li>• Payment processing (if applicable)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Questions About Privacy?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p>📧 Email: privacy@complaintportal.com</p>
              <p>📞 Phone: +1 (555) 123-4567</p>
              <p>📍 Address: 123 Main Street, City, State 12345</p>
            </div>
          </CardContent>
        </Card>

        {/* Updates Notice */}
        <Card className="bg-yellow-50 border-yellow-200 mt-8">
          <CardContent className="pt-6">
            <p className="text-yellow-800">
              <strong>Policy Updates:</strong> We may update this Privacy Policy from time to time. We will notify you
              of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
