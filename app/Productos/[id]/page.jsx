"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { db } from "@/firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Swal from "sweetalert2";

// =======================================================
// FORMULARIO DE CONTACTO (IGUAL AL DE SERVICIOS)
// =======================================================
function FormularioContacto({ producto }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.telefono || !form.mensaje) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios.",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/SendServiceMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, servicio: producto.nombre }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Mensaje enviado",
          text: "Gracias por contactarnos. Nos comunicaremos contigo pronto.",
          confirmButtonColor: "#16a34a",
          background: "#f0fdf4",
        });
        setForm({
          nombre: "",
          email: "",
          telefono: "",
          empresa: "",
          mensaje: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al enviar",
          text: "No se pudo enviar el mensaje. Intenta nuevamente.",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Card className="sticky top-4 shadow-lg border border-orange-100 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 px-6">
        <CardTitle className="text-xl font-semibold">
          Solicitar más información
        </CardTitle>
        <p className="text-white/90 text-sm leading-relaxed">
          Completa tus datos y te contactaremos sobre este producto.
        </p>
      </CardHeader>

      <CardContent className="bg-white p-7 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              name: "nombre",
              label: "Nombre *",
              placeholder: "Ingrese su nombre",
            },
            {
              name: "email",
              label: "Email *",
              placeholder: "Ingrese su email",
              type: "email",
            },
            {
              name: "telefono",
              label: "Teléfono *",
              placeholder: "Ingrese su teléfono",
            },
            {
              name: "empresa",
              label: "Empresa (opcional)",
              placeholder: "Ingrese su empresa",
            },
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required={!field.label.toLowerCase().includes("opcional")}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Descripción / Mensaje *
            </label>
            <textarea
              name="mensaje"
              rows="4"
              value={form.mensaje}
              onChange={handleChange}
              required
              placeholder="Describe brevemente tu consulta..."
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className={`w-full h-11 text-sm font-semibold text-white rounded-lg shadow-md transition-all ${
              enviando
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {enviando ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

// =======================================================
// DETALLE DEL PRODUCTO (CON FORMULARIO INTEGRADO)
// =======================================================
export default function ProductoDetalle() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, "productosIndustriales", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProducto(snap.data());
      }
      setLoading(false);
    };

    load();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-xl">
        Cargando...
      </div>
    );

  if (!producto)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-xl">
        Producto no encontrado
      </div>
    );

  const galeria = producto.galeria || [];

  const nextImg = () => setImgIndex((i) => (i + 1) % galeria.length);
  const prevImg = () => setImgIndex((i) => (i - 1 + galeria.length) % galeria.length);

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* === HERO === */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <img
          src={producto.imagen}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/60" />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white text-4xl md:text-6xl font-bold font-serif"
        >
          {producto.nombre}
        </motion.h1>
      </section>

      {/* === CONTENIDO === */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* === COLUMNA PRODUCTO === */}
          <div className="lg:col-span-2 space-y-10">

            {/* GALERÍA */}
            {galeria.length > 0 && (
              <Card className="shadow-lg border border-gray-200 rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Galería del producto
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="relative w-full max-w-3xl mx-auto">
                    <img
                      src={galeria[imgIndex]}
                      className="w-full h-[420px] object-cover rounded-xl shadow-md"
                    />

                    <button
                      onClick={prevImg}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-orange-500 hover:text-white p-2 rounded-full shadow transition"
                    >
                      <ChevronLeft size={28} />
                    </button>

                    <button
                      onClick={nextImg}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-orange-500 hover:text-white p-2 rounded-full shadow transition"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </div>

                  <div className="flex gap-3 justify-center mt-6 flex-wrap">
                    {galeria.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        onClick={() => setImgIndex(i)}
                        className={`w-24 h-20 object-cover rounded-xl border-2 cursor-pointer transition ${
                          imgIndex === i
                            ? "border-orange-500 shadow-lg"
                            : "border-gray-300 opacity-70 hover:opacity-100"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* DESCRIPCIÓN */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md p-8 border border-gray-200"
            >
              <h2 className="text-3xl font-bold mb-4 font-serif text-gray-800">
                Sobre este producto
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {producto.descripcion}
              </p>
            </motion.div>
          </div>

          {/* === FORMULARIO LATERAL === */}
          <div className="lg:col-span-1">
            <FormularioContacto producto={producto} />
          </div>
        </div>
      </section>
    </main>
  );
}
