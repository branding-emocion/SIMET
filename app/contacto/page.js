"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(35,57,142,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#23398e]">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos listos para ayudarte con tu próximo proyecto industrial
              metalmecánico. Ponte en contacto con SIMET AG SAC
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(35,57,142,0.05),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-[#23398e] mb-6">
                  Información de Contacto
                </h2>
                <p className="text-gray-600 mb-8">
                  Nuestro equipo especializado está disponible para atender tus
                  consultas y brindarte la mejor asesoría para tu proyecto
                  industrial metalmecánico.
                </p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-gradient-to-r from-[#23398e] to-orange-500 p-3 rounded-lg shadow-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Teléfono
                    </h3>
                    <p className="text-gray-600">+51 (xxx) xxx-xxxx</p>
                    <p className="text-gray-600">+51 (xxx) xxx-xxxx</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-[#23398e] p-3 rounded-lg shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email
                    </h3>
                    <p className="text-gray-600">contacto@simetag.com</p>
                    <p className="text-gray-600">ventas@simetag.com</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-gradient-to-r from-[#23398e] to-orange-500 p-3 rounded-lg shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Dirección
                    </h3>
                    <p className="text-gray-600">Zona Industrial</p>
                    <p className="text-gray-600">Lima, Perú</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-[#23398e] p-3 rounded-lg shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Horarios
                    </h3>
                    <p className="text-gray-600">
                      Lunes a Viernes: 8:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-600">Sábados: 8:00 AM - 2:00 PM</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="shadow-xl bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#23398e] mb-6">
                    Envíanos un Mensaje
                  </h3>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="nombre"
                          className="text-gray-700 font-medium"
                        >
                          Nombre *
                        </Label>
                        <Input
                          id="nombre"
                          placeholder="Tu nombre completo"
                          className="mt-1 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#23398e] focus:ring-[#23398e]"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="empresa"
                          className="text-gray-700 font-medium"
                        >
                          Empresa
                        </Label>
                        <Input
                          id="empresa"
                          placeholder="Nombre de tu empresa"
                          className="mt-1 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#23398e] focus:ring-[#23398e]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-gray-700 font-medium"
                        >
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="mt-1 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#23398e] focus:ring-[#23398e]"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="telefono"
                          className="text-gray-700 font-medium"
                        >
                          Teléfono
                        </Label>
                        <Input
                          id="telefono"
                          placeholder="Tu número de teléfono"
                          className="mt-1 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#23398e] focus:ring-[#23398e]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="servicio"
                        className="text-gray-700 font-medium"
                      >
                        Servicio de Interés
                      </Label>
                      <select
                        id="servicio"
                        className="w-full mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:border-[#23398e] focus:ring-[#23398e]"
                      >
                        <option value="">Selecciona un servicio</option>
                        <option value="fabricacion">
                          Fabricación Industrial
                        </option>
                        <option value="mantenimiento">Mantenimiento</option>
                        <option value="naves">Naves Industriales</option>
                        <option value="agricola">Equipo Agrícola</option>
                        <option value="inoxidable">
                          Trabajos en Inoxidable
                        </option>
                        <option value="pintura">Pintura Industrial</option>
                        <option value="plasma">Corte por Plasma</option>
                        <option value="ingenieria">
                          Ingeniería y Proyectos
                        </option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <Label
                        htmlFor="mensaje"
                        className="text-gray-700 font-medium"
                      >
                        Mensaje *
                      </Label>
                      <Textarea
                        id="mensaje"
                        placeholder="Describe tu proyecto o consulta..."
                        rows={4}
                        className="mt-1 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#23398e] focus:ring-[#23398e]"
                      />
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-[#23398e] to-orange-500 hover:from-[#1a2d73] hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-100 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#23398e]/10 rounded-full blur-xl"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#23398e] mb-6">
              Nuestra Ubicación
            </h2>
            <p className="text-xl text-gray-600">
              Visítanos en nuestras instalaciones industriales
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white border border-gray-200 h-96 rounded-lg flex items-center justify-center shadow-xl"
          >
            <p className="text-gray-500">
              Mapa interactivo de SIMET AG SAC aquí
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
