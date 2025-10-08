import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <AlertCircle className="w-24 h-24 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-800 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">
            Servicio no encontrado
          </h2>
          <p className="text-gray-600 leading-relaxed">
            El servicio que buscas no existe o ha sido movido. Te invitamos a
            explorar nuestros otros servicios disponibles.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/servicios">
            <Button className="bg-orange-500 hover:bg-orange-600 w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver Todos los Servicios
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-50 w-full bg-transparent"
            >
              Ir al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
