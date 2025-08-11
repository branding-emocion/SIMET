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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contáctanos</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Estamos listos para ayudarte con tu próximo proyecto industrial
              metalmecánico. Ponte en contacto con SIMET AG SAC
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-[#23398e]/20">
        <div className="container mx-auto px-4">
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
                <h2 className="text-3xl font-bold text-white mb-6">
                  Información de Contacto
                </h2>
                <p className="text-gray-300 mb-8">
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
                  <div className="bg-gradient-to-r from-[#23398e] to-orange-500 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Teléfono
                    </h3>
                    <p className="text-gray-300">+51 (xxx) xxx-xxxx</p>
                    <p className="text-gray-300">+51 (xxx) xxx-xxxx</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-[#23398e] p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <p className="text-gray-300">contacto@simetag.com</p>
                    <p className="text-gray-300">ventas@simetag.com</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-gradient-to-r from-[#23398e] to-orange-500 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Dirección
                    </h3>
                    <p className="text-gray-300">Zona Industrial</p>
                    <p className="text-gray-300">Lima, Perú</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center space-x-4"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-[#23398e] p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Horarios
                    </h3>
                    <p className="text-gray-300">
                      Lunes a Viernes: 8:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-300">Sábados: 8:00 AM - 2:00 PM</p>
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
              <Card className="shadow-xl bg-gradient-to-br from-gray-800 to-[#23398e]/10 border border-[#23398e]/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Envíanos un Mensaje
                  </h3>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombre" className="text-gray-300">
                          Nombre *
                        </Label>
                        <Input
                          id="nombre"
                          placeholder="Tu nombre completo"
                          className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="empresa" className="text-gray-300">
                          Empresa
                        </Label>
                        <Input
                          id="empresa"
                          placeholder="Nombre de tu empresa"
                          className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-gray-300">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefono" className="text-gray-300">
                          Teléfono
                        </Label>
                        <Input
                          id="telefono"
                          placeholder="Tu número de teléfono"
                          className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="servicio" className="text-gray-300">
                        Servicio de Interés
                      </Label>
                      <select
                        id="servicio"
                        className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
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
                      <Label htmlFor="mensaje" className="text-gray-300">
                        Mensaje *
                      </Label>
                      <Textarea
                        id="mensaje"
                        placeholder="Describe tu proyecto o consulta..."
                        rows={4}
                        className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-[#23398e] to-orange-500 hover:from-[#1a2d73] hover:to-orange-600 text-white border-0"
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
      <section className="py-20 bg-gradient-to-br from-[#23398e] via-[#23398e]/90 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Nuestra Ubicación
            </h2>
            <p className="text-xl text-blue-100">
              Visítanos en nuestras instalaciones industriales
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-800 to-[#23398e]/20 border border-[#23398e]/30 h-96 rounded-lg flex items-center justify-center"
          >
            <p className="text-gray-400">
              Mapa interactivo de SIMET AG SAC aquí
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
