"use client";

import { motion } from "framer-motion";
import { ArrowRight, Factory, Wrench, Paintbrush, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
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
    "GLORIA",
    "CAMPOSOL",
    "DANPER",
    "TALSA",
    "COPEINCA",
    "AUSTRAL",
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.div
                className="inline-block bg-orange-500 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
              >
                SIMET AG SAC
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                INDUSTRIA
                <br />
                <span className="text-orange-500">METALMECÁNICA</span>
                <br />
                EXPERTOS
              </motion.h1>

              <motion.p
                className="text-xl mb-8 text-gray-300 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Más de 10 años ejecutando proyectos de diseño, fabricación y
                mantenimiento para el sector agroindustrial, minero y pesquero.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/servicios">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-black font-semibold"
                  >
                    Ver Servicios
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                  >
                    Contactar
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=500&text=Trabajador+Industrial+Soldando"
                  alt="Trabajador industrial"
                  width={500}
                  height={600}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center items-center space-x-12 overflow-hidden"
          >
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-400 font-semibold text-lg whitespace-nowrap"
              >
                {client}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/placeholder.svg?height=400&width=600&text=Planta+Industrial+SIMET"
                alt="Planta industrial SIMET"
                width={600}
                height={400}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent rounded-lg"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="inline-block bg-orange-500 text-black px-3 py-1 rounded text-sm font-semibold mb-4">
                QUIÉNES SOMOS
              </div>

              <h2 className="text-4xl font-bold mb-6">
                LÍDERES EN
                <br />
                <span className="text-orange-500">METALMECÁNICA</span>
              </h2>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Somos una industria metalmecánica con más de 10 años en el
                mercado ejecutando proyectos de diseño, fabricación,
                mantenimiento y montaje de estructuras y productos metálicos
                para el sector agroindustrial, industria minera y pesquera.
              </p>

              <Link href="/nosotros">
                <Button className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black">
                  Leer Más
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              NUESTROS <span className="text-orange-500">SERVICIOS</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Soluciones integrales para la industria metalmecánica
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <Link href={service.href}>
                  <div className="bg-orange-500 p-8 rounded-lg h-full flex flex-col justify-between hover:bg-orange-600 transition-colors">
                    <div>
                      <div className="text-black/20 text-6xl font-bold mb-4">
                        {service.number}
                      </div>
                      <service.icon className="w-8 h-8 text-black mb-4" />
                      <h3 className="text-black font-bold text-xl mb-2">
                        {service.title}
                      </h3>
                      <p className="text-black/80 font-semibold mb-3">
                        {service.subtitle}
                      </p>
                      <p className="text-black/70 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="inline-block bg-orange-500 text-black px-3 py-1 rounded text-sm font-semibold mb-4">
                DESARROLLO DE PROYECTOS
              </div>

              <h2 className="text-4xl font-bold mb-6">
                INGENIERÍA Y
                <br />
                <span className="text-orange-500">DESARROLLO</span>
              </h2>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Contamos con un equipo altamente calificado y experimentado en
                todas las especialidades, profesionales dinámicos capaces de
                enfrentar los nuevos retos y desafíos del mundo industrial
                actual.
              </p>

              <Link href="/proyectos">
                <Button className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black">
                  Ver Proyectos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/placeholder.svg?height=400&width=600&text=Proyecto+Industrial+en+Desarrollo"
                alt="Desarrollo de proyectos"
                width={600}
                height={400}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
