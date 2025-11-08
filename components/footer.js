"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-100 text-gray-800 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              SIMET <span className="text-orange-500">AG SAC</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Industria metalmecánica con más de 10 años de experiencia en el
              sector agroindustrial, minero y pesquero.
            </p>
            <p className="text-orange-500 font-semibold">
              Confiabilidad Industrial, Innovación Constante
            </p>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-500">
              Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">
                  Sector Industrial de Moche, Trujillo
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="tel:+51950395374"
                  className="flex items-center space-x-3"
                >
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">+51 (950) 395-374</span>
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="mailto:ventas@simetag.com"
                  className="flex items-center space-x-3"
                >
                  <Mail className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">ventas@simetag.com</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Redes sociales y cotización */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-500">
              Síguenos
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors text-gray-600"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/Contacto"
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded font-semibold hover:bg-orange-600 transition-colors shadow-md"
              >
                Solicitar Cotización
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Línea divisoria y derechos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-200 mt-10 pt-8 text-center space-y-6"
        >
          {/* === Botón Login al pie de página === */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/Admin">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3 rounded-full shadow-md uppercase tracking-wide transition-all">
                Login
              </Button>
            </Link>
          </motion.div>

          {/* Derechos reservados */}
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} SIMET AG SAC. Todos los derechos
            reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
