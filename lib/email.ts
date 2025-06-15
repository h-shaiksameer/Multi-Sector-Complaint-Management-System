import nodemailer from "nodemailer"

// Create transporter with better error handling
const createEmailTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "toufeeq0256a@gmail.com",
        pass: process.env.EMAIL_PASS || "ksbv prnn pmbt tbia",
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  } catch (error) {
    console.error("Failed to create email transporter:", error)
    return null
  }
}

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = createEmailTransporter()

    if (!transporter) {
      throw new Error("Email transporter not available")
    }

    // Verify transporter configuration
    await transporter.verify()

    await transporter.sendMail({
      from: process.env.EMAIL_USER || "toufeeq0256a@gmail.com",
      to,
      subject,
      html,
    })

    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export const sendOTPEmail = async (email: string, otp: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email</h1>
      </div>
      <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; margin-bottom: 20px;">Your OTP Code</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Thank you for registering with ComplaintPortal. Please use the following OTP to verify your email address:
        </p>
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 4px;">${otp}</span>
        </div>
        <p style="color: #666; font-size: 14px;">
          This OTP will expire in 10 minutes. If you didn't request this, please ignore this email.
        </p>
      </div>
    </div>
  `

  return sendMail(email, "Verify Your Email - ComplaintPortal", html)
}

export const sendComplaintConfirmation = async (email: string, complaintData: any) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Complaint Received</h1>
      </div>
      <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; margin-bottom: 20px;">Thank you for your complaint</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Your complaint has been successfully submitted and is being reviewed by our team.
        </p>
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Complaint Details:</h3>
          <p><strong>Type:</strong> ${complaintData.type}</p>
          <p><strong>Status:</strong> ${complaintData.status}</p>
          <p><strong>Submitted:</strong> ${complaintData.submittedAt}</p>
        </div>
        <p style="color: #666; font-size: 14px;">
          You will receive updates on your complaint status via email. You can also track your complaint in your dashboard.
        </p>
      </div>
    </div>
  `

  return sendMail(email, "Complaint Confirmation - ComplaintPortal", html)
}
