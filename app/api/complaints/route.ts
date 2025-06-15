import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/firebase"
import { ref, push, set } from "firebase/database"

export async function POST(request: NextRequest) {
  try {
    const complaintData = await request.json()

    // Generate complaint ID
    const complaintsRef = ref(database, "complaints")
    const newComplaintRef = push(complaintsRef)
    const complaintId = newComplaintRef.key

    // Add complaint ID to data
    const complaintWithId = {
      ...complaintData,
      id: complaintId,
      createdAt: new Date().toISOString(),
    }

    // Save to Firebase
    await set(newComplaintRef, complaintWithId)

    // If user is logged in, also save to user's complaints
    if (complaintData.userId) {
      const userComplaintRef = ref(database, `users/${complaintData.userId}/complaints/${complaintId}`)
      await set(userComplaintRef, complaintWithId)
    }

    // Send confirmation email with fallback
    if (complaintData.email) {
      try {
        const { sendComplaintConfirmation } = await import("@/lib/email")
        const result = await sendComplaintConfirmation(complaintData.email, complaintWithId)

        if (!result.success) {
          // Try mock service as fallback
          const { mockSendComplaintConfirmation } = await import("@/lib/mock-email")
          await mockSendComplaintConfirmation(complaintData.email, complaintWithId)
        }
      } catch (emailError) {
        console.log("Email sending failed, but complaint was saved:", emailError)
        // Don't fail the entire request if email fails
      }
    }

    return NextResponse.json({ success: true, complaintId })
  } catch (error) {
    console.error("Complaint submission error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit complaint" }, { status: 500 })
  }
}
