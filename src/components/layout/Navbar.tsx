"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-luxury"
            : "bg-transparent"
        }`}
      >
        {/* Top bar — visible when not scrolled */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-forest/90 backdrop-blur-sm text-white text-xs py-1.5 hidden md:block"
            >
              <div className="container-custom flex justify-between items-center">
                <span className="font-nepali text-sm opacity-90">
                  पहुना घर होमस्टे — तानसेन, पाल्पा
                </span>
                <div className="flex items-center gap-5 text-white/80">
                  <a
                    href="tel:+977-123456"
                    className="flex items-center gap-1.5 hover:text-leaf transition-colors"
                  >
                    <Phone size={12} />
                    <span>+977-XXX-XXXXXX</span>
                  </a>
                  <a
                    href="mailto:info@pahunagharhomestay.com"
                    className="flex items-center gap-1.5 hover:text-leaf transition-colors"
                  >
                    <Mail size={12} />
                    <span>info@pahunagharhomestay.com</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main nav */}
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-[68px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div className={`rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 flex-shrink-0 ${
                scrolled ? "bg-white shadow-card" : "bg-white/95"
              }`}>
                <Image
                  src="/logo-mark.png"
                  alt="Pahuna Ghar"
                  width={96}
                  height={52}
                  className="w-12 h-auto object-contain p-0.5"
                />
              </div>
              <div>
                <div
                  className={`font-extrabold text-base leading-tight tracking-tight transition-colors ${
                    scrolled ? "text-forest" : "text-white"
                  }`}
                >
                  Pahuna Ghar
                </div>
                <div
                  className={`text-[10px] font-medium tracking-wider uppercase transition-colors ${
                    scrolled ? "text-muted" : "text-white/70"
                  }`}
                >
                  Homestay · Tansen
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ label, href }) => {
                const id = href.replace("#", "");
                return (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                      scrolled
                        ? activeSection === id
                          ? "text-forest"
                          : "text-dark/70 hover:text-forest"
                        : activeSection === id
                        ? "text-leaf"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-leaf transition-all duration-300 ${
                        activeSection === id ? "w-4" : "w-0 group-hover:w-4"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollTo("#booking")}
                className={`hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                  scrolled
                    ? "bg-forest text-white hover:bg-forest/90 shadow-luxury"
                    : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                Book Your Stay
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  scrolled
                    ? "text-dark hover:bg-forest/10"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-80 bg-white z-40 shadow-2xl flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-forest/10">
              <div className="rounded-xl overflow-hidden bg-white shadow-card">
                <Image src="/logo-mark.png" alt="Pahuna Ghar" width={96} height={52} className="w-12 h-auto object-contain p-0.5" />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-muted hover:text-forest hover:bg-forest/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-1 flex-1">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(href)}
                  className={`text-left px-4 py-3 rounded-xl font-medium transition-all ${
                    activeSection === href.replace("#", "")
                      ? "bg-forest/10 text-forest"
                      : "text-dark/70 hover:bg-forest/5 hover:text-forest"
                  }`}
                >
                  {label}
                </motion.button>
              ))}
            </nav>

            <div className="p-4 border-t border-forest/10">
              <button
                onClick={() => scrollTo("#booking")}
                className="w-full py-3 bg-forest text-white rounded-xl font-semibold hover:bg-forest/90 transition-colors"
              >
                Book Your Stay
              </button>
              <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted">
                <a href="tel:+977" className="hover:text-forest flex items-center gap-1">
                  <Phone size={11} /> Call Us
                </a>
                <a href="mailto:info@pahunagharhomestay.com" className="hover:text-forest flex items-center gap-1">
                  <Mail size={11} /> Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
