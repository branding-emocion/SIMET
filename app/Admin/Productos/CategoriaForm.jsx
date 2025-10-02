"use client";

import { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoriaForm({ categoria, onSuccess, onCancel }) {
  const [nombre, setNombre] = useState(categoria?.nombre || "");
  const [descripcion, setDescripcion] = useState(categoria?.descripcion || "");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `categorias/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    debugger;
    if (!nombre) {
      setError("El nombre es requerido");
      return;
    }

    setLoading(true);

    try {
      let imagenUrl = categoria?.imagen || "";

      if (imagen) {
        imagenUrl = await uploadImage(imagen);
      }

      const categoriaData = {
        nombre: nombre || "",
        descripcion: descripcion || "",
        imagen: imagenUrl || "",
      };

      if (categoria) {
        await updateDoc(
          doc(db, "categorias", `${categoria.id}`),
          categoriaData
        );
      } else {
        await addDoc(collection(db, "categorias"), categoriaData);
      }

      onSuccess();
    } catch (err) {
      setError("Error al guardar la categoría: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {categoria ? "Editar Categoría" : "Nueva Categoría"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la categoría"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción de la categoría"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagen">Imagen</Label>
            <Input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {categoria?.imagen && !imagen && (
              <div className="mt-2">
                <img
                  src={categoria.imagen || "/placeholder.svg"}
                  alt="Imagen actual"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
