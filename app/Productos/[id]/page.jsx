"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { db } from "@/firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductoDetalle() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db, "productosIndustriales", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProducto(snap.data());
        }
      } catch (e) {
        console.error("Error cargando producto:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-xl">
        Cargando...
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-xl">
        Producto no encontrado
      </div>
    );
  }

  const galeria = producto.galeria || [];

  const nextImg = () => {
    setImgIndex((prev) => (prev + 1) % galeria.length);
  };

  const prevImg = () => {
    setImgIndex((prev) => (prev - 1 + galeria.length) % galeria.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* === HERO === */}
      <section className="h-[40vh] flex items-center justify-center bg-black/40 relative">
        <img
          src={producto.imagen}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <h1 className="relative text-4xl md:text-6xl font-bold text-white">
          {producto.nombre}
        </h1>
      </section>

      <div className="container mx-auto px-4 mt-12">
        {/* === GALERÍA === */}
        {galeria.length > 0 && (
          <div className="relative w-full max-w-4xl mx-auto mb-12">
            <img
              src={galeria[imgIndex]}
              className="w-full h-[420px] object-cover rounded-xl shadow-lg"
            />

            {/* Flecha Izquierda */}
            <button
              onClick={prevImg}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-orange-500 hover:text-white p-2 rounded-full shadow-md transition"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Flecha Derecha */}
            <button
              onClick={nextImg}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-orange-500 hover:text-white p-2 rounded-full shadow-md transition"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}

        {/* === DESCRIPCIÓN === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto leading-relaxed text-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Descripción
          </h2>
          <p>{producto.descripcion}</p>
        </motion.div>
      </div>
    </div>
  );
}
