"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, ArrowRight, Star, Mountain, Camera, Coffee, Sunrise } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const experiences = [
  {
    id: "tansen-durbar",
    title: "Tansen Durbar",
    nepali: "तानसेन दरबार",
    category: "Heritage",
    duration: "2-3 hours",
    distance: "1.2 km",
    difficulty: "Easy",
    icon: Mountain,
    gradient: "from-[#1a472a] to-[#2d6a4f]",
    accentColor: "#8DC63F",
    desc: "Explore the majestic 17th-century palace complex that defines Tansen's architectural heritage. Marvel at intricate woodwork and sacred courtyards.",
    highlights: ["Royal History", "Intricate Woodwork", "Panoramic Views"],
    image: null,
  },
  {
    id: "rani-mahal",
    title: "Rani Mahal",
    nepali: "रानी महल",
    category: "Landmark",
    duration: "3-4 hours",
    distance: "8 km",
    difficulty: "Moderate",
    icon: Camera,
    gradient: "from-[#2c3e50] to-[#3d5a6e]",
    accentColor: "#DCC7A1",
    desc: "The 'Taj Mahal of Nepal' — a romantic white palace perched above the Kali Gandaki river. A breathtaking architectural gem with powerful river views.",
    highlights: ["River Views", "White Palace", "Romantic Setting"],
    image: null,
  },
  {
    id: "srinagar-hill",
    title: "Srinagar Hill Sunrise",
    nepali: "श्रीनगर पहाड सनराइज",
    category: "Nature",
    duration: "4-5 hours",
    distance: "3.5 km",
    difficulty: "Moderate",
    icon: Sunrise,
    gradient: "from-[#FF6B35] to-[#E84855]",
    accentColor: "#FFD700",
    desc: "Rise before dawn and hike to Srinagar Hill for a transcendent sunrise over the Himalayan range. Watch the Annapurna and Dhaulagiri peaks turn golden.",
    highlights: ["Himalayan Views", "Sunrise Trek", "Wildlife"],
    image: null,
    badge: "Must Do",
  },
  {
    id: "local-cuisine",
    title: "Palpali Food Walk",
    nepali: "पाल्पाली खाना",
    category: "Culture",
    duration: "2 hours",
    distance: "In-house",
    difficulty: "Easy",
    icon: Coffee,
    gradient: "from-[#7B4F2E] to-[#A0522D]",
    accentColor: "#8DC63F",
    desc: "A guided culinary journey through Palpa's unique food traditions — from Khaaja sets to Dhindo, Chyangra Khana, and hand-ground spice blends.",
    highlights: ["Local Recipes", "Cooking Class", "Market Visit"],
    image: null,
  },
  {
    id: "dhaka-weaving",
    title: "Dhaka Weaving Art",
    nepali: "धाका बुनाई",
    category: "Craft",
    duration: "2-3 hours",
    distance: "0.5 km",
    difficulty: "Easy",
    icon: Star,
    gradient: "from-[#6B2FBE] to-[#9B59B6]",
    accentColor: "#DCC7A1",
    desc: "Tansen is famous for its vibrant Dhaka fabric. Visit master weavers and learn the art of this traditional hand-loom technique passed down for centuries.",
    highlights: ["Cultural Art", "Hands-On", "Take Home Piece"],
    image: null,
  },
  {
    id: "village-walk",
    title: "Himalayan Village Walk",
    nepali: "गाउँ भ्रमण",
    category: "Nature",
    duration: "Half day",
    distance: "Varies",
    difficulty: "Easy",
    icon: Users,
    gradient: "from-[#006D3A] to-[#3A7D44]",
    accentColor: "#8DC63F",
    desc: "Wander through terraced rice paddies, traditional Magar and Newari villages, and lush forests. Guided by our team who knows every hidden path.",
    highlights: ["Village Life", "Terraced Farms", "Local Interaction"],
    image: null,
    badge: "Guided",
  },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = exp.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer h-80"
      style={{
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} transition-transform duration-700 group-hover:scale-105`} />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div>
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `${exp.accentColor}25`, border: `1px solid ${exp.accentColor}40` }}
            >
              <Icon size={22} style={{ color: exp.accentColor }} />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/15 text-white/80 font-medium">
                {exp.category}
              </span>
              {exp.badge && (
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-bold"
                  style={{ background: exp.accentColor, color: "#1F2A1F" }}
                >
                  {exp.badge}
                </span>
              )}
            </div>
          </div>

          <h3 className="text-white font-bold text-xl mb-1 leading-tight">
            {exp.title}
          </h3>
          <p className="font-nepali text-white/50 text-sm mb-3">{exp.nepali}</p>

          {/* Description — visible on hover */}
          <motion.p
            animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/70 text-sm leading-relaxed overflow-hidden"
          >
            {exp.desc}
          </motion.p>
        </div>

        <div>
          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="flex items-center gap-1 text-xs text-white/70 bg-white/10 px-2.5 py-1 rounded-full">
              <Clock size={11} /> {exp.duration}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/70 bg-white/10 px-2.5 py-1 rounded-full">
              <MapPin size={11} /> {exp.distance}
            </span>
            <span className="text-xs text-white/70 bg-white/10 px-2.5 py-1 rounded-full">
              {exp.difficulty}
            </span>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {exp.highlights.map((h) => (
              <span
                key={h}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${exp.accentColor}25`, color: exp.accentColor, border: `1px solid ${exp.accentColor}30` }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            className="flex items-center gap-2 text-white text-sm font-semibold group/btn"
          >
            Learn More
            <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
    </motion.div>
  );
}

export default function ExperiencesSection() {
  return (
    <section id="experiences" className="section-padding bg-dark relative overflow-hidden">
      <div className="ambient-glow w-[500px] h-[500px] bg-forest top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="ambient-glow w-[300px] h-[300px] bg-leaf top-0 right-0" />

      <div className="container-custom">
        <div className="mb-14">
          <SectionHeader
            badge="Local Experiences"
            title="Explore the"
            titleHighlight="Heart of Tansen"
            subtitle="Beyond your room, a world of discovery awaits. From ancient palaces to misty mountain trails — Tansen is a living museum."
            nepali="तानसेनका अनुभवहरू"
            light
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-white/50 text-sm mb-5">
            All experiences can be arranged for you. Our team handles all logistics.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("booking");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-white rounded-full font-semibold hover:bg-leaf hover:text-dark transition-all duration-300 hover:shadow-glow"
          >
            Plan Your Experience
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
