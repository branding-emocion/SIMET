"use client";
import { Suspense, use, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { ShoppingBag } from "lucide-react";

export default function Servicios({ searchParams }) {
  const categoriaParam = use(searchParams).categoria;

  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (categoriaParam && categorias.length > 0) {
      const categoriaEncontrada = categorias.find(
        (cat) => cat.nombre.trim() === categoriaParam.trim()
      );
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
      {/* === Hero Section === */}
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

      {/* === Contenido === */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* === Filtros tipo pestañas === */}
            {loading ? (
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-md" />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-nowrap justify-start md:justify-center gap-4 mb-12 border-b border-gray-200 overflow-x-auto scrollbar-hide px-2"
              >
                {/* Botón "Todos" */}
                <button
                  onClick={() => setFiltroCategoria("Todos")}
                  className={`relative px-4 py-2 text-sm md:text-base font-medium rounded-t-md whitespace-nowrap transition-all duration-200 ${
                    filtroCategoria === "Todos"
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  Todos
                </button>

                {/* Botones de categorías */}
                {categorias.map((categoria) => (
                  <button
                    key={categoria.id}
                    onClick={() => setFiltroCategoria(categoria.id)}
                    className={`relative px-4 py-2 text-sm md:text-base font-medium rounded-t-md whitespace-nowrap transition-all duration-200 ${
                      filtroCategoria === categoria.id
                        ? "bg-orange-500 text-white shadow-sm"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    {categoria.nombre}
                  </button>
                ))}
              </motion.div>
            )}

            {/* === Grid de Servicios === */}
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
                  No se encontraron servicios en esta categoría. Intenta con
                  otra.
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
                      (cat) => cat.id === producto.categoriaId
                    );

                    // Extraer ID de video si hay uno
                    const videoId =
                      producto.videos?.length > 0 &&
                      producto.videos[0].includes("youtube.com")
                        ? new URL(producto.videos[0]).searchParams.get("v")
                        : null;

                    return (
                      <motion.div
                        key={producto.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden h-full flex flex-col">
                          <div className="relative aspect-video overflow-hidden rounded-t-lg">
                            {videoId ? (
                              <iframe
                                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                                title={`Video de ${producto.nombre}`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                              />
                            ) : (
                              <img
                                src={producto.imagenes?.[0] || ""}
                                alt={producto.nombre}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            )}

                            {/* Overlay con degradado */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Badge de categoría */}
                            {categoria && (
                              <div className="absolute top-4 left-4">
                                <Badge className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg backdrop-blur-sm">
                                  {categoria.nombre}
                                </Badge>
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
                              href={`/Servicios/${producto.id}?categoria=${categoria?.nombre || ""}`}
                            >
                              <Button className="w-full bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300 group/btn">
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
      </Suspense>
    </div>
  );
}
