import { type NextRequest, NextResponse } from "next/server"
import { getFallbackResponse } from "@/lib/gemini-fallback"

const GEMINI_API_KEY = "AIzaSyDS6JVe6c4ZShHRTsPS4vZt-npO5KTU_o4"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ response: "Please provide a valid message." }, { status: 400 })
    }

    // Try Gemini API first
    try {
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are a helpful complaint support assistant for ComplaintPortal, a multi-sector complaint management system that handles Food, Healthcare, and Hotel complaints. 

Your role is to:
1. Help users understand the complaint process
2. Provide information about complaint status tracking
3. Explain how to file complaints in different sectors (Food, Healthcare, Hotel)
4. Offer general support and guidance
5. Maintain a professional, empathetic, and helpful tone
6. Keep responses concise and actionable

User message: "${message}"

Please provide a helpful, concise response (maximum 150 words) that addresses their query while staying within your role as a complaint support assistant.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (response.ok) {
        const data = await response.json()

        if (data.candidates && data.candidates.length > 0) {
          const candidate = data.candidates[0]

          if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
            const botResponse = candidate.content.parts[0].text
            return NextResponse.json({ response: botResponse, source: "gemini" })
          } else if (candidate.finishReason === "SAFETY") {
            return NextResponse.json({
              response:
                "I apologize, but I cannot provide a response to that message. Please try rephrasing your question about complaint management.",
              source: "gemini-safety",
            })
          }
        }
      }

      // If we get here, Gemini didn't work properly
      throw new Error("Gemini API response was invalid")
    } catch (geminiError) {
      console.log("Gemini API failed, using fallback:", geminiError)

      // Use intelligent fallback response
      const fallbackResponse = getFallbackResponse(message)

      return NextResponse.json({
        response: fallbackResponse,
        source: "fallback",
        note: "AI service temporarily unavailable - using smart fallback responses",
      })
    }
  } catch (error) {
    console.error("Chat API error:", error)

    // Final fallback
    const genericResponse = `I'm here to help with your complaint management needs! 

**Quick Links:**
• File Food complaint: /complaint/food
• File Hospital complaint: /complaint/hospital  
• File Hotel complaint: /complaint/hotel
• Track complaints: Dashboard
• Contact support: Contact page

What would you like to do today?`

    return NextResponse.json(
      {
        response: genericResponse,
        source: "generic-fallback",
      },
      { status: 200 },
    )
  }
}
