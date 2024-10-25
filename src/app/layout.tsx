//import icons
import 'bootstrap-icons/font/bootstrap-icons.css';

//import boostrap
import 'bootstrap/dist/css/bootstrap.css';

//import aos
import 'aos/dist/aos.css';

import type { Metadata } from "next";
import {EB_Garamond} from "next/font/google";

import Header from '@/components/Header';

import "./variables.css";
import "./globals.css";
import Footer from '@/components/footer';

const ebGermond = EB_Garamond({subsets: ['latin']});
export const metadata: Metadata = {
  title: "News App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ebGermond.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
