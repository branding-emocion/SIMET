import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Main from "./Main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SIMET AG SAC - Industria Metalmecánica",
  description:
    "Más de 10 años ejecutando proyectos de diseño, fabricación y mantenimiento para el sector agroindustrial, minero y pesquero.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Main>{children}</Main>
      </body>
    </html>
  );
}
