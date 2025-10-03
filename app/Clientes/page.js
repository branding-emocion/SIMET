"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/firebase/firebaseClient";

export default function ClientesPublic() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "clientes"));
        const clientesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          nombre: doc.data().nombre,
          imagenUrl: doc.data().imagenUrl,
        }));
        setClientes(clientesData);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/QuienesSomos/QuienesSomos.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/80" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-serif tracking-tight">
              Nuestros Clientes
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-slate-200">
              Empresas que confían en nuestros servicios
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid de Clientes */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square bg-muted animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-5 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : clientes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {clientes.map((cliente, index) => (
              <motion.div
                key={cliente.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <div className="aspect-square relative bg-muted overflow-hidden">
                    <img
                      src={
                        cliente.imagenUrl ||
                        "/placeholder.svg?height=400&width=400"
                      }
                      alt={cliente.nombre}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4 bg-card">
                    <h3 className="font-semibold text-base md:text-lg text-center text-foreground line-clamp-2 leading-tight uppercase">
                      {cliente.nombre}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg md:text-xl">
              No hay clientes disponibles en este momento.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
