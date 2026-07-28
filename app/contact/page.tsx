import { ChevronDown, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { ContactForm } from "@/components/forms";

const faqs = [
  {
    question: "Formula Student nedir?",
    answer: "Formula Student, üniversite öğrencilerinin kendi yarış araçlarını tasarlayıp ürettiği uluslararası bir mühendislik yarışmasıdır. Takımlar; mühendislik tasarımı, maliyet analizi, iş planı sunumu ve pist performansı gibi birçok farklı alanda değerlendirilir.",
  },
  {
    question: "MSKU Racing nedir?",
    answer: "MSKU Racing, Muğla Sıtkı Koçman Üniversitesi'nin resmi Formula Student takımıdır. Takımımız, teorik mühendislik bilgisini gerçek bir yarış aracı üzerinde uygulayarak yenilikçi çözümler geliştirmeyi ve üniversitemizi ulusal ve uluslararası platformlarda temsil etmeyi amaçlamaktadır.",
  },
  {
    question: "Formula Student sadece hız yarışı mıdır?",
    answer: "Hayır. Formula Student yalnızca en hızlı aracı belirlemeyi amaçlayan bir yarış değildir. Takımlar; araç tasarımı, üretim kalitesi, maliyet yönetimi, iş planı sunumu ve dinamik sürüş performansı gibi birçok farklı kriter üzerinden değerlendirilir.",
  },
  {
    question: "Takım hangi alanlarda faaliyet göstermektedir?",
    answer: "MSKU Racing; araç tasarımı, üretim, test süreçleri ve proje yönetimi gibi birçok alanda çalışmalar yürütmektedir. Takım içerisinde mekanik, elektronik, yazılım, üretim ve organizasyon süreçleri koordineli şekilde ilerletilmektedir.",
  },
  {
    question: "Nasıl sponsor olabilirim?",
    answer: "Takımımıza destek olmak isteyen kurum ve kuruluşlar, iletişim sayfamızdaki formu doldurarak veya e-posta adresimiz üzerinden bizimle iletişime geçebilir. Sponsorluk paketleri ve iş birliği fırsatları hakkında detaylı bilgi paylaşılmaktadır.",
  },
  {
    question: "MSKU Racing'i nasıl takip edebilirim?",
    answer: "Takımımızın güncel çalışmalarını, etkinliklerini ve yarış hazırlıklarını web sitemiz ile Instagram, LinkedIn ve diğer resmi sosyal medya hesaplarımız üzerinden takip edebilirsiniz.",
  },
];

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
                    <p className="mt-2 text-sm leading-7 text-white/45">
                      Muğla Sıtkı Koçman Üniversitesi
                      <br />
                      Mühendislik Fakültesi
                      <br />
                      Kötekli Yerleşkesi, Muğla
                    </p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.686751958454!2d28.374110269602728!3d37.16298681078372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bf73c67849a06d%3A0xbb46177fd2b5ee27!2zTcO8aGVuZGlzbGlrIEZha8O8bHRlc2kgfCBNdcSfbGEgU8SxdGvEsSBLb8OnbWFuIMOcbml2ZXJzaXRlc2k!5e0!3m2!1str!2str!4v1785221642069!5m2!1str!2str"
                title="Muğla Sıtkı Koçman Üniversitesi Mühendislik Fakültesi konumu"
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>

          <Reveal delay={.25} className="mt-20">
            <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
              <div>
                <p className="eyebrow">Merak edilenler</p>
                <h2 className="mt-4 font-display text-3xl font-semibold uppercase tracking-[-.035em] md:text-4xl">
                  Sıkça sorulan sorular
                </h2>
                <p className="faq-answer mt-5 max-w-md text-sm leading-7 text-white/45">
                  Formula Student, takımımız, çalışmalarımız ve sponsorluk hakkında en çok sorulan soruların yanıtları.
                </p>
              </div>

              <div className="border-t border-white/10">
                {faqs.map(({ question, answer }) => (
                  <details key={question} className="group border-b border-white/10">
                    <summary className="faq-question flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-base font-semibold uppercase tracking-[-.01em] text-white/80 transition hover:text-burgundy [&::-webkit-details-marker]:hidden">
                      <span>{question}</span>
                      <ChevronDown
                        size={19}
                        className="shrink-0 text-burgundy transition-transform duration-300 group-open:rotate-180"
                      />
                    </summary>
                    <p className="faq-answer max-w-2xl pb-6 pr-10 text-sm leading-7 text-white/50">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
