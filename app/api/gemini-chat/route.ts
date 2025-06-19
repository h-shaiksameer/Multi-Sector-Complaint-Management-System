import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "AIzaSyDS6JVe6c4ZShHRTsPS4vZt-npO5KTU_o4"
const genAI = new GoogleGenerativeAI(API_KEY)
const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" })

const cleanResponse = (text: string) => {
  return text
    .replace(/[*#!]/g, "") // Remove **, ##, !
    .replace(/[\u{1F600}-\u{1F6FF}]/gu, "") // Remove emojis
}

const getGeminiResponse = async (message: string) => {
  try {
    const chat = geminiModel.startChat()
    const response = await chat.sendMessage(message)
    return cleanResponse(response.response.text())
  } catch (error) {
    console.error("Gemini API Error:", error)
    return "Sorry, I couldn't fetch a response at the moment."
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, userId } = await request.json()

    let userComplaintsData = ""

    // Fetch user's complaints if userId is provided
    if (userId) {
      try {
        const { database } = await import("@/lib/firebase")
        const { ref, get } = await import("firebase/database")

        const userComplaintsRef = ref(database, `users/${userId}/complaints`)
        const snapshot = await get(userComplaintsRef)

        if (snapshot.exists()) {
          const complaints = Object.values(snapshot.val())

          userComplaintsData = `
USER'S COMPLAINT DATA:
Total Complaints: ${complaints.length}

Complaint Details:
${complaints
  .map(
    (complaint: any, index: number) => `
${index + 1}. Type: ${complaint.type}
   Status: ${complaint.status}
   Submitted: ${complaint.submittedAt}
   Description: ${complaint.description}
   ${complaint.businessName ? `Business: ${complaint.businessName}` : ""}
   ${complaint.location ? `Location: ${complaint.location}` : ""}
   ${complaint.priority ? `Priority: ${complaint.priority}` : ""}
`,
  )
  .join("")}

COMPLAINT STATISTICS:
- Pending: ${complaints.filter((c: any) => c.status === "Pending").length}
- In Progress: ${complaints.filter((c: any) => c.status === "In Progress").length}
- Resolved: ${complaints.filter((c: any) => c.status === "Resolved").length}
- Rejected: ${complaints.filter((c: any) => c.status === "Rejected").length}
`
        } else {
          userComplaintsData = "USER'S COMPLAINT DATA: No complaints found for this user."
        }
      } catch (dbError) {
        console.error("Database error:", dbError)
        userComplaintsData = "USER'S COMPLAINT DATA: Unable to fetch complaint data at the moment."
      }
    }

    const fullPrompt = `You are a helpful complaint support assistant for ComplaintPortal, a multi-sector complaint management system that handles Food, Healthcare, and Hotel complaints.

${userComplaintsData}

Your role is to:
1. Answer questions about the user's specific complaints using the data above
2. Provide complaint resolution timeframes (typically 2 business days for most complaints)
3. Help track complaint status and provide updates
4. Explain complaint details and descriptions
5. Provide statistics about their complaints
6. Maintain a professional, empathetic, and helpful tone
7. Use the actual complaint data to give specific, personalized answers

IMPORTANT: Use the user's actual complaint data above to answer their questions. Be specific about their complaints, dates, statuses, and details.

User message: ${message}

Please provide a helpful, specific response using the user's actual complaint data. If they ask about resolution time, mention that most complaints are resolved within 2 business days, but complex cases may take longer.`

    const botResponse = await getGeminiResponse(fullPrompt)

    return NextResponse.json({ response: botResponse })
  } catch (error) {
    console.error("Gemini API error:", error)
    return NextResponse.json(
      {
        response:
          "I apologize, but I'm having trouble accessing your complaint data right now. Please try again later or contact our support team for assistance with your specific complaints.",
      },
      { status: 500 },
    )
  }
}
