"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useProject } from "@/hooks/useProjects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Users,
  ArrowLeft,
  ExternalLink,
  Clock,
  CheckCircle2,
} from "lucide-react";

const statusColors = {
  "En progreso": "bg-blue-500",
  Finalizado: "bg-green-500",
  Planeado: "bg-yellow-500",
};

export default function ProjectDetailPage({ params }) {
  const resolvedParams = use(params);
  const { project, loading, error } = useProject(resolvedParams.id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-xl mb-4">
            {error || "Proyecto no encontrado"}
          </p>
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const extractYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[60vh] w-full"
      >
        <Image
          src={project.images?.[0] || "/ "}
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge
                className={`${statusColors[project.status]} text-white mb-4`}
              >
                {project.status}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
                {project.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Descripción del Proyecto
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {project.description}
              </p>
            </motion.section>

            <Separator />

            {/* Image Gallery */}
            {project.images && project.images.length > 1 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold mb-6">Galería</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.slice(1).map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.name} - Imagen ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Videos */}
            {project.links && project.links.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Videos</h2>
                <div className="grid grid-cols-1 gap-6">
                  {project.links.map((link, index) => {
                    const videoId = extractYouTubeId(link);
                    return videoId ? (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="relative w-full pb-[56.25%] rounded-lg overflow-hidden"
                      >
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`Video ${index + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </motion.div>
                    ) : (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {link}
                      </a>
                    );
                  })}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="sticky top-8"
            >
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      Detalles del Proyecto
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Cliente
                          </p>
                          <p className="font-medium">{project.client}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Fecha de inicio
                          </p>
                          <p className="font-medium">
                            {new Date(project.startDate).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Fecha de entrega
                          </p>
                          <p className="font-medium">
                            {new Date(project.endDate).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Estado
                          </p>
                          <Badge
                            className={`${
                              statusColors[project.status]
                            } text-white mt-1`}
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {project.team && project.team.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold text-lg mb-3">
                          Equipo Asignado
                        </h3>
                        <div className="space-y-2">
                          {project.team.map((member, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <span className="text-sm">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
