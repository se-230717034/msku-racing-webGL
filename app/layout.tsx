import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/components/language-provider";
import { MotorsportMotion } from "@/components/motorsport-motion";
import { ScrollRacer } from "@/components/scroll-racer";
import { MemberCardPopup } from "@/components/member-card-popup";

const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope" });
const space = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-space" });

export const metadata: Metadata = {
  metadataBase: new URL("https://msku-racing-preview.vercel.app"),
  title: { default: "MSKU RACING", template: "%s — MSKU RACING" },
  description: "Muğla Sıtkı Koçman Üniversitesi Formula Student Takımı.",
  openGraph: {
    title: "MSKU RACING",
    description: "Muğla Sıtkı Koçman Üniversitesi Formula Student Takımı.",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 1024, alt: "MSKU RACING Formula Student Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSKU RACING",
    description: "Muğla Sıtkı Koçman Üniversitesi Formula Student Takımı.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/images/msku-racing-logo-v2.png",
    apple: "/images/msku-racing-logo-v2.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('msku-racing-theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}if(localStorage.getItem('msku-racing-language')==='en'){document.documentElement.lang='en'}}catch(e){}",
          }}
        />
      </head>
      <body className={`${manrope.variable} ${space.variable} font-sans antialiased`}>
        <div className="noise" />
        <LanguageProvider>
          <MotorsportMotion />
          <ScrollRacer />
          <MemberCardPopup />
          <Header />
          <main id="site-main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
