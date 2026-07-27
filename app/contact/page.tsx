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
        <div className="container-shell grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
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
      </section>
    </>
  );
}
