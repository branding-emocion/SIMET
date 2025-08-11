"use client";

import { motion } from "framer-motion";
import {
  Factory,
  Wrench,
  Cog,
  Truck,
  Paintbrush,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const services = [
  {
    title: "Fabricación Industrial",
    description:
      "Resistencia, precisión y calidad sin límites en todos nuestros procesos de fabricación metalmecánica",
    icon: Factory,
    gallery: [
      "Fabricacion+Industrial+SIMET+1",
      "Fabricacion+Industrial+SIMET+2",
      "Fabricacion+Industrial+SIMET+3",
    ],
    features: [
      "Maquinaria especializada",
      "Control de calidad total",
      "Entregas puntuales garantizadas",
    ],
  },
  {
    title: "Fabricación de Naves Industriales",
    description:
      "Construcción de estructuras industriales completas con los más altos estándares de ingeniería",
    icon: Factory,
    gallery: [
      "Naves+Industriales+SIMET+1",
      "Naves+Industriales+SIMET+2",
      "Naves+Industriales+SIMET+3",
    ],
    features: [
      "Diseño estructural personalizado",
      "Estructuras de alta resistencia",
      "Instalación completa llave en mano",
    ],
  },
  {
    title: "Mantenimiento de Fábrica",
    description:
      "Servicios especializados de mantenimiento preventivo y correctivo para equipos industriales",
    icon: Wrench,
    gallery: [
      "Mantenimiento+Fabrica+SIMET+1",
      "Mantenimiento+Fabrica+SIMET+2",
      "Mantenimiento+Fabrica+SIMET+3",
    ],
    features: [
      "Mantenimiento preventivo programado",
      "Reparaciones especializadas",
      "Disponibilidad 24/7",
    ],
  },
  {
    title: "Mantenimiento en Campo",
    description:
      "Servicios de mantenimiento directamente en las instalaciones del cliente con respuesta inmediata",
    icon: Wrench,
    gallery: [
      "Mantenimiento+Campo+SIMET+1",
      "Mantenimiento+Campo+SIMET+2",
      "Mantenimiento+Campo+SIMET+3",
    ],
    features: [
      "Servicio en sitio",
      "Respuesta rápida garantizada",
      "Técnicos especializados certificados",
    ],
  },
  {
    title: "Fabricación de Equipo Agrícola",
    description:
      "Equipos especializados diseñados para optimizar la producción agrícola con tecnología avanzada",
    icon: Cog,
    gallery: [
      "Equipo+Agricola+SIMET+1",
      "Equipo+Agricola+SIMET+2",
      "Equipo+Agricola+SIMET+3",
    ],
    features: [
      "Diseño robusto y duradero",
      "Eficiencia operativa máxima",
      "Adaptabilidad total",
    ],
  },
  {
    title: "Instalación de Equipos de Filtrado",
    description:
      "Instalación y configuración de sistemas de filtrado industrial de alta eficiencia",
    icon: Cog,
    gallery: [
      "Equipos+Filtrado+SIMET+1",
      "Equipos+Filtrado+SIMET+2",
      "Equipos+Filtrado+SIMET+3",
    ],
    features: [
      "Sistemas de alta eficiencia",
      "Instalación profesional certificada",
      "Soporte técnico continuo",
    ],
  },
  {
    title: "Trabajos en Inoxidable",
    description:
      "Fabricación y trabajos especializados en acero inoxidable con acabados perfectos",
    icon: Factory,
    gallery: [
      "Trabajos+Inoxidable+SIMET+1",
      "Trabajos+Inoxidable+SIMET+2",
      "Trabajos+Inoxidable+SIMET+3",
    ],
    features: [
      "Material de calidad premium",
      "Acabados perfectos garantizados",
      "Resistencia total a la corrosión",
    ],
  },
  {
    title: "Limpieza Industrial Granallado",
    description:
      "Servicios de limpieza industrial especializada con técnicas avanzadas de granallado",
    icon: Zap,
    gallery: [
      "Limpieza+Industrial+SIMET+1",
      "Limpieza+Industrial+SIMET+2",
      "Limpieza+Industrial+SIMET+3",
    ],
    features: [
      "Limpieza profunda total",
      "Preparación perfecta de superficies",
      "Equipos especializados de última generación",
    ],
  },
  {
    title: "Pintura Industrial",
    description:
      "Servicios de pintura líquida y electrostática para aplicaciones industriales de alta durabilidad",
    icon: Paintbrush,
    gallery: [
      "Pintura+Industrial+SIMET+1",
      "Pintura+Industrial+SIMET+2",
      "Pintura+Industrial+SIMET+3",
    ],
    features: [
      "Pintura líquida profesional",
      "Pintura electrostática avanzada",
      "Acabados duraderos garantizados",
    ],
  },
  {
    title: "Corte por Plasma (CNC)",
    description:
      "Servicios de corte de precisión con tecnología CNC y plasma de última generación",
    icon: Zap,
    gallery: [
      "Corte+Plasma+SIMET+1",
      "Corte+Plasma+SIMET+2",
      "Corte+Plasma+SIMET+3",
    ],
    features: [
      "Precisión milimétrica garantizada",
      "Cortes complejos especializados",
      "Tecnología CNC avanzada",
    ],
  },
  {
    title: "Traslado de Equipos",
    description:
      "Servicios especializados de transporte y traslado de maquinaria industrial pesada",
    icon: Truck,
    gallery: [
      "Traslado+Equipos+SIMET+1",
      "Traslado+Equipos+SIMET+2",
      "Traslado+Equipos+SIMET+3",
    ],
    features: [
      "Transporte seguro certificado",
      "Equipos especializados",
      "Logística integral completa",
    ],
  },
  {
    title: "Ingeniería y Desarrollo de Proyectos",
    description:
      "Desarrollo completo de proyectos industriales desde la conceptualización hasta la implementación",
    icon: Cog,
    gallery: [
      "Ingenieria+Proyectos+SIMET+1",
      "Ingenieria+Proyectos+SIMET+2",
      "Ingenieria+Proyectos+SIMET+3",
    ],
    features: [
      "Diseño integral personalizado",
      "Gestión completa de proyectos",
      "Soluciones innovadoras",
    ],
  },
];

function ServiceGallery({ images, title }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const ServiceIcon = services.find((s) => s.title === title)?.icon;
  return (
    <div className="relative h-64 overflow-hidden group">
      <Image
        src={`/placeholder.svg?height=300&width=500&text=${images[currentImage]}`}
        alt={`${title} - Imagen ${currentImage + 1}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? "bg-orange-500"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* Service icon */}
      <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
        {ServiceIcon && <ServiceIcon className="h-6 w-6 text-white" />}
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-4 left-4 right-16">
        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#23398e] via-[#23398e] to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Soluciones industriales metalmecánicas integrales con la más alta
              calidad y tecnología de vanguardia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-[#23398e]/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#23398e] via-orange-500 to-[#23398e] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <Card className="relative h-full bg-gradient-to-br from-gray-800 to-[#23398e]/10 shadow-2xl border border-[#23398e]/30 overflow-hidden">
                  <ServiceGallery
                    images={service.gallery}
                    title={service.title}
                  />
                  <CardContent className="p-6">
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-[#23398e] to-orange-500 rounded-full mr-3 shadow-sm"></div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/contacto">
                      <Button className="w-full bg-gradient-to-r from-[#23398e] to-orange-500 hover:from-[#1a2d73] hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-white border-0">
                        Solicitar Cotización
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#23398e] via-[#23398e]/90 to-black text-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#23398e]/20 rounded-full blur-xl"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-[#23398e] rounded-2xl blur opacity-20"></div>
              <h2 className="relative text-4xl font-bold mb-6">
                ¿Necesitas un servicio personalizado?
              </h2>
            </div>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Contáctanos para discutir tus necesidades específicas y
              desarrollar una solución a medida para tu proyecto industrial
              metalmecánico
            </p>
            <Link href="/contacto">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-[#23398e] hover:from-orange-600 hover:to-[#1a2d73] shadow-2xl hover:shadow-[#23398e]/25 transition-all duration-300 transform hover:-translate-y-1 px-8 py-4 text-lg text-white border-0"
              >
                Contactar Ahora
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
