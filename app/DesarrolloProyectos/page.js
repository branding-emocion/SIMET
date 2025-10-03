"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ArrowRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import Link from "next/link";

export default function HomePage() {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { projects, loading, error } = useProjects(filters);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusFilter = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: status === "all" ? undefined : status,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/QuienesSomos/QuienesSomos.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight text-balance">
              Nuestros Proyectos
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-slate-100 text-pretty">
              Más de 10 años ejecutando proyectos de diseño, fabricación,
              mantenimiento y montaje de estructuras metálicas para el sector
              agroindustrial, minero y pesquero.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Filters Section */}
      <section className="py-12 px-4 border-b bg-card/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-6 items-center justify-between"
          >
            <div className="relative w-full md:w-[420px]">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base bg-background border-border/60 focus:border-primary transition-colors"
              />
            </div>

            <div className="flex gap-3 items-center w-full md:w-auto">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtrar por:</span>
              </div>
              <Select onValueChange={handleStatusFilter} defaultValue="all">
                <SelectTrigger className="w-full md:w-52 h-12 bg-background border-border/60">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="En progreso">En progreso</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                  <SelectItem value="Planeado">Planeado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"
              />
              <p className="mt-6 text-muted-foreground text-lg">
                Cargando proyectos...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-destructive text-lg font-medium">
                Error: {error}
              </p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-xl font-medium">
                No se encontraron proyectos
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <p className="text-sm text-muted-foreground">
                  Mostrando{" "}
                  <span className="font-semibold text-foreground">
                    {filteredProjects.length}
                  </span>{" "}
                  {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Disponibles para nuevos proyectos
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance tracking-tight">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty max-w-2xl mx-auto leading-relaxed">
              Contáctanos y descubre cómo podemos ayudarte a materializar tus
              ideas con calidad, experiencia y precios competitivos.
            </p>
            <Button
              size="lg"
              className="text-lg px-10 h-14 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link href="/Contacto">Contáctanos</Link>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
