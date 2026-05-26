"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const galleryItems = [
  { id: 1, category: "Rooms", title: "Deluxe Room Interior", gradient: "from-forest to-forest/50", span: "col-span-1 row-span-2" },
  { id: 2, category: "Views", title: "Mountain Sunrise", gradient: "from-[#FF6B35] to-[#E84855]", span: "col-span-2 row-span-1" },
  { id: 3, category: "Food", title: "Palpali Dal Bhat", gradient: "from-[#7B4F2E] to-[#A0522D]", span: "col-span-1 row-span-1" },
  { id: 4, category: "Culture", title: "Tansen Durbar", gradient: "from-[#1a472a] to-[#2d6a4f]", span: "col-span-1 row-span-1" },
  { id: 5, category: "Nature", title: "Forest Path", gradient: "from-leaf to-forest", span: "col-span-1 row-span-2" },
  { id: 6, category: "Rooms", title: "Balcony at Sunset", gradient: "from-[#2c3e50] to-[#3d5a6e]", span: "col-span-2 row-span-1" },
  { id: 7, category: "Views", title: "Misty Hills", gradient: "from-[#006D3A] to-[#3A7D44]", span: "col-span-1 row-span-1" },
  { id: 8, category: "Culture", title: "Dhaka Weaving", gradient: "from-[#6B2FBE] to-[#9B59B6]", span: "col-span-1 row-span-1" },
  { id: 9, category: "Food", title: "Herbal Tea Garden", gradient: "from-leaf/80 to-forest/80", span: "col-span-2 row-span-1" },
  { id: 10, category: "Nature", title: "Rice Terraces", gradient: "from-[#3A7D44] to-[#2d6a4f]", span: "col-span-1 row-span-1" },
  { id: 11, category: "Rooms", title: "Traditional Room Nook", gradient: "from-[#DCC7A1]/80 to-[#7B4F2E]", span: "col-span-1 row-span-1" },
  { id: 12, category: "Views", title: "Kali Gandaki Rani Mahal", gradient: "from-[#2c3e50] to-[#006D3A]", span: "col-span-1 row-span-2" },
];

const categories = ["All", "Rooms", "Views", "Nature", "Culture", "Food"];

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.07, 0.5), duration: 0.6 }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span}`}
      style={{ minHeight: "180px" }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs text-white/70 font-medium tracking-wider uppercase block mb-1">
              {item.category}
            </span>
            <h4 className="text-white font-semibold text-sm leading-tight">{item.title}</h4>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ZoomIn size={14} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextImage = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <section id="gallery" className="section-padding bg-background relative overflow-hidden">
      <div className="ambient-glow w-[500px] h-[500px] bg-leaf bottom-0 left-0 -translate-x-1/3 translate-y-1/3" />

      <div className="container-custom">
        <div className="mb-10">
          <SectionHeader
            badge="Photo Gallery"
            title="Glimpses of"
            titleHighlight="Pahuna Ghar"
            subtitle="Every frame tells a story of mountain life, cultural richness, and the beauty of Tansen."
            nepali="पहुना घरका तस्बिरहरू"
          />
        </div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-forest text-white shadow-luxury"
                  : "bg-white text-muted border border-forest/10 hover:border-forest hover:text-forest"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
          <AnimatePresence mode="wait">
            {filtered.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => openLightbox(i)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mt-8 text-muted text-sm"
        >
          <Camera size={15} className="text-forest" />
          <span>Photo credits: Pahuna Ghar Homestay</span>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury-lg"
            >
              <div
                className={`w-full h-full bg-gradient-to-br ${filtered[lightboxIndex]?.gradient || "from-forest to-leaf"} flex items-center justify-center`}
              >
                <div className="text-center text-white">
                  <Camera size={48} className="mx-auto mb-3 opacity-40" />
                  <p className="text-xl font-semibold opacity-70">
                    {filtered[lightboxIndex]?.title}
                  </p>
                  <p className="text-sm opacity-40 mt-1">
                    {filtered[lightboxIndex]?.category}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight size={22} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
