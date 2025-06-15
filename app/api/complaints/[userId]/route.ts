import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/firebase"
import { ref, get } from "firebase/database"

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params

    // Get user's complaints from Firebase
    const userComplaintsRef = ref(database, `users/${userId}/complaints`)
    const snapshot = await get(userComplaintsRef)

    if (!snapshot.exists()) {
      return NextResponse.json({ success: true, complaints: [] })
    }

    const complaintsData = snapshot.val()
    const complaints = Object.values(complaintsData)

    return NextResponse.json({ success: true, complaints })
  } catch (error) {
    console.error("Get complaints error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch complaints" }, { status: 500 })
  }
}
