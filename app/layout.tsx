import type { Metadata } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Header from "../component/Header";
import Footer from "../component/Footer";
import BottomNav from "../component/Bottomnav";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const circe = localFont({
  src: "../public/fonts/Circe-Regular.otf",
  variable: "--font-circe",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPARRC",
  description: "SPARRC Sports & Fitness Medicine Clinic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${circe.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}