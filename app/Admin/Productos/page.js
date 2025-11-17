"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CategoriasList from "./CategoriasList";
import ProductosList from "./ProductosList";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("categorias");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

        <div className="flex gap-2 mb-6 border-b border-border">
          <Button
            variant={activeTab === "categorias" ? "default" : "ghost"}
            onClick={() => setActiveTab("categorias")}
            className="rounded-b-none"
          >
            Categorías
          </Button>
          <Button
            variant={activeTab === "productos" ? "default" : "ghost"}
            onClick={() => setActiveTab("productos")}
            className="rounded-b-none"
          >
            Servicios
          </Button>
        </div>

        {activeTab === "categorias" ? <CategoriasList /> : <ProductosList />}
      </div>
    </div>
  );
}
