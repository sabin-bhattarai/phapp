"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  nepali?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  nepali,
  center = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${center ? "text-center" : ""} max-w-3xl ${
        center ? "mx-auto" : ""
      }`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 ${
            light
              ? "bg-white/15 text-white border border-white/20"
              : "bg-forest/10 text-forest border border-forest/15"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${light ? "bg-leaf" : "bg-leaf"}`} />
          {badge}
        </div>
      )}

      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? "text-white" : "text-dark"
        }`}
      >
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </h2>

      {nepali && (
        <p
          className={`font-nepali text-lg mb-3 ${
            light ? "text-white/60" : "text-forest/60"
          }`}
        >
          {nepali}
        </p>
      )}

      {subtitle && (
        <p
          className={`text-base md:text-lg leading-relaxed max-w-2xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-muted"}`}
        >
          {subtitle}
        </p>
      )}

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: center ? "4rem" : "3rem" }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className={`h-1 rounded-full bg-leaf mt-5 ${center ? "mx-auto" : ""}`}
      />
    </motion.div>
  );
}
