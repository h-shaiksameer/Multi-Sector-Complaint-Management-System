// Fallback responses for when Gemini API is unavailable
export const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("file") || lowerMessage.includes("submit") || lowerMessage.includes("complaint")) {
    return `To file a complaint, follow these steps:

1. **Choose your sector:**
   • Food complaints: /complaint/food
   • Hospital complaints: /complaint/hospital  
   • Hotel complaints: /complaint/hotel

2. **Fill out the form** with detailed information
3. **Submit and track** your complaint in the dashboard

Would you like me to guide you to a specific complaint form?`
  }

  if (lowerMessage.includes("track") || lowerMessage.includes("status") || lowerMessage.includes("dashboard")) {
    return `To track your complaints:

1. **Login** to your account
2. **Visit your Dashboard** to see all complaints
3. **Check status updates** - we'll also email you updates
4. **View details** by clicking on any complaint

Your dashboard shows real-time status updates for all your submitted complaints.`
  }

  if (lowerMessage.includes("type") || lowerMessage.includes("category") || lowerMessage.includes("sector")) {
    return `We handle complaints in three main sectors:

🍽️ **Food & Restaurant**
- Food quality issues
- Hygiene concerns  
- Service problems
- Billing disputes

🏥 **Healthcare**
- Medical service concerns
- Hospital facilities
- Staff behavior
- Treatment quality

🏨 **Hotel & Hospitality**
- Room quality issues
- Service standards
- Amenities problems
- Booking issues

Which sector would you like to file a complaint for?`
  }

  if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("contact")) {
    return `I'm here to help! Here are your options:

**Quick Actions:**
• File a new complaint
• Track existing complaints  
• Contact our support team

**Need Human Support?**
Visit our Contact page or email support@complaintportal.com

**Common Questions:**
• How to file complaints
• Complaint status tracking
• Account management

What specific help do you need today?`
  }

  // Default response
  return `I'm here to help with your complaint management needs! I can assist you with:

• **Filing complaints** in Food, Healthcare, or Hotel sectors
• **Tracking complaint status** and updates
• **Understanding the process** and timelines
• **General support** and guidance

What would you like to know about our complaint management system?`
}
