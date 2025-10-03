"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, Play, ImageIcon } from "lucide-react";
import Link from "next/link";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const fallbackSlides = [
    {
      title: "SIMET AG SAC",
      subtitle: "INDUSTRIA METALMECÁNICA",
      description:
        "Más de 10 años ejecutando proyectos de diseño, fabricación y  mantenimiento para el sector agroindustrial, minero y pesquero.",
      icon: Scale,
      mediaType: "fallback",
    },
  ];

  const slides = fallbackSlides;

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);

      return () => clearInterval(timer);
    }
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  const getBackgroundImage = () => {
    if (currentSlideData.mediaType === "image" && currentSlideData.imageUrl) {
      return currentSlideData.imageUrl;
    }
    return "/soldador.jpg"; // fallback image
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{ backgroundImage: `url(${getBackgroundImage()})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/85 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/20" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-16 w-24 h-24 border border-white/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-10 w-16 h-16 border border-white/10 rounded-full animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <div className="text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Main Title */}
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {currentSlideData.title}
                </motion.h1>

                {/* Subtitle - only show for fallback slides */}
                {currentSlideData.subtitle && (
                  <motion.h2
                    className="text-2xl md:text-3xl text-teal-200 mb-6 font-light"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {currentSlideData.subtitle}
                  </motion.h2>
                )}

                {/* Description */}
                <motion.p
                  className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {currentSlideData.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {currentSlideData.linkUrl ? (
                    <Link
                      href={currentSlideData.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className="bg-white text-primary hover:cursor-pointer hover:bg-teal-50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      >
                        {currentSlideData.mediaType === "video"
                          ? "Ver Video"
                          : "Ver Más"}
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/Contacto">
                      <Button
                        size="lg"
                        className="bg-white text-primary hover:cursor-pointer hover:bg-teal-50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 uppercase"
                      >
                        Contacto
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Visual Element */}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative overflow-hidden transition-all duration-500 ${
                index === currentSlide
                  ? "w-12 h-3 bg-white rounded-full"
                  : "w-3 h-3 bg-white/40 rounded-full hover:bg-white/60"
              }`}
            >
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-teal-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom CSS for slow spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
