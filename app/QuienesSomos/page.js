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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/QuienesSomos/QuienesSomos.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif uppercase">
              Nuestro Equipo
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Profesionales altamente calificados con décadas de experiencia
              combinada, comprometidos con brindar el mejor servicio a
              nuestros clientes
            </p>
          </motion.div>
        </div>
      </section>
      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#23398e] to-orange-600 rounded-2xl blur opacity-20"></div>
              <Image
                src="/soldadoNosotros.jpg"
                alt="Equipo SIMET AG SAC"
                width={600}
                height={500}
                className="relative rounded-2xl shadow-2xl border border-gray-200 mx-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                <h2 className="text-4xl font-bold text-[#23398e] mb-6 relative">
                  ¿Quiénes Somos?{" "}
                  <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-orange-500 to-[#23398e]"></div>
                </h2>
                <p className="text-gray-600 mb-2 leading-relaxed">
                  Somos una industria metalmecánica, con más de 10 años en el
                  mercado ejecutando proyectos de diseño, fabricación,
                  mantenimiento y montaje de estructuras y productos metálicos
                  para el sector agroindustrial, industria minera y pesquera.
                </p>
                <p className="text-gray-600 mb-2 leading-relaxed">
                  Contamos con un equipo altamente calificado y experimentado en
                  todas las especialidades, profesionales dinámicos y capaces de
                  enfrentar los nuevos retos y desafíos del mundo de hoy.
                </p>
                <p className="text-gray-600 mb-2 leading-relaxed">
                  Durante estos años de servicio hemos logrado consolidar una
                  sólida cartera de clientes con éxitos satisfactorios en el
                  desarrollo de nuestros productos y servicios, quienes siguen
                  premiando nuestro esfuerzo y dedicación por atender sus
                  necesidades y satisfacer sus requerimientos, garantizando
                  resultados óptimos en tiempo récord y con precios competitivos
                  en el mercado.
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
              <div className="absolute -inset-1 bg-gradient-to-r from-[#23398e] to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <Card className="relative h-full bg-white shadow-2xl border border-gray-200 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#23398e] to-orange-400"></div>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-orange-100 to-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-[#23398e] bg-clip-text text-transparent">
                      Misión
                    </h3>
                  </div>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Asegurar la calidad en la fabricación, montaje y
                    mantenimiento de los productos y servicios que brindamos a
                    todos nuestros clientes a través de la verificación y
                    seguimiento profesional e independiente, creando confianza y
                    reconocimiento de nuestros clientes.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-[#23398e] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <Card className="relative h-full bg-white shadow-2xl border border-gray-200 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-[#23398e]"></div>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-blue-100 to-orange-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#23398e] to-orange-400 bg-clip-text text-transparent">
                      Visión
                    </h3>
                  </div>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Ser una industria líder e innovadora en los servicios de
                    fabricación, montaje y mantenimiento metalmecánico sobre
                    nuestra marca. Dirigiremos nuestro liderazgo con entusiasmo
                    y con total compromiso de brindar soluciones y satisfacción
                    a nuestros clientes.
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
            <h2 className="text-4xl font-bold text-[#23398e] mb-6 relative inline-block">
              Nuestros Valores
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#23398e] to-orange-400"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                color: "from-orange-400 to-[#23398e]",
              },
              {
                title: "Innovación",
                icon: "💡",
                description: "Tecnología de vanguardia constante",
                color: "from-[#23398e] to-blue-500",
              },
              {
                title: "Calidad",
                icon: "⭐",
                description: "Excelencia sin límites",
                color: "from-orange-400 to-orange-500",
              },
              {
                title: "Precisión",
                icon: "🎯",
                description: "Exactitud en cada detalle",
                color: "from-[#23398e] to-orange-500",
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
                <div className="relative text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-[#23398e] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-gray-50 text-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#23398e] mb-6 relative inline-block">
              Nuestro Equipo
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-orange-500 to-[#23398e]"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                <div className="absolute -inset-1 bg-gradient-to-r from-[#23398e] to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  <div className="relative overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=${member.image}`}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#23398e]/60 to-transparent"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-[#23398e] mb-2">
                      {member.name}
                    </h3>
                    <p className="text-orange-500 font-semibold">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
