"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, ArrowUpRight } from "lucide-react";

const statusColors = {
  "En progreso": "bg-blue-500/90 hover:bg-blue-500",
  Finalizado: "bg-green-500/90 hover:bg-green-500",
  Planeado: "bg-amber-500/90 hover:bg-amber-500",
};

export function ProjectCard({ project, index = 0 }) {
  const mainImage =
    project.images?.[0] || "/placeholder.svg?height=400&width=600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
    >
      <Link href={`/DesarrolloProyectos/${project.id}`}>
        <Card className="overflow-hidden h-full hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer group border-border/60 bg-card">
          <div className="relative h-72 overflow-hidden bg-muted">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={project.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {project.featured && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-5 left-0 bg-accent text-accent-foreground px-5 py-2 font-semibold text-sm shadow-lg backdrop-blur-sm"
              >
                ⭐ Destacado
              </motion.div>
            )}

            <div className="absolute top-5 right-5">
              <Badge
                className={`${
                  statusColors[project.status]
                } text-white border-0 shadow-lg backdrop-blur-sm px-3 py-1.5 font-medium transition-colors`}
              >
                {project.status}
              </Badge>
            </div>

            <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <ArrowUpRight className="w-5 h-5 text-slate-900" />
              </div>
            </div>
          </div>

          <CardHeader className="pb-4 pt-6">
            <h3 className="text-2xl font-bold text-balance group-hover:text-accent transition-colors duration-300 leading-tight">
              {project.name}
            </h3>
          </CardHeader>

          <CardContent className="pb-6">
            <p className="text-muted-foreground line-clamp-2 text-pretty leading-relaxed">
              {project.description}
            </p>
          </CardContent>

          <CardFooter className="flex justify-between text-sm text-muted-foreground border-t border-border/50 pt-5 pb-6 bg-muted/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium">
                {new Date(project.startDate).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-accent" />
              </div>
              <span className="font-medium truncate max-w-[120px]">
                {project.client}
              </span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
