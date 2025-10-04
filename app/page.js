"use client";

import { motion } from "framer-motion";
import { ArrowRight, Factory, Wrench, Paintbrush, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { servicios } from "@/lib/servicios-data";
import HeroCarousel from "@/components/HeroSection";
import CategoriasSection from "@/components/CategoriasSection";

export default function HomePage() {
  const categorias = [
    "Todos",
    ...Array.from(new Set(servicios.map((s) => s.categoria))),
  ];

  const services = [
    {
      number: "01",
      title: "Fabricaciones",
      subtitle: "Industriales",
      description: "Estructuras metálicas, tanques y naves industriales",
      icon: Factory,
      href: "/servicios#fabricaciones",
    },
    {
      number: "02",
      title: "Limpieza Industrial",
      subtitle: "Granallado",
      description: "Tratamiento de superficies metálicas",
      icon: Wrench,
      href: "/servicios#limpieza",
    },
    {
      number: "03",
      title: "Pintura",
      subtitle: "Industrial",
      description: "Pintura líquida y electrostática",
      icon: Paintbrush,
      href: "/servicios#pintura",
    },
    {
      number: "04",
      title: "Corte por Plasma",
      subtitle: "CNC",
      description: "Corte de precisión en metales",
      icon: Zap,
      href: "/servicios#corte",
    },
  ];

  const clients = [
    "ReliX Water",
    "Danper",
    "Green Perú",
    "Irricorp",
    "Caprari",
    "Irrialtec S.A.C.",
    "Netafim",
    "Arato",
    "NaanDanJain",
    "Camposol",
    "Hortifrut",
    "Viru",
    "Hass Perú",
    "Talsa",
  ];
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      <HeroCarousel />

      <CategoriasSection />
      {/* Client Logos */}
      <section className="py-8 sm:py-12 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className="flex gap-8 sm:gap-12 lg:gap-16"
              animate={{
                x: [0, -50 * clients.length], // Se mueve la mitad del ancho total
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 30, // Duración del ciclo completo
                  ease: "linear",
                },
              }}
              style={{
                width: `${100 * clients.length}%`, // Ancho total para acomodar todos los elementos
              }}
            >
              {duplicatedClients.map((client, index) => (
                <motion.div
                  key={`${client}-${index}`}
                  className="text-gray-600 font-semibold text-sm sm:text-base lg:text-lg whitespace-nowrap flex-shrink-0 min-w-fit"
                  whileHover={{
                    scale: 1.05,
                    color: "#374151", // text-gray-700
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {client}
                </motion.div>
              ))}
            </motion.div>

            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <Image
                src="/trabadores.jpg"
                alt="Planta industrial SIMET"
                width={600}
                height={400}
                className="rounded-lg w-full h-auto shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div
                className="inline-block text-white px-3 py-1 rounded text-xs sm:text-sm font-semibold mb-4"
                style={{
                  background: `linear-gradient(45deg, #23398e, #f97316)`,
                }}
              >
                QUIÉNES SOMOS
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
                LÍDERES EN
                <br />
                <span className="text-orange-500">METALMECÁNICA</span>
              </h2>

              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Somos una industria metalmecánica con más de 10 años en el
                mercado ejecutando proyectos de diseño, fabricación,
                mantenimiento y montaje de estructuras y productos metálicos
                para el sector agroindustrial, industria minera y pesquera.
              </p>

              <Link href="/nosotros">
                <Button
                  className="font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: "#23398e",
                  }}
                >
                  Leer Más
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              NUESTROS <span className="text-orange-500">SERVICIOS</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Soluciones integrales para la industria metalmecánica
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categorias.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Link href={`/servicios?categoria=${service}`}>
                  <div
                    className="p-6 sm:p-8 rounded-lg h-full flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, #f97316 0%, #ea580c 100%)`,
                    }}
                  >
                    <div>
                      {/* <div className="text-white/20 text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                        {service.number}
                      </div> */}
                      <Factory className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-3 sm:mb-4" />
                      <h3 className="text-white font-bold text-lg sm:text-xl mb-2">
                        {service}
                      </h3>
                      {/* <p className="text-white/90 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        {service.subtitle}
                      </p>
                      <p className="text-white/80 text-xs sm:text-sm">
                        {service.description}
                      </p> */}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div
                className="inline-block text-white px-3 py-1 rounded text-xs sm:text-sm font-semibold mb-4"
                style={{
                  background: `linear-gradient(45deg, #23398e, #f97316)`,
                }}
              >
                DESARROLLO DE PROYECTOS
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
                INGENIERÍA Y
                <br />
                <span className="text-orange-500">DESARROLLO</span>
              </h2>

              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Contamos con un equipo altamente calificado y experimentado en
                todas las especialidades, profesionales dinámicos capaces de
                enfrentar los nuevos retos y desafíos del mundo industrial
                actual.
              </p>

              <Link href="/proyectos">
                <Button
                  className="font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: "#23398e",
                  }}
                >
                  Ver Proyectos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <Image
                src=""
                alt="Desarrollo de proyectos"
                width={600}
                height={400}
                className="rounded-lg w-full h-auto shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
