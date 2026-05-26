/**
 * Pahuna Ghar Homestay — Main Home Page
 *
 * This page imports components from all feature branches.
 * Merge the following branches before running:
 *   feature/layout-navbar-footer
 *   feature/hero-3d-scene
 *   feature/content-sections
 *   feature/gallery
 *   feature/booking-system
 *   feature/firebase-backend
 */

import dynamic from "next/dynamic";

// Layout
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Sections — heavy sections use dynamic imports for performance
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import RoomsSection from "@/components/sections/RoomsSection";

const ExperiencesSection = dynamic(
  () => import("@/components/sections/ExperiencesSection"),
  { ssr: true }
);
const GallerySection = dynamic(
  () => import("@/components/gallery/GallerySection"),
  { ssr: true }
);
const BookingSection = dynamic(
  () => import("@/components/booking/BookingSection"),
  { ssr: true }
);
const MapSection = dynamic(
  () => import("@/components/sections/MapSection"),
  { ssr: true }
);

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <ExperiencesSection />
        <GallerySection />
        <BookingSection />
        <MapSection />
      </main>

      <Footer />

      {/* Sticky mobile booking CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <a
          href="#booking"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center justify-center gap-2 w-full py-4 bg-forest text-white rounded-2xl font-semibold text-base shadow-luxury-lg"
        >
          📅 Book Your Stay
        </a>
      </div>
    </>
  );
}
