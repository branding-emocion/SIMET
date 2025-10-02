"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import CategoriaForm from "./CategoriaForm";

export default function CategoriasList() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadCategorias = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "categorias"));
      const categoriasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta categoría?")) {
      try {
        await deleteDoc(doc(db, "categorias", `${id}`));
        loadCategorias();
      } catch (error) {
        alert("Error al eliminar la categoría: " + error.message);
      }
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingCategoria(null);
    loadCategorias();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategoria(null);
  };

  if (showForm) {
    return (
      <CategoriaForm
        categoria={editingCategoria}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categorías</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Categoría
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Cargando categorías...</p>
      ) : categorias.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No hay categorías. Crea una nueva para comenzar.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categorias?.map((categoria) => (
            <Card key={categoria.id}>
              <CardHeader>
                {categoria.imagen && (
                  <img
                    src={categoria.imagen || "/placeholder.svg"}
                    alt={categoria.nombre}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <CardTitle>{categoria.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {categoria.descripcion || "Sin descripción"}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(categoria)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(categoria.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
