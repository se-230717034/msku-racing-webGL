import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/components/language-provider";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: { default: "MSKU RACING", template: "%s — MSKU RACING" },
  description: "Muğla Sıtkı Koçman Üniversitesi Formula Student Takımı.",
  icons: {
    icon: "/images/team-logo.png",
    apple: "/images/team-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('msku-racing-theme')==='dark'){document.documentElement.classList.remove('light');document.documentElement.classList.add('dark')}if(localStorage.getItem('msku-racing-language')==='en'){document.documentElement.lang='en'}}catch(e){}",
          }}
        />
      </head>
      <body className={`${manrope.variable} ${space.variable} font-sans antialiased`}>
        <div className="noise" />
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
