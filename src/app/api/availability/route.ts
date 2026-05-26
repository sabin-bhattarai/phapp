import { NextRequest, NextResponse } from "next/server";

// GET /api/availability?roomId=xxx&checkin=YYYY-MM-DD&checkout=YYYY-MM-DD
export async function GET(req: NextRequest) {
  const roomId = req.nextUrl.searchParams.get("roomId");
  const checkin = req.nextUrl.searchParams.get("checkin");
  const checkout = req.nextUrl.searchParams.get("checkout");

  if (!roomId || !checkin || !checkout) {
    return NextResponse.json(
      { error: "roomId, checkin, and checkout are required" },
      { status: 400 }
    );
  }

  // In production: const available = await checkRoomAvailability(roomId, checkin, checkout);
  const available = true;

  return NextResponse.json({ available, roomId, checkin, checkout });
}
