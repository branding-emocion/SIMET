import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { servicios } from "@/lib/servicios-data";

export default function ServicioPage({ params }) {
  console.log("params.slug", params.slug);

  if (!servicio) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-25">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/Servicios"
              className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Servicios
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-500 p-3 rounded-full">
                <IconoComponente className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-600 text-lg px-4 py-2">
                {servicio.categoria}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              {servicio.titulo}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {servicio.descripcion}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Service Image */}
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={servicio.imagen || "/placeholder.svg"}
                    alt={servicio.titulo}
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">
                    Descripción del Servicio
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {servicio.detalles}
                  </p>
                </div>

                {/* Características */}
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                    Características Principales
                  </h3>
                  <ul className="space-y-3">
                    {servicio.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact CTA */}
                <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      ¿Interesado en este servicio?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Contáctanos para recibir una cotización personalizada
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href={`/contacto`}>
                        <Button className="bg-orange-500 hover:bg-orange-600 flex-1 hover:cursor-pointer">
                          <Phone className="w-4 h-4 mr-2" />
                          Llamar Ahora
                        </Button>
                      </Link>
                      <Link href={`/contacto`}>
                        <Button
                          variant="outline"
                          className="border-orange-500 text-orange-600 hover:bg-orange-50 flex-1 bg-transparent hover:cursor-pointer"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Enviar Email
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Galería de <span className="text-orange-500">Trabajos</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicio.galeria.map((imagen, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-lg group"
                  >
                    <img
                      src={imagen || ""}
                      alt={`${servicio.titulo} - Trabajo ${index + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Company Info */}
            <Card className="bg-slate-800 text-white">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      <span className="text-orange-500">SIMET AG SAC</span>
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Industria metalmecánica con más de 10 años de experiencia
                      en el sector agroindustrial, minero y pesquero.
                      Profesionales dinámicos y capaces de enfrentar los nuevos
                      retos del mundo de hoy.
                    </p>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>Sector Industrial de Moche, Trujillo</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Solicitar Cotización
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return servicios.map((servicio) => ({
    slug: servicio.slug,
  }));
}
