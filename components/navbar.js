"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

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
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
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
                    href="/quienessomos"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary",
                      isScrolled ? "text-gray-700" : "text-white"
                    )}
                  >
                    Quienes somos
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

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
                            href={`/servicios?categoria=${item.nombre}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
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
                    href="/desarrolloproyectos"
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary",
                      isScrolled ? "text-gray-700" : "text-white"
                    )}
                  >
                    Desarrollo de proyectos
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/clientes"
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
                    href="/contacto"
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

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu */}
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
                href="/quienessomos"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
              >
                QUIENES SOMOS
              </Link>

              <Link
                href="/servicios"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
              >
                SERVICIOS
              </Link>

              <Link
                href="/desarrolloproyectos"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
              >
                DESARROLLO DE PROYECTOS
              </Link>

              <Link
                href="/clientes"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
              >
                CLIENTES
              </Link>

              <Link
                href="/contacto"
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
