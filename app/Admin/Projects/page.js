"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ProjectForm } from "./Form";

export default function AdminProjectsPage() {
  const { projects, loading, refetch } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

  const handleCreate = async (projectData, imageFiles) => {
    const result = await createProject(projectData, imageFiles);

    if (result.success) {
      toast("El proyecto se ha creado exitosamente");
      setIsFormOpen(false);
      refetch();
    } else {
      toast.error(`Error: ${result.error}`);
    }
  };

  const handleUpdate = async (
    projectData,
    imageFiles,
    existingImages,
    imagesToRemove
  ) => {
    const result = await updateProject(
      editingProject.id,
      projectData,
      imageFiles,
      existingImages,
      imagesToRemove
    );

    if (result.success) {
      toast("El proyecto se ha actualizado exitosamente");
      setEditingProject(null);
      refetch();
    } else {
      toast(`Error: ${result.error}`);
    }
  };

  const handleDelete = async () => {
    if (!deletingProject) return;

    const result = await deleteProject(
      deletingProject.id,
      deletingProject.images
    );

    if (result.success) {
      toast("El proyecto se ha eliminado exitosamente");
      setDeletingProject(null);
      refetch();
    } else {
      toast.error(`Error: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Administrar Proyectos</h1>
              <p className="text-muted-foreground">
                Gestiona todos los proyectos de la empresa
              </p>
            </div>
            <Button onClick={() => setIsFormOpen(true)} size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"
              />
            </div>
          ) : projects.length === 0 ? (
            <Card>
              <CardContent className="py-20 text-center">
                <p className="text-muted-foreground text-lg mb-4">
                  No hay proyectos registrados
                </p>
                <Button onClick={() => setIsFormOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear primer proyecto
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle>{project.name}</CardTitle>
                              {project.featured && (
                                <Badge variant="secondary">Destacado</Badge>
                              )}
                              <Badge
                                className={
                                  project.status === "Finalizado"
                                    ? "bg-green-500"
                                    : project.status === "En progreso"
                                    ? "bg-blue-500"
                                    : "bg-yellow-500"
                                }
                              >
                                {project.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Cliente: {project.client} | Inicio:{" "}
                              {new Date(project.startDate).toLocaleDateString(
                                "es-ES"
                              )}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/DesarrolloProyectos/${project.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingProject(project)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeletingProject(project)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="h-auto w-[90%] md:w-full max-h-[95vh] overflow-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
            <DialogDescription>
              Completa la información del proyecto
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            onSubmit={handleCreate}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingProject}
        onOpenChange={() => setEditingProject(null)}
      >
        <DialogContent className="h-auto w-[90%] md:w-full max-h-[95vh] overflow-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Editar Proyecto</DialogTitle>
            <DialogDescription>
              Actualiza la información del proyecto
            </DialogDescription>
          </DialogHeader>
          {editingProject && (
            <ProjectForm
              initialData={editingProject}
              onSubmit={handleUpdate}
              onCancel={() => setEditingProject(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingProject}
        onOpenChange={() => setDeletingProject(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el
              proyecto &quot;{deletingProject?.name}&quot; y todas sus imágenes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
