"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
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
      } finally {
        setLoading(false);
      }
    };
    loadCategorias();
  }, [mounted]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent h-16 md:h-20" />
    );
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 uppercase">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex flex-col hover:cursor-pointer">
              <Image
                src="/simetH.png"
                alt="logo"
                width={281}
                height={87}
                priority
                className="object-cover w-32 h-auto sm:w-40 md:w-48 lg:w-64"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/QuienesSomos"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary",
                      isScrolled ? "text-gray-700" : "text-white"
                    )}
                  >
                    Quienes Somos
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
<NavigationMenuItem>
  <NavigationMenuLink asChild>
    <Link
      href="/Productos"
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary uppercase",
        isScrolled ? "text-gray-700" : "text-white"
      )}
    >
      Productos
    </Link>
  </NavigationMenuLink>
</NavigationMenuItem>

              {/* === Servicios (Dropdown) === */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center uppercase rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary bg-transparent",
                    isScrolled ? "text-gray-700" : "text-white"
                  )}
                >
                  Servicios
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-2">
                    {loading ? (
                      <p className="text-sm text-gray-500 px-3 py-2">
                        Cargando...
                      </p>
                    ) : (
                      categorias.map((item) => (
                        <NavigationMenuLink asChild key={item.id}>
                          <Link
                            href={`/Servicios?categoria=${item.nombre}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            onClick={closeMobileMenu}
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.nombre}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/DesarrolloProyectos"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary",
                      isScrolled ? "text-gray-700" : "text-white"
                    )}
                  >
                    Desarrollo de Proyectos
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/Clientes"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary",
                      isScrolled ? "text-gray-700" : "text-white"
                    )}
                  >
                    Clientes
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/Contacto"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary",
                      isScrolled ? "text-gray-700" : "text-white"
                    )}
                  >
                    Contacto
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X
                  className={`h-6 w-6 ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                />
              ) : (
                <Menu
                  className={`h-6 w-6 ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Menu === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link
                href="/QuienesSomos"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
              >
                QUIENES SOMOS
              </Link>
              <Link
  href="/Productos"
  onClick={closeMobileMenu}
  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
>
  PRODUCTOS
</Link>


              {/* Dropdown Servicios en móvil */}
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "servicios" ? null : "servicios")
                }
                className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
              >
                <span>SERVICIOS</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openDropdown === "servicios" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openDropdown === "servicios" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 space-y-1"
                  >
                    {loading ? (
                      <p className="text-sm text-gray-500 px-3 py-2">Cargando...</p>
                    ) : (
                      categorias.map((item) => (
                        <Link
                          key={item.id}
                          href={`/Servicios?categoria=${item.nombre}`}
                          onClick={closeMobileMenu}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors uppercase"
                        >
                          {item.nombre}
                        </Link>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                href="/DesarrolloProyectos"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
              >
                DESARROLLO DE PROYECTOS
              </Link>

              <Link
                href="/Clientes"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
              >
                CLIENTES
              </Link>

              <Link
                href="/Contacto"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
              >
                CONTACTO
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
