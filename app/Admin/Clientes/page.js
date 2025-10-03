"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db, storage } from "@/firebase/firebaseClient";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    imagen: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Escuchar cambios en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "clientes"), (snapshot) => {
      const clientesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClientes(clientesData);
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagen: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const timestamp = Date.now();
    const storageRef = ref(storage, `clientes/${timestamp}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return { url, path: storageRef.fullPath };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (!editingCliente && !formData.imagen) {
      toast.error("Por favor selecciona una imagen");
      return;
    }

    setIsLoading(true);

    try {
      let imagenUrl = editingCliente?.imagenUrl;
      let imagenPath = editingCliente?.imagenPath;

      // Si hay nueva imagen, subirla
      if (formData.imagen) {
        // Si estamos editando y hay imagen anterior, eliminarla
        if (editingCliente?.imagenPath) {
          try {
            const oldImageRef = ref(storage, editingCliente.imagenPath);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.error("Error al eliminar imagen anterior:", error);
          }
        }

        const imageData = await uploadImage(formData.imagen);
        imagenUrl = imageData.url;
        imagenPath = imageData.path;
      }

      const clienteData = {
        nombre: formData.nombre,
        imagenUrl,
        imagenPath,
        updatedAt: new Date().toISOString(),
      };

      if (editingCliente) {
        await updateDoc(doc(db, "clientes", editingCliente.id), clienteData);
        toast("Cliente actualizado correctamente");
      } else {
        await addDoc(collection(db, "clientes"), {
          ...clienteData,
          createdAt: new Date().toISOString(),
        });
        toast("Cliente agregado correctamente");
      }

      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un problema al guardar el cliente");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nombre: cliente.nombre,
      imagen: null,
    });
    setImagePreview(cliente.imagenUrl);
    setIsFormOpen(true);
  };

  const handleDelete = async (cliente) => {
    if (!confirm("¿Estás seguro de eliminar este cliente?")) return;

    try {
      // Eliminar imagen de Storage
      if (cliente.imagenPath) {
        const imageRef = ref(storage, cliente.imagenPath);
        await deleteObject(imageRef);
      }

      // Eliminar documento de Firestore
      await deleteDoc(doc(db, "clientes", cliente.id));

      toast("Cliente eliminado correctamente");
    } catch (error) {
      console.error("Error:", error);
      toast("Hubo un problema al eliminar el cliente");
    }
  };

  const resetForm = () => {
    setFormData({ nombre: "", imagen: null });
    setImagePreview(null);
    setEditingCliente(null);
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administrar Clientes</h1>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Agregar Cliente
        </Button>
      </div>

      {/* Formulario Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg shadow-xl max-w-md w-full"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>
                    {editingCliente ? "Editar Cliente" : "Agregar Cliente"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetForm}
                    disabled={isLoading}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        placeholder="Nombre del cliente"
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <Label htmlFor="imagen">Imagen</Label>
                      <Input
                        id="imagen"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isLoading}
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isLoading}
                      >
                        {isLoading
                          ? "Guardando..."
                          : editingCliente
                          ? "Actualizar"
                          : "Guardar"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        disabled={isLoading}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {clientes.map((cliente, index) => (
            <motion.div
              key={cliente.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={cliente.imagenUrl || "/placeholder.svg"}
                    alt={cliente.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">
                    {cliente.nombre}
                  </h3>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(cliente)}
                      className="flex-1 gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(cliente)}
                      className="flex-1 gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {clientes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No hay clientes registrados. Agrega el primero.
          </p>
        </div>
      )}
    </div>
  );
}
