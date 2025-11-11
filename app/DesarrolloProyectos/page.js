"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function DesarrolloProyectos() {
  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      {/* === HERO === */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/QuienesSomos/QuienesSomos.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
            Ingeniería y <span className="text-amber-500">Desarrollo</span> de Proyectos
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed">
            Desarrollamos soluciones integrales de ingeniería: desde la planificación y diseño
            hasta la ejecución, garantizando eficiencia, seguridad y calidad.
          </p>
        </motion.div>
      </section>

      {/* === SECCIÓN PRINCIPAL === */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white via-gray-50 to-amber-50/20">
        {/* Texto institucional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="w-24 h-[3px] bg-amber-500 mx-auto mb-5 rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Compromiso, innovación y precisión
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            En <span className="font-semibold text-amber-600">Grupo SIMET</span>, la ingeniería y
            desarrollo de proyectos son el pilar de nuestro servicio industrial. Diseñamos,
            planificamos y ejecutamos proyectos con excelencia técnica, innovación y seguridad.
          </p>
        </motion.div>

        {/* Imágenes representativas */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              src: "/Ingenieria/personas-trabajando.avif",
              alt: "Equipo de ingeniería planificando un proyecto",
            },
            {
              src: "/Ingenieria/planos.jpg",
              alt: "Diseño técnico y planos industriales",
            },
            {
              src: "/Ingenieria/pc-ingenieria.jpg",
              alt: "Desarrollo de proyectos en computadora",
            },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative h-[320px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Capacidades y valores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {[
            {
              title: "Diseño y planificación técnica",
              desc: "Elaboramos planos, cálculos estructurales y modelado 3D con precisión y seguridad para cada proyecto.",
            },
            {
              title: "Gestión integral de proyectos",
              desc: "Coordinamos y supervisamos todas las etapas, asegurando calidad, plazos y cumplimiento normativo.",
            },
            {
              title: "Optimización de procesos industriales",
              desc: "Modernizamos sistemas productivos y mejoramos la eficiencia de líneas de trabajo.",
            },
            {
              title: "Asesoría técnica especializada",
              desc: "Brindamos soporte técnico y consultoría personalizada durante todo el desarrollo del proyecto.",
            },
            {
              title: "Cálculo estructural y mecánico",
              desc: "Dimensionamos cada componente siguiendo estándares internacionales de ingeniería.",
            },
            {
              title: "Innovación y seguridad industrial",
              desc: "Incorporamos tecnologías avanzadas y prácticas seguras en cada fase de ejecución.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2"
            >
              <h3 className="text-xl font-semibold text-amber-600 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* === CTA (Llamado a la acción) === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-block px-10 py-6 bg-amber-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <Link href="/Contacto" className="text-lg font-semibold tracking-wide">
              Solicita tu proyecto
            </Link>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Nuestro equipo te asesorará para llevar tus ideas a la realidad industrial.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
