import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";

import BreadCrumbs from "@/components/BreadCrumbs";
import Footer from "@/components/footer/Footer";

const rubik = Rubik({
  variable: "--font-font-rubik",
  subsets: ["latin","cyrillic"],
});


export const metadata: Metadata = {
  title: "Galya Baluvana",
  description: "Магазин домашніх напів фабрикатів",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${rubik.variable}font-sans`} >
        <Header/>
        <BreadCrumbs/>
        {children}

        <Footer/>
      </body>
    </html>
  );
}
