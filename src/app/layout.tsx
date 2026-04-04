import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import InteractiveBackground from "@/components/InteractiveBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Gautam N Chipkar | Portfolio",
  description: "AI & Data Science Engineer, ML Engineer, Creative Technologist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-white bg-[#121212]`}>
        <SmoothScroll>
            {/* The global background persistent across all scroll positions */}
            <InteractiveBackground />
            
            <Cursor />
            {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
