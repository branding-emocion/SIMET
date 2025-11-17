"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";

export default function ProductosIndustrialesPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

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

  // === FILTRADO EN TIEMPO REAL ===
  const productosFiltrados = productos.filter((p) =>
    (p.nombre + " " + p.descripcion)
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* === HERO === */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/soldadoNosotros.jpg')` }}
        />
        <div className="absolute inset-0 bg-slate-900/70"></div>

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

      {/* === BUSCADOR === */}
      <section className="container mx-auto px-4 mt-10 mb-6">
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="
              w-full pl-12 pr-4 py-3
              border border-gray-300 rounded-xl
              shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500
              outline-none transition-all
            "
          />
        </div>
      </section>

      {/* === LISTADO === */}
      <section className="py-16 px-4 container mx-auto">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-0 shadow">
                <Skeleton className="h-56 w-full" />
                <CardHeader>
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">
              No se encontraron productos
            </h2>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="productos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {productosFiltrados.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow group overflow-hidden">
                    {/* === IMAGEN === */}
                    <div className="relative aspect-video overflow-hidden rounded-t">
                      {p.imagen ? (
                        <img
                          src={p.imagen}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200">
                          Sin imagen
                        </div>
                      )}

                      <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                        Industrial
                      </Badge>
                    </div>

                    {/* === TITULO === */}
                    <CardHeader>
                      <CardTitle className="text-gray-800 group-hover:text-orange-500 transition">
                        {p.nombre}
                      </CardTitle>
                    </CardHeader>

                    {/* === DESCRIPCIÓN Y BOTÓN === */}
                    <CardContent>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {p.descripcion}
                      </p>

                      <Link href={`/Productos/${p.id}`}>
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition shadow-md hover:shadow-lg">
                          Ver Detalles →
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
