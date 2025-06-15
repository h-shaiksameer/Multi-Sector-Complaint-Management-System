// Mock email service for development/fallback
export const mockSendMail = async (to: string, subject: string, html: string) => {
  console.log("=== MOCK EMAIL SERVICE ===")
  console.log(`To: ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`HTML Content: ${html.substring(0, 200)}...`)
  console.log("=== END MOCK EMAIL ===")

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true }
}

export const mockSendOTPEmail = async (email: string, otp: string) => {
  console.log("=== SENDING OTP EMAIL ===")
  console.log(`Email: ${email}`)
  console.log(`OTP: ${otp}`)
  console.log("=== OTP EMAIL SENT ===")

  return mockSendMail(email, "Verify Your Email - ComplaintPortal", `Your OTP is: ${otp}`)
}

export const mockSendComplaintConfirmation = async (email: string, complaintData: any) => {
  console.log("=== SENDING COMPLAINT CONFIRMATION ===")
  console.log(`Email: ${email}`)
  console.log(`Complaint Type: ${complaintData.type}`)
  console.log("=== CONFIRMATION SENT ===")

  return mockSendMail(
    email,
    "Complaint Confirmation - ComplaintPortal",
    `Your ${complaintData.type} complaint has been received.`,
  )
}
