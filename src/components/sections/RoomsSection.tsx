"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Users, Maximize2, ArrowRight, Star, Check, X } from "lucide-react";
import { rooms, type Room } from "@/data/rooms";
import SectionHeader from "@/components/ui/SectionHeader";

function RoomCard({ room, index }: { room: Room; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setShowModal(false);
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <div style={{ perspective: 1200 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            delay: index * 0.12,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="group relative rounded-3xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-shadow duration-500 cursor-pointer"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onClick={() => setShowModal(true)}
        >
        {/* Image area */}
        <div className="relative h-64 overflow-hidden">
          {/* Placeholder with gradient — replace with actual images */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${room.gradient} transition-transform duration-700 group-hover:scale-105`}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
                <path d="M40 8L10 28v40h60V28L40 8z" fill="white" />
                <path d="M30 68V48h20v20" fill="rgba(0,0,0,0.3)" />
                <path d="M40 8L10 28h60L40 8z" fill="rgba(255,255,255,0.4)" />
              </svg>
            </div>
          </div>

          {/* Overlay on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute inset-0 bg-dark/30 flex items-center justify-center"
          >
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-dark font-semibold text-sm">
              View Details <ArrowRight size={15} />
            </div>
          </motion.div>

          {/* Badge */}
          {room.badge && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-leaf text-white text-xs font-bold tracking-wide">
              {room.badge}
            </div>
          )}

          {/* Type tag */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass text-white/90 text-xs font-medium">
            {room.type}
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark/70 to-transparent" />

          {/* Price on image */}
          <div className="absolute bottom-4 left-4">
            <span className="text-white/70 text-xs">From</span>
            <div className="text-white font-bold text-xl">
              NPR {room.pricePerNight.toLocaleString()}
              <span className="text-sm font-normal opacity-70">/night</span>
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-dark text-lg leading-tight">{room.name}</h3>
              <p className="font-nepali text-forest/60 text-sm">{room.nepaliName}</p>
            </div>
            <div className="flex items-center gap-1 bg-leaf/10 px-2.5 py-1 rounded-full">
              <Star size={12} className="text-leaf fill-leaf" />
              <span className="text-xs font-semibold text-forest">4.9</span>
            </div>
          </div>

          <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
            {room.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted mb-4">
            <span className="flex items-center gap-1.5">
              <Users size={13} className="text-forest" />
              Up to {room.capacity} guests
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize2 size={13} className="text-forest" />
              {room.size}
            </span>
          </div>

          {/* Amenity pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {room.amenities.slice(0, 4).map(({ icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-forest/5 text-forest/70 border border-forest/10"
              >
                <span>{icon}</span>
                {label}
              </span>
            ))}
            {room.amenities.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-beige/50 text-muted border border-beige">
                +{room.amenities.length - 4} more
              </span>
            )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); scrollToBooking(); }}
            className="w-full py-3 bg-forest text-white rounded-xl font-semibold text-sm hover:bg-leaf hover:text-dark transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            Book This Room
            <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-luxury-lg"
            >
              {/* Modal image */}
              <div className={`h-56 bg-gradient-to-br ${room.gradient} relative`}>
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                  <X size={16} />
                </button>
                {room.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-leaf text-white text-xs font-bold">
                    {room.badge}
                  </div>
                )}
                <div className="absolute bottom-4 left-5">
                  <div className="text-white font-bold text-2xl">
                    NPR {room.pricePerNight.toLocaleString()}
                    <span className="text-sm font-normal opacity-70"> / night</span>
                  </div>
                </div>
              </div>

              {/* Modal content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-dark mb-1">{room.name}</h2>
                <p className="font-nepali text-forest/60 mb-4">{room.nepaliName}</p>
                <p className="text-muted leading-relaxed mb-5">{room.description}</p>

                <h4 className="font-semibold text-dark mb-3">All Amenities</h4>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {room.amenities.map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm text-muted">
                      <Check size={14} className="text-leaf flex-shrink-0" />
                      <span>{icon} {label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={scrollToBooking}
                    className="flex-1 py-3.5 bg-forest text-white rounded-xl font-semibold hover:bg-leaf hover:text-dark transition-all"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3.5 border border-forest/20 text-dark rounded-xl font-semibold hover:border-forest hover:text-forest transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function RoomsSection() {
  return (
    <section id="rooms" className="section-padding bg-eco-gradient relative overflow-hidden">
      <div className="ambient-glow w-[500px] h-[500px] bg-leaf top-0 right-0 translate-x-1/3 -translate-y-1/3" />

      <div className="container-custom">
        <div className="mb-14">
          <SectionHeader
            badge="Our Accommodations"
            title="Stay in"
            titleHighlight="Comfort & Style"
            subtitle="Each room is thoughtfully crafted to offer an immersive Nepali experience — blending modern comforts with authentic mountain character."
            nepali="हाम्रा कोठाहरू — आरामदायक र परम्परागत"
          />
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted text-sm mb-4">
            All rooms include complimentary breakfast, free WiFi, and personalized local guidance.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("booking");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-forest font-semibold hover:text-leaf transition-colors group"
          >
            Check Availability
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
