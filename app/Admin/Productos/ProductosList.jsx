"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import { db } from "@/firebase/firebaseClient";
import ProductoForm from "./ProductoForm";

export default function ProductosList() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProducto, setEditingProducto] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productosSnapshot, categoriasSnapshot] = await Promise.all([
        getDocs(collection(db, "productos")),
        getDocs(collection(db, "categorias")),
      ]);

      const productosData = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const categoriasData = categoriasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProductos(productosData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteDoc(doc(db, "productos", id));
        loadData();
      } catch (error) {
        alert("Error al eliminar el producto: " + error.message);
      }
    }
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProducto(null);
    loadData();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProducto(null);
  };

  const getCategoriaById = (id) => {
    return categorias.find((cat) => cat.id === id);
  };

  const productosAgrupados = categorias.map((categoria) => ({
    categoria,
    productos: productos.filter((p) => p.categoriaId === categoria.id),
  }));

  if (showForm) {
    return (
      <ProductoForm
        producto={editingProducto}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Productos</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No hay productos. Crea uno nuevo para comenzar.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {productosAgrupados.map(
            ({ categoria, productos: prods }) =>
              prods.length > 0 && (
                <div key={categoria.id} className="space-y-4">
                  <div className="flex items-center gap-4">
                    {categoria.imagen && (
                      <img
                        src={categoria.imagen || "/placeholder.svg"}
                        alt={categoria.nombre}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold">
                        {categoria.nombre}
                      </h3>
                      {categoria.descripcion && (
                        <p className="text-sm text-muted-foreground">
                          {categoria.descripcion}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {prods.map((producto) => (
                      <Card key={producto.id}>
                        <CardHeader>
                          {producto.imagenes &&
                            producto.imagenes.length > 0 && (
                              <img
                                src={producto.imagenes[0] || "/placeholder.svg"}
                                alt={producto.nombre}
                                className="w-full h-48 object-cover rounded-md mb-4"
                              />
                            )}
                          <CardTitle>{producto.nombre}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">
                            {producto.descripcion || "Sin descripción"}
                          </p>
                          <p className="text-lg font-bold mb-4">
                            ${producto.precio.toFixed(2)}
                          </p>
                          {producto.videos && producto.videos.length > 0 && (
                            <p className="text-xs text-muted-foreground mb-4">
                              {producto.videos.length} video(s)
                            </p>
                          )}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(producto)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(producto.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
