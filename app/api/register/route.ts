import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/firebase"
import { ref, set, push } from "firebase/database"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json()

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user data
    const userData = {
      name,
      email,
      phone,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      complaints: {},
    }

    // Save to Firebase
    const usersRef = ref(database, "users")
    const newUserRef = push(usersRef)
    await set(newUserRef, userData)

    return NextResponse.json({ success: true, userId: newUserRef.key })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, error: "Failed to create account" }, { status: 500 })
  }
}
