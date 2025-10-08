import { db } from "@/firebase/firebaseClient";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// Obtiene un servicio por su slug desde Firestore
export async function getServicioBySlug(id) {
  try {
    const docRef = doc(db, "productos", `${id}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn("No se encontró el servicio con ID:", id);
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error("Error al obtener servicio por ID:", error);
    throw error;
  }
}
// Obtiene todos los productos desde Firestore
export async function getAllServicios() {
  try {
    const serviciosRef = collection(db, "productos");
    const querySnapshot = await getDocs(serviciosRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}

// Obtiene todos los slugs de productos para generación estática
export async function getAllServiciosSlugs() {
  try {
    const productos = await getAllServicios();
    return productos.map((servicio) => servicio.slug);
  } catch (error) {
    console.error("Error al obtener slugs:", error);
    return [];
  }
}
