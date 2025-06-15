// Alternative email service using fetch API
export const sendEmailViaAPI = async (to: string, subject: string, html: string) => {
  try {
    // Using a simple email service or you can implement your own email API
    console.log(`Email would be sent to: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log(`HTML: ${html}`)

    // For now, we'll just log the email content
    // In production, you would integrate with an email service like SendGrid, Mailgun, etc.
    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error }
  }
}

export const sendOTPEmailSimple = async (email: string, otp: string) => {
  const subject = "Verify Your Email - ComplaintPortal"
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1>Verify Your Email</h1>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    </div>
  `

  return sendEmailViaAPI(email, subject, html)
}

export const sendComplaintConfirmationSimple = async (email: string, complaintData: any) => {
  const subject = "Complaint Confirmation - ComplaintPortal"
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1>Complaint Received</h1>
      <p>Your ${complaintData.type} complaint has been submitted successfully.</p>
      <p>Status: ${complaintData.status}</p>
      <p>Submitted: ${complaintData.submittedAt}</p>
    </div>
  `

  return sendEmailViaAPI(email, subject, html)
}
