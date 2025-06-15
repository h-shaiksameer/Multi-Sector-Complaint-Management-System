import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    console.log(`Attempting to send OTP to: ${email}`)

    // Try real email service first
    try {
      const { sendOTPEmail } = await import("@/lib/email")
      const result = await sendOTPEmail(email, otp)

      if (result.success) {
        console.log("OTP email sent successfully via real email service")
        return NextResponse.json({ success: true, method: "email" })
      } else {
        throw new Error(result.error || "Email service failed")
      }
    } catch (emailError) {
      console.warn("Real email service failed, using mock service:", emailError)

      // Fallback to mock email service
      try {
        const { mockSendOTPEmail } = await import("@/lib/mock-email")
        await mockSendOTPEmail(email, otp)

        console.log("OTP sent successfully via mock email service")
        return NextResponse.json({
          success: true,
          method: "mock",
          message: "OTP sent via mock service (check console logs)",
        })
      } catch (mockError) {
        console.error("Mock email service also failed:", mockError)
        throw mockError
      }
    }
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send OTP. Please try again.",
      },
      { status: 500 },
    )
  }
}
