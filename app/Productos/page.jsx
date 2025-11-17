"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ProductosIndustrialesPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos industriales desde Firestore
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, "productosIndustriales"));
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* === HERO === */}
{/* === HERO === */}
<section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
  {/* Background */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url('/soldadoNosotros.jpg')`,
    }}
  />

  {/* Overlay oscuro */}
  <div className="absolute inset-0 bg-slate-900/70" />

  {/* Contenido */}
  <div className="relative z-10 container mx-auto px-4 text-center text-white">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif uppercase">
        Productos Industriales
      </h1>
      <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
        Componentes y estructuras fabricadas con los más altos estándares industriales.
      </p>
    </motion.div>
  </div>
</section>


      {/* === LISTADO === */}
      <section className="py-16 px-4 container mx-auto">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden shadow-md">
                <Skeleton className="w-full h-56" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : productos.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">
              No hay productos registrados
            </h2>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {productos.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <img
                      src={p.imagen || "/placeholder.jpg"}
                      alt={p.nombre}
                      className="w-full h-56 object-cover"
                    />

                    <CardHeader>
                      <CardTitle className="text-gray-800">
                        {p.nombre}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-600 line-clamp-4 mb-4">
                        {p.descripcion}
                      </p>

                      {/* === BOTÓN NARANJA === */}
                      <Link href={`/Productos/${p.id}`}>
                        <button className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
                          Ver Detalles
                        </button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </div>
  );
}
