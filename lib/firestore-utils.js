import { db } from "@/firebase/firebaseClient";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";

// Categorías
export const getCategorias = async () => {
  const q = query(collection(db, "categorias"), orderBy("nombre"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addCategoria = async (categoria) => {
  const docRef = await addDoc(collection(db, "categorias"), {
    nombre: categoria.nombre,
    descripcion: categoria.descripcion || "",
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};

export const updateCategoria = async (id, categoria) => {
  const docRef = doc(db, "categorias", id);
  await updateDoc(docRef, {
    nombre: categoria.nombre,
    descripcion: categoria.descripcion || "",
    updatedAt: new Date().toISOString(),
  });
};

export const deleteCategoria = async (id) => {
  const docRef = doc(db, "categorias", id);
  await deleteDoc(docRef);
};

// Productos
export const getProductos = async () => {
  const q = query(collection(db, "productos"), orderBy("nombre"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getProductosByCategoria = async (categoriaId) => {
  const q = query(
    collection(db, "productos"),
    where("categoriaId", "==", categoriaId),
    orderBy("nombre")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProducto = async (producto) => {
  const docRef = await addDoc(collection(db, "productos"), {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: Number.parseFloat(producto.precio),
    categoriaId: producto.categoriaId,
    imagenes: producto.imagenes || [],
    videos: producto.videos || [],
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};

export const updateProducto = async (id, producto) => {
  const docRef = doc(db, "productos", id);
  await updateDoc(docRef, {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: Number.parseFloat(producto.precio),
    categoriaId: producto.categoriaId,
    imagenes: producto.imagenes || [],
    videos: producto.videos || [],
    updatedAt: new Date().toISOString(),
  });
};

export const deleteProducto = async (id) => {
  const docRef = doc(db, "productos", id);
  await deleteDoc(docRef);
};
