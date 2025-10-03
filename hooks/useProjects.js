"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebaseClient";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      let q = collection(db, "projects");

      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjects(projectsData);
      setError(null);
    } catch (err) {
      console.error("[v0] Error fetching projects:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { projects, loading, error, refetch: fetchProjects };
}

export function useProject(id) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Proyecto no encontrado");
        }
      } catch (err) {
        console.error("[v0] Error fetching project:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { project, loading, error };
}

export async function createProject(projectData, imageFiles = []) {
  try {
    // Upload images to Firebase Storage
    const imageUrls = await uploadImages(imageFiles);

    const newProject = {
      ...projectData,
      images: imageUrls,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "projects"), newProject);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("[v0] Error creating project:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProject(
  id,
  projectData,
  newImageFiles = [],
  existingImages = [],
  imagesToRemove = []
) {
  try {
    const updates = { ...projectData };

    // Delete removed images from Firebase Storage
    if (imagesToRemove.length > 0) {
      await Promise.all(imagesToRemove.map((url) => deleteImageFromUrl(url)));
    }

    // Upload new images if provided
    let finalImages = existingImages;
    if (newImageFiles.length > 0) {
      const newImageUrls = await uploadImages(newImageFiles);
      finalImages = [...existingImages, ...newImageUrls];
    }

    updates.images = finalImages;
    updates.updatedAt = new Date().toISOString();

    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, updates);
    return { success: true };
  } catch (error) {
    console.error("[v0] Error updating project:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id, imageUrls = []) {
  try {
    // Delete images from Storage
    await Promise.all(imageUrls.map((url) => deleteImageFromUrl(url)));

    // Delete document from Firestore
    await deleteDoc(doc(db, "projects", id));
    return { success: true };
  } catch (error) {
    console.error("[v0] Error deleting project:", error);
    return { success: false, error: error.message };
  }
}

async function uploadImages(files) {
  const uploadPromises = files.map(async (file) => {
    const timestamp = Date.now();
    const fileName = `projects/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  });

  return Promise.all(uploadPromises);
}

async function deleteImageFromUrl(url) {
  try {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("[v0] Error deleting image:", error);
  }
}
