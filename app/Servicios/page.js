"use client";

import { Suspense, use, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Servicios({ searchParams }) {
  const categoriaParam = use(searchParams).categoria;

  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const scrollRef = useRef(null);

  const ORDEN_CATEGORIAS = [
    "Fabricación Industrial",
    "Instalaciones y Soldadura",
    "Inoxidable",
    "Procesos de Mecanizado y Maestranza",
    "Limpieza y Granallado",
    "Acabados y Pintura",
    "Servicios Logísticos",
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (categoriaParam && categorias.length > 0) {
      const found = categorias.find(
        (cat) => cat.nombre.trim() === categoriaParam.trim()
      );
      if (found) setFiltroCategoria(found.id);
    }
  }, [categoriaParam, categorias]);

  const loadData = async () => {
    try {
      const [catSnap, prodSnap] = await Promise.all([
        getDocs(collection(db, "categorias")),
        getDocs(collection(db, "productos")),
      ]);

      let categoriasData = catSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let productosData = prodSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      categoriasData.sort(
        (a, b) =>
          ORDEN_CATEGORIAS.indexOf(a.nombre) -
          ORDEN_CATEGORIAS.indexOf(b.nombre)
      );

      setCategorias(categoriasData);
      setProductos(productosData);
    } finally {
      setLoading(false);
      setTimeout(checkScroll, 300);
    }
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollLeftFn = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(checkScroll, 200);
  };

  const scrollRightFn = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(checkScroll, 200);
  };

  const productosFiltrados =
    filtroCategoria === "Todos"
      ? productos
      : productos.filter((p) => p.categoriaId === filtroCategoria);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/QuienesSomos/QuienesSomos.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/60" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold uppercase mb-4"
          >
            Nuestros Servicios
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-2xl text-gray-200"
          >
            Descubre la excelencia en cada servicio que ofrecemos
          </motion.p>
        </div>
      </section>

      <Suspense fallback={<div className="py-20 text-center">Cargando...</div>}>
        <section className="py-16 relative">
          <div className="container mx-auto px-4 relative">

            {/* ========================================================= */}
            {/* === CATEGORÍAS + FLECHAS (CORREGIDO, NO ENCIMA DEL TEXTO) */}
            {/* ========================================================= */}

            {/* === CONTENEDOR DE CATEGORÍAS + FLECHAS (CORREGIDO) === */}
<div className="relative w-full mb-6 flex items-center justify-between">

  {/* Flecha izquierda (FUERA del scroll) */}
  {showLeft && (
    <button
      onClick={scrollLeftFn}
      className="text-black hover:text-orange-500 transition p-0 bg-transparent"
    >
      <ChevronLeft size={32} />
    </button>
  )}

  {/* CATEGORÍAS (scroll) */}
  <div
    ref={scrollRef}
    onScroll={checkScroll}
    className="
      flex gap-6 
      overflow-x-auto 
      scrollbar-hide 
      border-b 
      border-gray-200 
      pb-3 
      whitespace-nowrap 
      w-full
      px-4
    "
    style={{ scrollBehavior: "smooth" }}
  >
    <button
      onClick={() => setFiltroCategoria("Todos")}
      className={`px-4 py-2 rounded-t-md text-sm md:text-base transition ${
        filtroCategoria === "Todos"
          ? "bg-orange-500 text-white"
          : "text-gray-700 hover:text-orange-500"
      }`}
    >
      Todos
    </button>

    {categorias.map((cat) => (
      <button
        key={cat.id}
        onClick={() => setFiltroCategoria(cat.id)}
        className={`px-4 py-2 rounded-t-md text-sm md:text-base transition ${
          filtroCategoria === cat.id
            ? "bg-orange-500 text-white"
            : "text-gray-700 hover:text-orange-500"
        }`}
      >
        {cat.nombre}
      </button>
    ))}
  </div>

  {/* Flecha derecha (FUERA del scroll) */}
  {showRight && (
    <button
      onClick={scrollRightFn}
      className="text-black hover:text-orange-500 transition p-0 bg-transparent"
    >
      <ChevronRight size={32} />
    </button>
  )}

</div>


            {/* === GRID === */}
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
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
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={filtroCategoria}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
                >
                  {productosFiltrados.map((producto) => {
                    const categoria = categorias.find(
                      (c) => c.id === producto.categoriaId
                    );

                    const videoId =
                      producto.videos &&
                      producto.videos[0] &&
                      producto.videos[0].includes("youtube.com")
                        ? new URL(producto.videos[0]).searchParams.get("v")
                        : null;

                    return (
                      <Card key={producto.id} className="border-0 shadow group">
                        <div className="relative aspect-video overflow-hidden rounded-t">
                          {videoId ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          ) : producto.imagenes?.[0] ? (
                            <img
                              src={producto.imagenes[0]}
                              className="w-full h-full object-cover group-hover:scale-110 transition"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200">
                              Sin imagen
                            </div>
                          )}

                          {categoria && (
                            <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                              {categoria.nombre}
                            </Badge>
                          )}
                        </div>

                        <CardHeader>
                          <CardTitle className="group-hover:text-orange-500 transition">
                            {producto.nombre}
                          </CardTitle>
                        </CardHeader>

                        <CardContent>
                          <p className="text-gray-600 line-clamp-3">
                            {producto.descripcion}
                          </p>
                          <Link
                            href={`/Servicios/${producto.id}?categoria=${categoria?.nombre}`}
                          >
                            <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-4">
                              Ver Detalles →
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
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
