import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: { default: "MSKU Racing", template: "%s — MSKU Racing" },
  description: "Muğla Sıtkı Koçman University Formula Student Team — engineered to move forward."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} ${space.variable} font-sans antialiased`}>
        <div className="noise" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
