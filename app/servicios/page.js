"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { servicios } from "@/lib/servicios-data";

export default function ServiciosGrid() {
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");

  const categorias = [
    "Todos",
    ...Array.from(new Set(servicios.map((s) => s.categoria))),
  ];

  const serviciosFiltrados =
    filtroCategoria === "Todos"
      ? servicios
      : servicios.filter((s) => s.categoria === filtroCategoria);

  return (
    <div className="min-h-screen bg-gray-50 py-25 ">
      <section className="">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                variant={filtroCategoria === categoria ? "default" : "outline"}
                onClick={() => setFiltroCategoria(categoria)}
                className={
                  filtroCategoria === categoria
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "border-orange-500 text-orange-500 hover:bg-orange-50"
                }
              >
                {categoria}
              </Button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosFiltrados.map((servicio) => {
              const IconoComponente = servicio.icono;
              return (
                <Card
                  key={servicio.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={servicio.imagen || "/placeholder.svg"}
                      alt={servicio.titulo}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-orange-500 hover:bg-orange-600">
                        {servicio.categoria}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                      <IconoComponente className="w-5 h-5 text-slate-700" />
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-slate-800 group-hover:text-orange-500 transition-colors text-balance">
                      {servicio.titulo}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {servicio.descripcion}
                    </p>
                    <Link href={`/servicios/${servicio.slug}`}>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Ver Detalles
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
