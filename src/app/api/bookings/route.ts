import { NextRequest, NextResponse } from "next/server";

// POST /api/bookings — create a new booking
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      guestName,
      guestEmail,
      guestPhone,
      roomId,
      roomName,
      checkinDate,
      checkoutDate,
      nights,
      guests,
      totalAmount,
      paymentMethod,
      specialRequests,
    } = body;

    // Basic validation
    if (!guestName || !guestEmail || !roomId || !checkinDate || !checkoutDate) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    // In production: call createBooking() from firestore.ts
    // const bookingId = await createBooking({ ... });

    // Mock response for now
    const bookingId = `BK${Date.now()}`;

    return NextResponse.json(
      {
        success: true,
        bookingId,
        message: "Booking created successfully. Confirmation sent to " + guestEmail,
        data: {
          bookingId,
          guestName,
          roomName,
          checkinDate,
          checkoutDate,
          totalAmount,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Booking creation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/bookings?email=xxx — get bookings for a guest
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "email param required" }, { status: 400 });
  }

  // In production: return await getBookingsByEmail(email);
  return NextResponse.json({ bookings: [] });
}
