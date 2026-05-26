"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  CreditCard,
  Check,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Building,
  Banknote,
  Phone,
  Mail,
  User,
  Star,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { rooms } from "@/data/rooms";
import SectionHeader from "@/components/ui/SectionHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Step = "dates" | "room" | "guest" | "payment" | "confirm";

const STEPS: { id: Step; label: string; icon: LucideIcon }[] = [
  { id: "dates", label: "Dates", icon: Calendar },
  { id: "room", label: "Room", icon: Building },
  { id: "guest", label: "Guest Info", icon: User },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirm", label: "Confirm", icon: Check },
];

const paymentMethods = [
  { id: "esewa", label: "eSewa", icon: Smartphone, color: "#60BB46", desc: "Nepal's #1 digital wallet" },
  { id: "khalti", label: "Khalti", icon: Smartphone, color: "#5C2D91", desc: "Fast & secure payments" },
  { id: "stripe", label: "Card (Visa/MC)", icon: CreditCard, color: "#635BFF", desc: "International cards" },
  { id: "cash", label: "Cash on Arrival", icon: Banknote, color: "#006D3A", desc: "Pay when you arrive" },
];

function StepIndicator({ currentStep }: { currentStep: Step }) {
  const currentIdx = STEPS.findIndex((s) => s.id === currentStep);
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.id} className="flex items-center">
            <div className={`flex flex-col items-center gap-1.5 ${i > 0 ? "ml-2" : ""}`}>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  done
                    ? "bg-leaf text-white"
                    : active
                    ? "bg-forest text-white ring-4 ring-forest/20"
                    : "bg-forest/10 text-muted"
                }`}
              >
                {done ? <Check size={16} /> : <Icon size={16} />}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${active ? "text-forest" : done ? "text-leaf" : "text-muted"}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-8 sm:w-12 mx-1 mt-0 sm:-mt-4 transition-colors duration-300 ${i < currentIdx ? "bg-leaf" : "bg-forest/15"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function DateStep({
  data,
  onChange,
}: {
  data: { checkin: string; checkout: string; guests: number };
  onChange: (d: Partial<typeof data>) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-dark mb-2">Check-In Date</label>
          <DatePicker
            selected={data.checkin ? new Date(data.checkin) : null}
            onChange={(date: Date | null) => onChange({ checkin: date?.toISOString().split("T")[0] || "" })}
            minDate={new Date()}
            placeholderText="Select Date"
            className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none text-dark bg-white transition-all shadow-sm"
            wrapperClassName="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark mb-2">Check-Out Date</label>
          <DatePicker
            selected={data.checkout ? new Date(data.checkout) : null}
            onChange={(date: Date | null) => onChange({ checkout: date?.toISOString().split("T")[0] || "" })}
            minDate={data.checkin ? new Date(data.checkin) : new Date()}
            placeholderText="Select Date"
            className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none text-dark bg-white transition-all shadow-sm"
            wrapperClassName="w-full"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-dark mb-2">
          Number of Guests
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onChange({ guests: Math.max(1, data.guests - 1) })}
            className="w-10 h-10 rounded-full border-2 border-forest/20 flex items-center justify-center text-forest hover:bg-forest/10 transition-colors font-bold text-lg"
          >
            −
          </button>
          <span className="text-2xl font-bold text-dark w-8 text-center">{data.guests}</span>
          <button
            onClick={() => onChange({ guests: Math.min(6, data.guests + 1) })}
            className="w-10 h-10 rounded-full border-2 border-forest/20 flex items-center justify-center text-forest hover:bg-forest/10 transition-colors font-bold text-lg"
          >
            +
          </button>
          <div className="flex items-center gap-1 text-muted text-sm ml-2">
            <Users size={15} /> guests
          </div>
        </div>
      </div>

      {data.checkin && data.checkout && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-forest/5 border border-forest/15 flex items-center justify-between"
        >
          <div className="text-sm text-muted">
            {(() => {
              const nights = Math.ceil(
                (new Date(data.checkout).getTime() - new Date(data.checkin).getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              return nights > 0 ? `${nights} night${nights > 1 ? "s" : ""} selected` : "Please select valid dates";
            })()}
          </div>
          <span className="text-xs px-2.5 py-1 bg-leaf/10 text-forest rounded-full font-medium">
            Availability confirmed
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

function RoomStep({
  selectedRoom,
  onSelect,
}: {
  selectedRoom: string;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-3"
    >
      {rooms.map((room) => (
        <motion.div
          key={room.id}
          whileHover={{ scale: 1.01 }}
          onClick={() => onSelect(room.id)}
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
            selectedRoom === room.id
              ? "border-forest bg-forest/5"
              : "border-forest/10 bg-white hover:border-forest/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${room.gradient} flex-shrink-0`}
              />
              <div>
                <div className="font-bold text-dark">{room.name}</div>
                <div className="font-nepali text-forest/60 text-xs">{room.nepaliName}</div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                  <span className="flex items-center gap-1"><Users size={11} /> {room.capacity} guests</span>
                  <span>{room.size}</span>
                  {room.badge && (
                    <span className="px-2 py-0.5 bg-leaf/10 text-forest rounded-full font-semibold">{room.badge}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-dark">
                NPR {room.pricePerNight.toLocaleString()}
              </div>
              <div className="text-xs text-muted">per night</div>
              <div className="flex items-center justify-end gap-0.5 mt-1">
                <Star size={10} className="text-leaf fill-leaf" />
                <span className="text-xs text-muted">4.9</span>
              </div>
            </div>
          </div>
          {selectedRoom === room.id && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-forest rounded-full flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

function GuestInfoStep({
  data,
  onChange,
}: {
  data: { name: string; email: string; phone: string; message: string };
  onChange: (d: Partial<typeof data>) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-semibold text-dark mb-2">Full Name</label>
        <div className="relative">
          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Your full name"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none text-dark bg-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-dark mb-2">Email Address</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="email"
            placeholder="your@email.com"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none text-dark bg-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-dark mb-2">Phone Number</label>
        <div className="relative">
          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="tel"
            placeholder="+977-XXXXXXXXXX"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none text-dark bg-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-dark mb-2">
          Special Requests <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Dietary needs, arrival time, special occasions..."
          value={data.message}
          onChange={(e) => onChange({ message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/10 outline-none text-dark bg-white resize-none"
        />
      </div>
    </motion.div>
  );
}

function PaymentStep({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="space-y-3"
    >
      <p className="text-sm text-muted mb-5">
        Choose your preferred payment method. All payments are secured and encrypted.
      </p>
      {paymentMethods.map((method) => {
        const Icon = method.icon;
        return (
          <motion.div
            key={method.id}
            whileHover={{ scale: 1.01 }}
            onClick={() => onSelect(method.id)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-4 ${
              selected === method.id
                ? "border-forest bg-forest/5"
                : "border-forest/10 hover:border-forest/30"
            }`}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${method.color}20`, border: `1px solid ${method.color}40` }}
            >
              <Icon size={18} style={{ color: method.color }} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-dark">{method.label}</div>
              <div className="text-xs text-muted">{method.desc}</div>
            </div>
            {selected === method.id && (
              <div className="w-5 h-5 bg-forest rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-white" />
              </div>
            )}
          </motion.div>
        );
      })}

      <div className="flex items-center gap-2 pt-4 text-xs text-muted">
        <Shield size={13} className="text-forest" />
        256-bit SSL encrypted · Your data is safe with us
      </div>
    </motion.div>
  );
}

function ConfirmationStep({
  booking,
}: {
  booking: {
    checkin: string;
    checkout: string;
    guests: number;
    roomId: string;
    name: string;
    email: string;
    paymentMethod: string;
  };
}) {
  const room = rooms.find((r) => r.id === booking.roomId);
  const nights = booking.checkin && booking.checkout
    ? Math.ceil(
        (new Date(booking.checkout).getTime() - new Date(booking.checkin).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
  const total = room ? room.pricePerNight * nights : 0;
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
    >
      {!submitted ? (
        <div className="space-y-5">
          <div className="p-5 rounded-xl bg-forest/5 border border-forest/15 space-y-3">
            <h4 className="font-bold text-dark">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Room</span>
                <span className="text-dark font-medium">{room?.name}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Check-in</span>
                <span className="text-dark font-medium">{booking.checkin}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Check-out</span>
                <span className="text-dark font-medium">{booking.checkout}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Nights</span>
                <span className="text-dark font-medium">{nights}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Guests</span>
                <span className="text-dark font-medium">{booking.guests}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Guest</span>
                <span className="text-dark font-medium">{booking.name}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Payment</span>
                <span className="text-dark font-medium capitalize">{booking.paymentMethod}</span>
              </div>
              <div className="border-t border-forest/10 pt-2 flex justify-between">
                <span className="font-bold text-dark">Total</span>
                <span className="font-bold text-forest text-lg">
                  NPR {total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-4 bg-forest text-white rounded-xl font-semibold text-base hover:bg-leaf hover:text-dark transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Check size={18} />
            Confirm Booking
          </button>

          <p className="text-xs text-center text-muted">
            By confirming, you agree to our cancellation policy. Confirmation will be sent to {booking.email}
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-leaf rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={30} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-dark mb-2">Booking Confirmed!</h3>
          <p className="text-muted mb-4">
            We&apos;re thrilled to welcome you to Pahuna Ghar.
          </p>
          <p className="font-nepali text-forest text-lg mb-4">
            तपाईंलाई हार्दिक स्वागत छ!
          </p>
          <p className="text-sm text-muted">
            A confirmation email has been sent to <strong>{booking.email}</strong>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function BookingSection() {
  const [step, setStep] = useState<Step>("dates");
  const [dates, setDates] = useState({ checkin: "", checkout: "", guests: 2 });
  const [selectedRoom, setSelectedRoom] = useState("");
  const [guestInfo, setGuestInfo] = useState({ name: "", email: "", phone: "", message: "" });
  const [paymentMethod, setPaymentMethod] = useState("esewa");

  const stepIdx = STEPS.findIndex((s) => s.id === step);

  const canAdvance = () => {
    if (step === "dates") return dates.checkin && dates.checkout;
    if (step === "room") return !!selectedRoom;
    if (step === "guest") return guestInfo.name && guestInfo.email;
    if (step === "payment") return !!paymentMethod;
    return true;
  };

  const advance = () => {
    const nextIdx = stepIdx + 1;
    if (nextIdx < STEPS.length) setStep(STEPS[nextIdx].id);
  };

  const back = () => {
    const prevIdx = stepIdx - 1;
    if (prevIdx >= 0) setStep(STEPS[prevIdx].id);
  };

  return (
    <section id="booking" className="section-padding bg-background relative overflow-hidden">
      <div className="ambient-glow w-[500px] h-[500px] bg-forest top-0 left-1/2 -translate-x-1/2 -translate-y-1/3" />

      <div className="container-custom">
        <div className="mb-12">
          <SectionHeader
            badge="Reservations"
            title="Book Your"
            titleHighlight="Stay"
            subtitle="Reserve your room in minutes. Instant confirmation, flexible cancellation."
            nepali="आफ्नो बास बुक गर्नुस्"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-luxury p-6 md:p-8"
          >
            <StepIndicator currentStep={step} />

            <AnimatePresence mode="wait">
              {step === "dates" && (
                <DateStep data={dates} onChange={(d) => setDates((p) => ({ ...p, ...d }))} />
              )}
              {step === "room" && (
                <RoomStep selectedRoom={selectedRoom} onSelect={setSelectedRoom} />
              )}
              {step === "guest" && (
                <GuestInfoStep data={guestInfo} onChange={(d) => setGuestInfo((p) => ({ ...p, ...d }))} />
              )}
              {step === "payment" && (
                <PaymentStep selected={paymentMethod} onSelect={setPaymentMethod} />
              )}
              {step === "confirm" && (
                <ConfirmationStep
                  booking={{
                    ...dates,
                    roomId: selectedRoom,
                    ...guestInfo,
                    paymentMethod,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Navigation */}
            {step !== "confirm" && (
              <div className="flex justify-between mt-8 pt-6 border-t border-forest/8">
                <button
                  onClick={back}
                  disabled={stepIdx === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-muted hover:text-dark border border-forest/15 hover:border-forest/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
                <button
                  onClick={advance}
                  disabled={!canAdvance()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest text-white font-semibold hover:bg-leaf hover:text-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {step === "payment" ? "Review Booking" : "Continue"}
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted"
          >
            {[
              "Free cancellation (48h)",
              "Instant confirmation",
              "Secure payment",
              "24/7 support",
            ].map((text) => (
              <div key={text} className="flex items-center gap-1.5">
                <Check size={13} className="text-leaf" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
