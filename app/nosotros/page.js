"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

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

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ¿Quiénes Somos?
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conoce nuestra historia, misión y los valores que nos impulsan a
              ser líderes en el sector industrial
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur opacity-20"></div>
              <Image
                src="/placeholder.svg?height=500&width=600&text=SIMET+AG+SAC+Equipo+Industrial"
                alt="Equipo SIMET AG SAC"
                width={600}
                height={500}
                className="relative rounded-2xl shadow-2xl border border-gray-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
                <h2 className="text-4xl font-bold text-white mb-6 relative">
                  Nuestra Historia
                  <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  SIMET AG SAC es una empresa especializada en la industria
                  metalmecánica con más de 10 años de experiencia. Comenzamos
                  como un pequeño taller especializado y hoy somos una empresa
                  integral que ofrece soluciones completas para la industria.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Nuestro compromiso con la innovación constante y la excelencia
                  operacional nos ha permitido establecer relaciones duraderas
                  con clientes de diversos sectores industriales,
                  consolidándonos como líderes en confiabilidad industrial.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Mission & Vision */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 mb-20"
          >
            <motion.div variants={fadeInUp} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <Card className="relative h-full bg-gray-800 shadow-2xl border border-gray-700 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-orange-400"></div>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-orange-100 to-orange-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                      Misión
                    </h3>
                  </div>
                  <p className="text-gray-300 text-center leading-relaxed">
                    Brindar soluciones industriales integrales con los más altos
                    estándares de calidad, confiabilidad y eficiencia, superando
                    las expectativas de nuestros clientes y contribuyendo al
                    desarrollo del sector industrial con resistencia, precisión
                    y calidad sin límites.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <Card className="relative h-full bg-gray-800 shadow-2xl border border-gray-700 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-600 to-gray-500"></div>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-200 bg-clip-text text-transparent">
                      Visión
                    </h3>
                  </div>
                  <p className="text-gray-300 text-center leading-relaxed">
                    Ser la empresa líder en servicios industriales
                    metalmecánicos, reconocida por nuestra innovación constante,
                    compromiso con la excelencia operacional y por ser el socio
                    estratégico preferido de nuestros clientes en toda la
                    región.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6 relative inline-block">
              Nuestros Valores
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Los principios que guían nuestro trabajo diario
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              {
                title: "Confiabilidad",
                icon: "🛡️",
                description: "Cumplimiento garantizado en cada proyecto",
                color: "from-orange-400 to-orange-500",
              },
              {
                title: "Innovación",
                icon: "💡",
                description: "Tecnología de vanguardia constante",
                color: "from-blue-400 to-blue-500",
              },
              {
                title: "Calidad",
                icon: "⭐",
                description: "Excelencia sin límites",
                color: "from-yellow-400 to-orange-500",
              },
              {
                title: "Precisión",
                icon: "🎯",
                description: "Exactitud en cada detalle",
                color: "from-green-400 to-blue-500",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
              >
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${value.color} rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000`}
                ></div>
                <div className="relative text-center p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 relative inline-block">
              Nuestro Equipo
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Profesionales altamente capacitados comprometidos con la
              excelencia industrial
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ing. Juan Pérez",
                role: "Director General",
                image: "Director+General+SIMET",
              },
              {
                name: "Ing. María González",
                role: "Jefa de Operaciones",
                image: "Jefa+Operaciones+SIMET",
              },
              {
                name: "Ing. Carlos Rodríguez",
                role: "Jefe de Proyectos",
                image: "Jefe+Proyectos+SIMET",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                  <div className="relative overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=${member.image}`}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-orange-400 font-semibold">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
