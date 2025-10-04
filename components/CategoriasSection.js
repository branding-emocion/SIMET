"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ServiciosSection() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "servicios"));
        const serviciosData = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          numero: String(index + 1).padStart(2, "0"),
          ...doc.data(),
        }));
        setServicios(serviciosData);
      } catch (error) {
        console.error("Error al cargar servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  const handleServicioClick = (servicioNombre) => {
    router.push(`/productos?servicio=${encodeURIComponent(servicioNombre)}`);
  };

  if (loading) {
    return (
      <section className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicios.map((servicio, index) => (
            <motion.div
              key={servicio.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleServicioClick(servicio.nombre)}
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: servicio.imagen
                  ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${servicio.imagen})`
                  : "none",
                backgroundColor: servicio.imagen ? "transparent" : "#FF6B35",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Número grande */}
              <div className="absolute top-6 left-6 text-white font-bold text-7xl leading-none opacity-90">
                {servicio.numero}
              </div>

              {/* Contenido de texto */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-bold text-2xl mb-2 capitalize">
                  {servicio.nombre}
                </h3>
                {servicio.descripcion && (
                  <p className="text-white/90 text-sm leading-relaxed">
                    {servicio.descripcion}
                  </p>
                )}
              </div>

              {/* Overlay hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
