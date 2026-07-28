import { Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { ContactForm } from "@/components/forms";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Bir konuşma başlatalım."
        description="Sponsorluk, iş birliği, etkinlik veya takımımızla ilgili sorularınız için bize ulaşabilirsiniz."
      />
      <section className="section-space">
        <div className="container-shell">
          <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
            <Reveal>
              <p className="eyebrow">Bize ulaşın</p>
              <div className="mt-8 space-y-8">
                <div className="flex gap-4">
                  <MapPin className="mt-1 shrink-0 text-burgundy" size={20} />
                  <div>
                    <strong className="font-display uppercase">Yerleşke</strong>
                    <p className="mt-2 text-sm leading-7 text-white/45">Muğla Sıtkı Koçman Üniversitesi<br />Kötekli Yerleşkesi, Muğla</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="mt-1 shrink-0 text-burgundy" size={20} />
                  <div>
                    <strong className="font-display uppercase">E-posta adresleri</strong>
                    <div className="mt-3 space-y-2 text-sm">
                      <a href="mailto:mskuracing@gmail.com" className="block text-white/55 transition hover:text-white">mskuracing@gmail.com</a>
                      <a href="mailto:mskuracingtopluluk@gmail.com" className="block text-white/55 transition hover:text-white">mskuracingtopluluk@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={.1} className="rounded-sm border border-white/10 bg-white/[.025] p-6 md:p-9">
              <ContactForm />
            </Reveal>
          </div>

          <Reveal delay={.2} className="mt-14 overflow-hidden border border-white/10 bg-white/[.025]">
            <div className="border-b border-white/10 p-6 md:px-9 md:py-7">
              <p className="eyebrow">Konum</p>
              <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-[-.025em] md:text-3xl">
                MSKÜ Mühendislik Fakültesi
              </h2>
            </div>
            <div className="aspect-[4/3] w-full md:aspect-[16/7]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1890.6177744458782!2d28.373323808424693!3d37.16155784221463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bf73c67849a06d%3A0xbb46177fd2b5ee27!2zTcO8aGVuZGlzbGlrIEZha8O8bHRlc2kgfCBNdcSfbGEgU8SxdGvEsSBLb8OnbWFuIMOcbml2ZXJzaXRlc2k!5e0!3m2!1str!2str!4v1785221247184!5m2!1str!2str"
                title="Muğla Sıtkı Koçman Üniversitesi Mühendislik Fakültesi konumu"
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
