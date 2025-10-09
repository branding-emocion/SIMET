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

  const loadCategorias = async () => {
    setLoading(true);
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

  useEffect(() => {
    loadCategorias();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const legalServices = [
    {
      name: "Arbitraje en contratación pública",
      href: "/AsesoriaLegal/ContratacionPublica",
    },
    {
      name: "Arbitraje de emergencia",
      href: "/AsesoriaLegal/ArbitrajeEmergencia",
    },
    { name: "Arbitraje entre privados", href: "/AsesoriaLegal/EntrePrivados" },
    {
      name: "Arbitraje Express",
      href: "/AsesoriaLegal/ArbitrajeExpress",
    },
  ];

  // const Servicios = [
  //   { name: "Fabricaciones", href: "/Servicios/Fabricaciones" },
  //   {
  //     name: "Mantenimientos",
  //     href: "/Servicios/Mantenimientos",
  //     submenu: [
  //       { name: "Fábrica", href: "/Servicios/Mantenimientos/Fabrica" },
  //       {
  //         name: "Campo",
  //         href: "/Servicios/Mantenimientos/Campo",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Instalación de equipos de Filtrado",
  //     href: "/Servicios/EquiposFiltrado",
  //   },
  //   {
  //     name: "Trabajos en acero inoxidable",
  //     href: "/Servicios/AceroInoxidable",
  //   },
  //   {
  //     name: "limpieza industrial por granallado",
  //     href: "/Servicios/IndustrialGranallado",
  //   },
  //   {
  //     name: "Pintura",
  //     href: "/Servicios/Pintura",
  //     submenu: [
  //       { name: "Industrial", href: "/Servicios/Pintura/Industrial" },
  //       {
  //         name: "Líquida",
  //         href: "/Servicios/Pintura/Electrostatico",
  //       },
  //       {
  //         name: "Electroacústica",
  //         href: "/Servicios/Pintura/AceroInoxidable",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Corte por plasma",
  //     href: "/Servicios/CortePorPlasma",
  //   },
  // ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
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
              <Link href={"/"} className="flex flex-col hover:cursor-pointer">
                {isScrolled ? (
                  <Image
                    src="/simetH.png"
                    alt="logo"
                    width={281}
                    height={87}
                    className="object-cover w-32 h-auto sm:w-40 md:w-48 lg:w-64"
                  />
                ) : (
                  <Image
                    src="/simetH.png"
                    alt="logo"
                    width={281}
                    height={87}
                    className="object-cover w-32 h-auto sm:w-40 md:w-48 lg:w-64"
                  />
                )}
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/QuienesSomos">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isScrolled ? "text-gray-700" : "text-white"
                      )}
                    >
                      Quienes somos{" "}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <Link href={"/Servicios"} className="hover:cursor-pointer">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center uppercase rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary  focus:outline-none disabled:pointer-events-none disabled:opacity-50 bg-transparent",
                        isScrolled ? "text-gray-700" : "text-white "
                      )}
                    >
                      Servicios
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-80 p-2">
                        {categorias.map((item) => (
                          <Link
                            key={item.nombre}
                            href={`/Servicios?categoria=${item.nombre}`}
                          >
                            <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">
                                {item.nombre}
                              </div>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </Link>

                <NavigationMenuItem>
                  <Link href="/DesarrolloProyectos">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isScrolled ? "text-gray-700 " : "text-white  "
                      )}
                    >
                      Desarrollo de proyectos{" "}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/Clientes">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isScrolled ? "text-gray-700" : "text-white"
                      )}
                    >
                      Clientes{" "}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Menu Button and Quote Button */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Quote Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Link href="/Contacto">
                  <Button
                    className={`px-3 py-2 md:px-6 md:py-2 rounded-full font-bold transition-all duration-300 shadow-lg hover:cursor-pointer text-xs md:text-sm ${
                      isScrolled
                        ? "bg-primary text-white hover:bg-primary/90 hover:shadow-xl"
                        : "bg-white text-primary hover:bg-white/90 hover:shadow-xl"
                    }`}
                  >
                    CONTACTO
                  </Button>
                </Link>
              </motion.div>

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
                {/* Services Dropdown */}
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "services" ? null : "services"
                      )
                    }
                    className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <span className="font-medium uppercase">SERVICIOS</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openDropdown === "services" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "services" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 space-y-1"
                      >
                        {legalServices.map((service) => (
                          <Link
                            key={service.name}
                            href={service.href}
                            onClick={closeMobileMenu}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors uppercase"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Centro de Arbitraje Dropdown */}
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "arbitration" ? null : "arbitration"
                      )
                    }
                    className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <span className="font-medium uppercase">
                      CENTRO DE ARBITRAJE
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openDropdown === "arbitration" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "arbitration" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 space-y-1"
                      >
                        {arbitrationCenter.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={closeMobileMenu}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Direct Links */}
                <Link
                  href="/Laudos"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
                >
                  BANCO DE LAUDOS
                </Link>

                <Link
                  href="/NuestroEquipo"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium uppercase"
                >
                  NUESTRO EQUIPO
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
    </>
  );
};

export default Header;
