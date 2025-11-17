"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import ProductoIndustrialForm from "./ProductoIndustrialForm";

export default function ProductosIndustrialesAdmin() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProducto, setEditingProducto] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "productosIndustriales"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProductos(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este producto industrial?")) return;

    try {
      await deleteDoc(doc(db, "productosIndustriales", id));
      load();
    } catch (err) {
      alert("Error eliminando: " + err.message);
    }
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProducto(null);
    load();
  };

  if (showForm) {
    return (
      <ProductoIndustrialForm
        producto={editingProducto}
        onSuccess={handleSuccess}
        onCancel={() => {
          setShowForm(false);
          setEditingProducto(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6 p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Productos Industriales</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((prod) => (
            <Card key={prod.id} className="shadow-md">
              <CardHeader>
                {prod.imagen && (
                  <img
                    src={prod.imagen}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                )}
                <CardTitle>{prod.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-2">
                  {prod.descripcion}
                </p>

                <p className="font-semibold text-orange-600 mb-3">
                  S/ {Number(prod.precio).toFixed(2)}
                </p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingProducto(prod);
                      setShowForm(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(prod.id)}
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
