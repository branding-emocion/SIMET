"use client";

import { motion } from "framer-motion";

export default function HeroSection({
  title = "Nuestros Servicios",
  subtitle = "Descubre la excelencia en cada servicio que ofrecemos",
  backgroundImage = "/QuienesSomos/QuienesSomos.jpg",
  overlayFrom = "from-slate-900/80",
  overlayTo = "to-slate-900/60",
  height = "h-[50vh]",
  titleSize = "text-4xl md:text-6xl",
  subtitleSize = "text-lg md:text-2xl",
}) {
  return (
    <section
      className={`relative ${height} flex items-center justify-center overflow-hidden`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Overlay with gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${overlayFrom} ${overlayTo}`}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className={`${titleSize} font-bold mb-6 font-serif uppercase tracking-tight text-balance`}
          >
            {title}
          </h1>
          <p
            className={`${subtitleSize} max-w-3xl mx-auto leading-relaxed text-gray-100 text-pretty`}
          >
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
