"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";

const Main = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {pathname.includes("/Admin") ? (
        <>{children}</>
      ) : (
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
      )}
    </>
  );
};


export default Main;
