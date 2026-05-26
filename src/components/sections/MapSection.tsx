"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Phone, Mail, Clock, Car, Bus, Plane } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const LAT = 27.8734405;
const LNG = 83.537326;

const nearbyAttractions = [
  { name: "Tansen Durbar", distance: "1.2 km", time: "4 min drive", icon: "🏛️" },
  { name: "Rani Mahal", distance: "8 km", time: "20 min drive", icon: "🕌" },
  { name: "Srinagar Hill", distance: "3.5 km", time: "10 min drive", icon: "⛰️" },
  { name: "Bhairab Temple", distance: "0.8 km", time: "2 min drive", icon: "🛕" },
  { name: "Amar Narayan Temple", distance: "1.5 km", time: "5 min drive", icon: "⛩️" },
  { name: "Palpa Museum", distance: "2 km", time: "6 min drive", icon: "🏛️" },
];

const directions = [
  {
    icon: Plane,
    label: "From Kathmandu (by air)",
    desc: "Fly to Pokhara Airport (1 hr), then drive 3.5 hrs to Tansen via Pokhara–Butwal highway",
  },
  {
    icon: Bus,
    label: "From Kathmandu (by bus)",
    desc: "Tourist bus from Kathmandu to Tansen — approx. 8-9 hrs overnight journey",
  },
  {
    icon: Car,
    label: "From Pokhara",
    desc: "3.5 hr scenic drive via Siddhartha Highway. Tansen is at km 174 of the Prithvi Highway",
  },
];

export default function MapSection() {
  const [mapMode, setMapMode] = useState<"light" | "dark">("light");

  const mapsUrl = `https://www.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

  return (
    <section id="location" className="section-padding bg-eco-gradient relative overflow-hidden">
      <div className="ambient-glow w-[400px] h-[400px] bg-forest top-1/2 right-0 translate-x-1/3 -translate-y-1/2" />

      <div className="container-custom">
        <div className="mb-12">
          <SectionHeader
            badge="Find Us"
            title="Our"
            titleHighlight="Location"
            subtitle="Tucked in the peaceful hills of Kailashnagar, Tansen-5, Palpa — easy to find, hard to leave."
            nepali="तानसेन-५, कैलाशनगर, पाल्पा"
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Map toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={15} className="text-forest" />
                Tansen-5, Kailashnagar, Palpa, Nepal
              </div>
              <div className="flex items-center gap-1 p-1 bg-white rounded-lg shadow-sm">
                {(["light", "dark"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setMapMode(mode)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      mapMode === mode ? "bg-forest text-white" : "text-muted hover:text-dark"
                    }`}
                  >
                    {mode === "light" ? "☀️ Light" : "🌙 Dark"}
                  </button>
                ))}
              </div>
            </div>

            {/* Embedded map */}
            <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-card">
              <iframe
                src={mapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: mapMode === "dark" ? "invert(90%) hue-rotate(180deg)" : "none" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pahuna Ghar Homestay Location"
              />
            </div>

            {/* Get directions button */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-forest text-white rounded-xl font-semibold hover:bg-leaf hover:text-dark transition-all duration-300 group"
            >
              <Navigation size={18} className="group-hover:rotate-12 transition-transform" />
              Get Directions on Google Maps
            </a>
          </motion.div>

          {/* Info — takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact card */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h4 className="font-bold text-dark mb-4">Contact & Hours</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-forest flex-shrink-0" />
                  <span className="text-muted">Tansen-5, Kailashnagar, Palpa, Nepal</span>
                </div>
                <a href="tel:+977" className="flex items-center gap-3 text-sm text-muted hover:text-forest transition-colors">
                  <Phone size={16} className="text-forest flex-shrink-0" />
                  <span>+977-XXX-XXXXXX</span>
                </a>
                <a href="mailto:info@pahunagharhomestay.com" className="flex items-center gap-3 text-sm text-muted hover:text-forest transition-colors">
                  <Mail size={16} className="text-forest flex-shrink-0" />
                  <span>info@pahunagharhomestay.com</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <Clock size={16} className="text-forest flex-shrink-0" />
                  <div>
                    <div>Check-in: 2:00 PM onwards</div>
                    <div>Check-out: by 11:00 AM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby attractions */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h4 className="font-bold text-dark mb-4">Nearby Attractions</h4>
              <div className="space-y-2.5">
                {nearbyAttractions.map((place) => (
                  <div key={place.name} className="flex items-center justify-between text-sm group">
                    <div className="flex items-center gap-2 text-muted">
                      <span>{place.icon}</span>
                      <span className="group-hover:text-forest transition-colors">{place.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-forest font-medium text-xs">{place.distance}</span>
                      <div className="text-muted text-xs">{place.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to get here */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <h4 className="font-bold text-dark mb-4">How to Get Here</h4>
              <div className="space-y-4">
                {directions.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-forest/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={15} className="text-forest" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-dark">{label}</div>
                      <div className="text-xs text-muted mt-0.5 leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
