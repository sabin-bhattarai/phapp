"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Heart, Users, TreePine, Award, Coffee } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Warm Hospitality",
    nepali: "अतिथि देवो भव",
    desc: "Every guest is treated as a divine blessing in the Nepali tradition.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    nepali: "प्रकृतिसँगको सामञ्जस्य",
    desc: "Sustainable practices that respect and preserve our mountain environment.",
  },
  {
    icon: Users,
    title: "Family-Run",
    nepali: "पारिवारिक वातावरण",
    desc: "A home-away-from-home experience managed with personal care.",
  },
  {
    icon: Coffee,
    title: "Authentic Cuisine",
    nepali: "असली नेपाली स्वाद",
    desc: "Farm-fresh local ingredients prepared with traditional Palpali recipes.",
  },
  {
    icon: TreePine,
    title: "Nature Immersion",
    nepali: "प्रकृतिमा डुब्नुस्",
    desc: "Surrounded by lush forests, misty hills, and serene mountain air.",
  },
  {
    icon: Award,
    title: "Cultural Richness",
    nepali: "सांस्कृतिक विविधता",
    desc: "Guided cultural experiences through Tansen's 400-year history.",
  },
];

const milestones = [
  { year: "Est.", value: "2020", label: "Founded with love" },
  { year: "50+", value: "", label: "Happy guests hosted" },
  { year: "4.9★", value: "", label: "Average guest rating" },
  { year: "100%", value: "", label: "Organic & local food" },
];

function ValueCard({
  icon: Icon,
  title,
  nepali,
  desc,
  index,
}: (typeof values)[0] & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className="group p-6 rounded-2xl bg-white border border-forest/8 hover:border-leaf/30 hover:shadow-card-hover transition-all duration-400"
    >
      <div className="w-12 h-12 rounded-xl bg-forest/8 flex items-center justify-center mb-4 group-hover:bg-forest group-hover:scale-110 transition-all duration-300">
        <Icon size={22} className="text-forest group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-bold text-dark mb-1">{title}</h3>
      <p className="font-nepali text-forest/60 text-sm mb-2">{nepali}</p>
      <p className="text-muted text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Ambient glows */}
      <div className="ambient-glow w-[600px] h-[600px] bg-forest top-1/2 -left-40 -translate-y-1/2" />
      <div className="ambient-glow w-[400px] h-[400px] bg-leaf bottom-0 right-0 translate-x-1/3" />

      <div className="container-custom">
        {/* Top storytelling strip */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left — image collage */}
          <motion.div
            style={{ y: bgY }}
            className="relative h-[480px] hidden lg:block"
          >
            {/* Main image placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute inset-4 rounded-3xl overflow-hidden bg-gradient-to-br from-forest to-leaf/60 shadow-luxury-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <TreePine size={64} className="mx-auto mb-4 opacity-60" />
                  <p className="font-nepali text-xl opacity-70">पहुना घर</p>
                  <p className="text-sm opacity-50">Pahuna Ghar Homestay</p>
                </div>
              </div>
              {/* Decorative mountain silhouette */}
              <svg
                className="absolute bottom-0 left-0 right-0"
                viewBox="0 0 400 120"
                fill="none"
              >
                <path d="M0 120L80 40L140 80L200 20L260 70L320 35L400 80V120H0Z" fill="rgba(0,0,0,0.2)" />
                <path d="M0 120L60 60L110 90L180 30L240 65L300 45L380 75L400 60V120H0Z" fill="rgba(0,0,0,0.15)" />
              </svg>
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="absolute -right-4 top-8 bg-white rounded-2xl shadow-card p-4 w-44"
            >
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-leaf text-sm">★</span>
                ))}
              </div>
              <p className="text-dark font-bold text-sm">"Unforgettable stay"</p>
              <p className="text-muted text-xs mt-1">— Recent Guest</p>
            </motion.div>

            {/* Floating eco badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="absolute -left-4 bottom-16 bg-forest text-white rounded-2xl shadow-luxury p-4 flex items-center gap-3"
            >
              <Leaf className="text-leaf" size={20} />
              <div>
                <div className="font-bold text-sm">Eco-Friendly</div>
                <div className="text-white/60 text-xs">Certified</div>
              </div>
            </motion.div>

            {/* Year established badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-4 right-8 bg-beige rounded-xl px-4 py-2"
            >
              <span className="text-dark font-bold text-xs tracking-wider">EST. 2020</span>
            </motion.div>
          </motion.div>

          {/* Right — text content */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/8 text-forest text-xs font-semibold tracking-widest uppercase mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-leaf" />
              Our Story
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
            >
              Where Every Guest
              <br />
              Becomes{" "}
              <span className="gradient-text">Family</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="font-nepali text-forest text-lg mb-4"
            >
              पाहुनालाई देवता सरह मान्नु हाम्रो परम्परा हो
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="space-y-4 text-muted leading-relaxed"
            >
              <p>
                Nestled in the misty hills of Tansen-5, Kailashnagar, <strong className="text-dark">Pahuna Ghar Homestay</strong> was born from a deep love of Nepali hospitality traditions and the belief that travel should connect souls to place.
              </p>
              <p>
                Our family has called these mountains home for generations. We welcome guests not as visitors, but as extensions of our own family — sharing home-cooked Palpali meals, stories by firelight, and the timeless rhythm of mountain life.
              </p>
              <p>
                Every corner of Pahuna Ghar is thoughtfully designed to blend <strong className="text-forest">eco-conscious luxury</strong> with the warmth of authentic Nepali culture — because you deserve both comfort and connection.
              </p>
            </motion.div>

            {/* Milestones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-forest/10"
            >
              {milestones.map(({ year, value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-bold gradient-text">{year}{value}</div>
                  <div className="text-xs text-muted mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-dark mb-2">
            Our <span className="gradient-text">Values</span>
          </h3>
          <p className="text-muted">What makes Pahuna Ghar truly different</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <ValueCard key={v.title} {...v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
