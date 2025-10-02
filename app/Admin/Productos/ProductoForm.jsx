"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

export default function ProductoForm({ producto, onSuccess, onCancel }) {
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion || "");
  const [precio, setPrecio] = useState(producto?.precio || "");
  const [categoriaId, setCategoriaId] = useState(producto?.categoriaId || "");
  const [imagenes, setImagenes] = useState([]);
  const [videos, setVideos] = useState(producto?.videos || [""]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categorias"));
      const categoriasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes(files);
  };

  const uploadImages = async (files) => {
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `productos/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    });
    return await Promise.all(uploadPromises);
  };

  const handleVideoChange = (index, value) => {
    const newVideos = [...videos];
    newVideos[index] = value;
    setVideos(newVideos);
  };

  const addVideoField = () => {
    setVideos([...videos, ""]);
  };

  const removeVideoField = (index) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("El nombre es requerido");
      return;
    }

    if (!precio || Number.parseFloat(precio) <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }

    if (!categoriaId) {
      setError("Debes seleccionar una categoría");
      return;
    }

    setLoading(true);

    try {
      let imagenesUrls = producto?.imagenes || [];

      if (imagenes.length > 0) {
        imagenesUrls = await uploadImages(imagenes);
      }

      const videosLimpios = videos.filter((v) => v.trim() !== "");

      const productoData = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio: Number.parseFloat(precio),
        categoriaId,
        imagenes: imagenesUrls,
        videos: videosLimpios,
      };

      if (producto) {
        await updateDoc(doc(db, "productos", producto.id), productoData);
      } else {
        await addDoc(collection(db, "productos"), productoData);
      }

      onSuccess();
    } catch (err) {
      setError("Error al guardar el producto: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{producto ? "Editar Producto" : "Nuevo Producto"}</CardTitle>
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
              placeholder="Nombre del producto"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción del producto"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="precio">Precio *</Label>
            <Input
              id="precio"
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoría *</Label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagenes">Imágenes</Label>
            <Input
              id="imagenes"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagenesChange}
            />
            {producto?.imagenes &&
              producto.imagenes.length > 0 &&
              imagenes.length === 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {producto.imagenes.map((img, index) => (
                    <img
                      key={index}
                      src={img || "/placeholder.svg"}
                      alt={`Imagen ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Videos de YouTube</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addVideoField}
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            </div>
            {videos.map((video, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={video}
                  onChange={(e) => handleVideoChange(index, e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                {videos.length > 1 && (
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => removeVideoField(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
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
