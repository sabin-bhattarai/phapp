import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ---- Booking types ----
export interface BookingData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  checkinDate: string;
  checkoutDate: string;
  nights: number;
  guests: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "refunded";
  bookingStatus: "pending" | "confirmed" | "cancelled" | "checkedIn";
  specialRequests?: string;
  createdAt?: Timestamp;
}

// ---- Create booking ----
export async function createBooking(data: Omit<BookingData, "createdAt">) {
  const docRef = await addDoc(collection(db, "bookings"), {
    ...data,
    bookingStatus: "pending",
    paymentStatus: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// ---- Get all bookings (admin) ----
export async function getAllBookings() {
  const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BookingData & { id: string }));
}

// ---- Get bookings by email ----
export async function getBookingsByEmail(email: string) {
  const q = query(collection(db, "bookings"), where("guestEmail", "==", email), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BookingData & { id: string }));
}

// ---- Update booking status ----
export async function updateBookingStatus(
  bookingId: string,
  status: BookingData["bookingStatus"]
) {
  await updateDoc(doc(db, "bookings", bookingId), { bookingStatus: status });
}

// ---- Check availability ----
export async function checkRoomAvailability(
  roomId: string,
  checkin: string,
  checkout: string
): Promise<boolean> {
  const q = query(
    collection(db, "bookings"),
    where("roomId", "==", roomId),
    where("bookingStatus", "in", ["pending", "confirmed", "checkedIn"])
  );
  const snap = await getDocs(q);
  const requestedIn = new Date(checkin);
  const requestedOut = new Date(checkout);

  for (const d of snap.docs) {
    const b = d.data() as BookingData;
    const existIn = new Date(b.checkinDate);
    const existOut = new Date(b.checkoutDate);
    // Overlap check
    if (requestedIn < existOut && requestedOut > existIn) return false;
  }
  return true;
}

// ---- Room Pricing ----
export async function getRoomPricing(roomId: string) {
  const snap = await getDoc(doc(db, "rooms", roomId));
  return snap.exists() ? snap.data() : null;
}

export async function updateRoomPricing(
  roomId: string,
  pricePerNight: number,
  seasonalMultiplier?: number
) {
  await updateDoc(doc(db, "rooms", roomId), {
    pricePerNight,
    seasonalMultiplier: seasonalMultiplier ?? 1,
  });
}
