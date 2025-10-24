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
import Link from "next/link";

export default async function ServicioPage({ params, searchParams }) {
  const { slug } = await params;
  const servicio = await getServicioBySlug(slug);

  const searchParamsResolved = await searchParams;
  const categoria = searchParamsResolved?.categoria || null;

  // Si no existe el servicio, mostrar 404
  if (!servicio) {
    notFound();
  }

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

      {/* Contenido del servicio */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Información principal */}
          <div className="lg:col-span-2 space-y-8">
            {servicio.imagenes && servicio.imagenes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Imagen del producto</CardTitle>
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
              <h2 className="text-3xl font-bold mb-4 font-serif">
                Acerca de este producto
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {servicio.descripcion}
              </p>
            </div>

            {servicio.imagenes && servicio.imagenes.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Galería de imágenes</CardTitle>
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

            {servicio.videos && servicio.videos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Videos relacionados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                          className="text-primary hover:underline block"
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

          {/* Sidebar con CTA */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Solicitar mas informacion</CardTitle>
                <CardDescription>
                  Contáctanos para más información sobre este producto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Producto:</p>
                  <p className="text-sm text-muted-foreground">
                    {servicio.nombre}
                  </p>
                </div>
                {servicio.precio > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Precio:</p>
                    <p className="text-2xl font-bold">
                      ${servicio.precio.toLocaleString()}
                    </p>
                  </div>
                )}
                <Link href={`/Contacto`}>
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors uppercase">
                    Contactar ahora
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
