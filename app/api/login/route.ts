import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Get all users from Firebase
    const usersRef = ref(database, "users")
    const snapshot = await get(usersRef)

    if (!snapshot.exists()) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    const users = snapshot.val()
    let foundUser = null
    let userId = null

    // Find user by email
    for (const [id, userData] of Object.entries(users)) {
      if ((userData as any).email === email) {
        foundUser = userData
        userId = id
        break
      }
    }

    if (!foundUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, (foundUser as any).password)

    if (!isValidPassword) {
      return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = foundUser as any

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        ...userWithoutPassword,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
