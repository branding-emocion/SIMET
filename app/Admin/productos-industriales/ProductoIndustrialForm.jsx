"use client";

import { useState } from "react";
import {
  addDoc,
  updateDoc,
  doc,
  collection,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebaseClient";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

export default function ProductoIndustrialForm({ producto, onSuccess, onCancel }) {
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion || "");
  const [precio, setPrecio] = useState(producto?.precio || "");
  const [imagen, setImagen] = useState(null);
  const [galeria, setGaleria] = useState([]);
  const [loading, setLoading] = useState(false);

  // Subir imágenes a Storage
  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, `productosIndustriales/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagenUrl = producto?.imagen || "";

      if (imagen) {
        imagenUrl = await uploadFile(imagen);
      }

      // Galería
      let galeriaUrls = producto?.galeria || [];
      if (galeria.length > 0) {
        for (const img of galeria) {
          const url = await uploadFile(img);
          galeriaUrls.push(url);
        }
      }

      const data = {
        nombre,
        descripcion,
        precio: Number(precio || 0),
        imagen: imagenUrl,
        galeria: galeriaUrls,
      };

      if (producto) {
        await updateDoc(doc(db, "productosIndustriales", producto.id), data);
      } else {
        await addDoc(collection(db, "productosIndustriales"), data);
      }

      onSuccess();
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {producto ? "Editar Producto Industrial" : "Nuevo Producto Industrial"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <Label>Nombre *</Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div>
            <Label>Descripción *</Label>
            <Textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div>
            <Label>Precio (S/)</Label>
            <Input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </div>

          <div>
            <Label>Imagen Principal</Label>
            <Input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />

            {producto?.imagen && (
              <img
                src={producto.imagen}
                className="w-24 h-24 rounded-md mt-2 object-cover"
              />
            )}
          </div>

          <div>
            <Label>Galería (opcional)</Label>
            <Input type="file" multiple accept="image/*" onChange={(e) => setGaleria([...e.target.files])} />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>

            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
