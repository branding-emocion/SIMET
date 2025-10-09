"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { Package, ShoppingBag } from "lucide-react";

export default function ServiciosGrid() {
  const searchParams = useSearchParams();
  const categoriaParam = searchParams.get("categoria");

  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("productos", productos);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (categoriaParam && categorias.length > 0) {
      const categoriaEncontrada = categorias.find((cat) => {
        return cat.nombre.trim() === categoriaParam.trim();
      });

      console.log("categoriaEncontrada", categoriaEncontrada);

      if (categoriaEncontrada) {
        setFiltroCategoria(categoriaEncontrada.id);
      }
    }
  }, [categoriaParam, categorias]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoriasSnap, productosSnap] = await Promise.all([
        getDocs(collection(db, "categorias")),
        getDocs(collection(db, "productos")),
      ]);

      const categoriasData = categoriasSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const productosData = productosSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategorias(categoriasData);
      setProductos(productosData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const productosFiltrados =
    filtroCategoria === "Todos"
      ? productos
      : productos.filter((p) => p.categoriaId === filtroCategoria);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/QuienesSomos/QuienesSomos.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/60" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif uppercase tracking-tight">
              Nuestros Servicios
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-100">
              Descubre la excelencia en cada servicio que ofrecemos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          {loading ? (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-32 rounded-full" />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-12  "
            >
              <Button
                variant={filtroCategoria === "Todos" ? "default" : "outline"}
                onClick={() => setFiltroCategoria("Todos")}
                className={`rounded-full px-6 transition-all duration-300 uppercase ${
                  filtroCategoria === "Todos"
                    ? "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30"
                    : "border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                }`}
              >
                <Package className="w-4 h-4 mr-2" />
                Todos
              </Button>
              {categorias.map((categoria) => (
                <Button
                  key={categoria.id}
                  variant={
                    filtroCategoria === categoria.id ? "default" : "outline"
                  }
                  onClick={() => setFiltroCategoria(categoria.id)}
                  className={`rounded-full px-6 transition-all duration-300 uppercase ${
                    filtroCategoria === categoria.id
                      ? "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30"
                      : "border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  {categoria.nombre}
                </Button>
              ))}
            </motion.div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 shadow-lg">
                  <Skeleton className="w-full h-56" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : productosFiltrados.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-6">
                <ShoppingBag className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No hay productos disponibles
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No se encontraron productos en esta categoría. Intenta con otra
                categoría.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={filtroCategoria}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {productosFiltrados.map((producto, index) => {
                  const categoria = categorias.find(
                    (cat) => cat.id == producto.categoriaId
                  );

                  return (
                    <motion.div
                      key={producto.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden h-full flex flex-col">
                        <div className="relative overflow-hidden">
                          <div className="aspect-video relative">
                            <img
                              src={producto.imagenes?.[0] || ""}
                              alt={producto.nombre}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {categoria && (
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg backdrop-blur-sm">
                                {categoria.nombre}
                              </Badge>
                            </div>
                          )}

                          {producto.precio > 0 && (
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                              <span className="text-orange-600 font-bold text-sm">
                                ${producto.precio.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>

                        <CardHeader className="flex-grow">
                          <CardTitle className="text-slate-800 group-hover:text-orange-500 transition-colors text-balance leading-tight">
                            {producto.nombre}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-gray-600 leading-relaxed line-clamp-3 text-pretty">
                            {producto.descripcion}
                          </p>
                          <Link
                            href={`/Servicios/${producto.id}?categoria=${
                              categoria?.nombre || ""
                            }`}
                          >
                            <Button className="w-full bg-orange-500 hover:cursor-pointer hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                              <span className="uppercase">Ver Detalles</span>
                              <svg
                                className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
