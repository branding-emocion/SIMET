"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getServicioBySlug } from "@/lib/servicios-firebase";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeroSection from "./HeroSection";

// ====== COMPONENTE PRINCIPAL ======
export default function ServicioPage({ params, searchParams }) {
  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const { slug } = await params;
      const data = await getServicioBySlug(slug);
      if (!data) return notFound();

      setServicio(data);
      const resolved = await searchParams;
      setCategoria(resolved?.categoria || null);
      setLoading(false);
    };
    loadData();
  }, [params, searchParams]);

  if (loading) return <p className="text-center py-20">Cargando servicio...</p>;
  if (!servicio) return notFound();

  return (
    <main>
      <HeroSection
        title={servicio.nombre}
        subtitle={servicio.descripcion}
        backgroundImage="/soldadoNosotros.jpg"
        overlayFrom="from-slate-900/85"
        overlayTo="to-slate-900/70"
        height="h-[60vh]"
        categoria={categoria}
      />

      {/* === CONTENIDO === */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* === INFORMACIÓN PRINCIPAL === */}
          <div className="lg:col-span-2 space-y-8">
            {servicio.imagenes?.length > 0 && (
              <Card className="shadow-md border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Imagen del servicio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={servicio.imagenes[0] || "/placeholder.svg"}
                    alt={servicio.nombre}
                    className="w-full h-auto rounded-lg object-contain max-h-[500px] bg-muted"
                  />
                </CardContent>
              </Card>
            )}

            <div>
              <h2 className="text-3xl font-bold mb-4 font-serif text-gray-800">
                Acerca de este servicio
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {servicio.descripcion}
              </p>
            </div>

            {servicio.imagenes?.length > 1 && (
              <Card className="shadow-md border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Galería de imágenes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {servicio.imagenes.slice(1).map((imagen, index) => (
                      <img
                        key={index}
                        src={imagen || "/placeholder.svg"}
                        alt={`${servicio.nombre} - imagen ${index + 2}`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {servicio.videos?.length > 0 && (
              <Card className="shadow-md border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Videos relacionados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {servicio.videos.map((video, index) => {
                      const videoId = video.includes("youtube.com")
                        ? new URL(video).searchParams.get("v")
                        : null;
                      return videoId ? (
                        <div key={index} className="aspect-video">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`Video ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      ) : (
                        <a
                          key={index}
                          href={video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:underline block"
                        >
                          Ver video {index + 1}
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* === FORMULARIO === */}
          <div className="lg:col-span-1">
            <FormularioContacto servicio={servicio} />
          </div>
        </div>
      </section>
    </main>
  );
}

// ====== FORMULARIO DE CONTACTO ======
function FormularioContacto({ servicio }) {
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
        body: JSON.stringify({ ...form, servicio: servicio.nombre }),
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
      {/* Encabezado */}
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 px-6">
        <CardTitle className="text-xl font-semibold">
          Solicitar más información
        </CardTitle>
        <CardDescription className="text-white/90 text-sm leading-relaxed">
          Completa tus datos y te contactaremos sobre este servicio.
        </CardDescription>
      </CardHeader>

      {/* Cuerpo del formulario */}
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
