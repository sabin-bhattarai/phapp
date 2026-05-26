"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Heart,
  Leaf,
} from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Rooms", href: "#rooms" },
  { label: "Experiences", href: "#experiences" },
  { label: "Photo Gallery", href: "#gallery" },
  { label: "Book a Stay", href: "#booking" },
  { label: "Find Us", href: "#location" },
];

const roomLinks = [
  { label: "Deluxe Room", href: "#rooms" },
  { label: "Family Room", href: "#rooms" },
  { label: "Traditional Nepali Room", href: "#rooms" },
  { label: "Balcony Mountain View", href: "#rooms" },
];

const experiences = [
  { label: "Tansen Durbar Tour", href: "#experiences" },
  { label: "Rani Mahal Visit", href: "#experiences" },
  { label: "Sunrise at Srinagar Hill", href: "#experiences" },
  { label: "Local Cultural Food", href: "#experiences" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-dark relative overflow-hidden">
      {/* Ambient glows */}
      <div className="ambient-glow w-[500px] h-[500px] bg-forest top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      <div className="ambient-glow w-[400px] h-[400px] bg-leaf bottom-0 right-0 translate-x-1/3 translate-y-1/3" />

      {/* CTA Banner */}
      <div className="relative border-b border-white/5">
        <div className="container-custom py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-leaf text-sm font-semibold tracking-widest uppercase mb-2">
                Experience Palpa
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                Begin Your Journey at
                <br />
                <span className="gradient-text">Pahuna Ghar</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("#booking")}
                className="px-8 py-4 bg-forest text-white rounded-full font-semibold hover:bg-leaf hover:text-dark transition-all duration-300 hover:shadow-glow flex items-center gap-2 group"
              >
                Book Your Stay
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
              <a
                href="tel:+977"
                className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:border-leaf hover:text-leaf transition-all duration-300 text-center"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5 inline-block rounded-2xl overflow-hidden bg-white/8 p-3">
              <Image
                src="/logo.png"
                alt="Pahuna Ghar Homestay"
                width={160}
                height={100}
                className="w-36 h-auto object-contain"
              />
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Experience the warmth of authentic Palpali hospitality amidst the misty mountains of Tansen. Where nature meets comfort.
            </p>

            <p className="font-nepali text-white/40 text-sm mb-6">
              पाहुनालाई देवता सरह मान्ने हाम्रो संस्कृति
            </p>

            <div className="flex items-center gap-3">
              {[
                { label: "IG", href: "#" },
                { label: "FB", href: "#" },
                { label: "YT", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:border-leaf hover:text-leaf transition-all duration-300 hover:scale-110"
                >
                  <span className="text-[10px] font-bold">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-leaf inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-white/50 hover:text-leaf transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-leaf transition-all duration-300 group-hover:w-4" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Rooms */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-leaf inline-block" />
              Our Rooms
            </h4>
            <ul className="space-y-3">
              {roomLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-white/50 hover:text-leaf transition-colors text-sm flex items-center gap-1.5 group text-left"
                  >
                    <span className="w-0 h-px bg-leaf transition-all duration-300 group-hover:w-4" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold mt-7 mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-leaf inline-block" />
              Experiences
            </h4>
            <ul className="space-y-3">
              {experiences.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-white/50 hover:text-leaf transition-colors text-sm flex items-center gap-1.5 group text-left"
                  >
                    <span className="w-0 h-px bg-leaf transition-all duration-300 group-hover:w-4" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-leaf inline-block" />
              Get In Touch
            </h4>
            <div className="space-y-4">
              <a
                href="https://maps.google.com/?q=27.8734405,83.537326"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/50 hover:text-leaf transition-colors group"
              >
                <MapPin
                  size={16}
                  className="mt-0.5 flex-shrink-0 text-leaf"
                />
                <span className="text-sm">
                  Tansen-5, Kailashnagar,
                  <br />
                  Palpa, Nepal
                </span>
              </a>

              <a
                href="tel:+977"
                className="flex items-center gap-3 text-white/50 hover:text-leaf transition-colors"
              >
                <Phone size={16} className="text-leaf flex-shrink-0" />
                <span className="text-sm">+977-XXX-XXXXXX</span>
              </a>

              <a
                href="mailto:info@pahunagharhomestay.com"
                className="flex items-center gap-3 text-white/50 hover:text-leaf transition-colors"
              >
                <Mail size={16} className="text-leaf flex-shrink-0" />
                <span className="text-sm">info@pahunagharhomestay.com</span>
              </a>
            </div>

            {/* Eco badge */}
            <div className="mt-6 flex items-center gap-2 px-3 py-2 rounded-lg border border-leaf/20 bg-leaf/5 w-fit">
              <Leaf size={14} className="text-leaf" />
              <span className="text-xs text-leaf font-medium">Eco-Friendly Homestay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs">
          <p>
            © {new Date().getFullYear()} Pahuna Ghar Homestay. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <Heart size={11} className="text-leaf fill-leaf" /> in Tansen, Nepal
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-leaf transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-leaf transition-colors">
              Terms
            </Link>
            <Link href="/admin" className="hover:text-leaf transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
