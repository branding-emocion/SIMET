"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/firebase/firebaseClient";
import useAuthState from "@/lib/useAuthState";
import React from "react";

const Home = () => {
  const [{ user, claims }, loading, error] = useAuthState(auth);

  return (
    <main className="flex-1 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Bienvenido, {user?.displayName}
          </h2>
          <p className="text-lg text-slate-600">
            Plataforma Digital · <span className="font-semibold">SIMET</span>
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-white rounded-2xl">
          <CardContent className="p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              Su confianza es nuestra mayor responsabilidad
            </h3>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Gracias por elegirnos. Desde aquí podrá gestionar sus escritos,
              solicitudes y procesos legales con total seguridad, transparencia
              y respaldo profesional.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Home;
