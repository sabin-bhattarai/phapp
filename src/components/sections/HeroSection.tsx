"use client";

import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Volume2, VolumeX, Calendar, Star, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const HomestayScene = dynamic(
  () => import("@/components/3d/HomestayScene"),
  { ssr: false, loading: () => <div className="w-full h-full bg-forest/10 animate-pulse" /> }
);

const stats = [
  { value: "4.9", label: "Guest Rating", icon: Star },
  { value: "50+", label: "Happy Guests", icon: null },
  { value: "Tansen", label: "Palpa, Nepal", icon: MapPin },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-dark"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-dark/60 to-dark/95 z-10" />

      {/* Ambient color orbs */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-forest/20 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-leaf/10 blur-[100px]" />
      </motion.div>

      {/* 3D Scene — takes up right portion / full on desktop */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-5"
      >
        <div className="absolute inset-0 md:left-1/3">
          {mounted && <HomestayScene />}
        </div>
      </motion.div>

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 z-8 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #8DC63F 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container-custom w-full pt-24 pb-16"
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold tracking-widest uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
            <span className="font-nepali mr-1">पाल्पा</span>
            Palpa, Nepal
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6"
          >
            Experience
            <br />
            <span className="gradient-text">Authentic</span>
            <br />
            Palpali
            <span className="text-white"> Hospitality</span>
          </motion.h1>

          {/* Nepali subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="font-nepali text-white/60 text-lg mb-3"
          >
            अतिथि देवो भव — पाहुनालाई देवता सरह मान्ने संस्कृति
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg"
          >
            Nature, comfort, culture, and peace in the heart of Tansen.
            A boutique mountain retreat where every guest is family.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <motion.button
              onClick={scrollToBooking}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-7 py-4 bg-forest text-white rounded-full font-semibold text-base shadow-[0_8px_30px_rgba(0,109,58,0.4)] hover:shadow-[0_12px_40px_rgba(0,109,58,0.5)] transition-shadow relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-forest to-leaf opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Calendar size={18} className="relative z-10" />
              <span className="relative z-10">Book Your Stay</span>
            </motion.button>

            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-7 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-base backdrop-blur-sm hover:border-leaf hover:text-leaf transition-all duration-300"
            >
              Discover More
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="flex flex-wrap gap-6"
          >
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2.5"
              >
                <div className="flex-shrink-0">
                  {Icon ? (
                    <Icon size={16} className="text-leaf" />
                  ) : (
                    <div className="w-1 h-8 bg-leaf/40 rounded-full" />
                  )}
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">{value}</div>
                  <div className="text-white/50 text-xs">{label}</div>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8 bg-white/10 ml-2 hidden sm:block" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Sound toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setSoundOn(!soundOn)}
        className="absolute top-24 right-6 z-30 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-leaf hover:border-leaf border border-white/20 transition-all"
        title={soundOn ? "Mute ambient sound" : "Play ambient sound"}
      >
        {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </motion.button>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-leaf transition-colors group"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-leaf transition-colors">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-leaf"
          />
        </div>
        <ArrowDown size={14} className="opacity-60" />
      </motion.button>

      {/* Bottom fade to background color */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
}
