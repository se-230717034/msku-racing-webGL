"use client";

import { ChevronDown, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { ContactForm } from "@/components/forms";
import { useLanguage } from "@/components/language-provider";

const faqs = [
  {
    trQuestion: "Formula Student nedir?",
    enQuestion: "What is Formula Student?",
    trAnswer: "Formula Student, üniversite öğrencilerinin kendi yarış araçlarını tasarlayıp ürettiği uluslararası bir mühendislik yarışmasıdır. Takımlar; mühendislik tasarımı, maliyet analizi, iş planı sunumu ve pist performansı gibi birçok farklı alanda değerlendirilir.",
    enAnswer: "Formula Student is an international engineering competition in which university students design and manufacture their own race cars. Teams are evaluated in engineering design, cost analysis, business plan presentation and on-track performance.",
  },
  {
    trQuestion: "MSKU Racing nedir?",
    enQuestion: "What is MSKU Racing?",
    trAnswer: "MSKU Racing, Muğla Sıtkı Koçman Üniversitesi'nin resmi Formula Student takımıdır. Takımımız, teorik mühendislik bilgisini gerçek bir yarış aracı üzerinde uygulayarak yenilikçi çözümler geliştirmeyi ve üniversitemizi ulusal ve uluslararası platformlarda temsil etmeyi amaçlamaktadır.",
    enAnswer: "MSKU Racing is the official Formula Student team of Muğla Sıtkı Koçman University. We apply theoretical engineering knowledge to a real race car, develop innovative solutions and represent our university on national and international platforms.",
  },
  {
    trQuestion: "Formula Student sadece hız yarışı mıdır?",
    enQuestion: "Is Formula Student only a speed race?",
    trAnswer: "Hayır. Formula Student yalnızca en hızlı aracı belirlemeyi amaçlayan bir yarış değildir. Takımlar; araç tasarımı, üretim kalitesi, maliyet yönetimi, iş planı sunumu ve dinamik sürüş performansı gibi birçok farklı kriter üzerinden değerlendirilir.",
    enAnswer: "No. Formula Student is not simply about finding the fastest car. Teams are evaluated across vehicle design, manufacturing quality, cost management, business plan presentation and dynamic driving performance.",
  },
  {
    trQuestion: "Takım hangi alanlarda faaliyet göstermektedir?",
    enQuestion: "What areas does the team work in?",
    trAnswer: "MSKU Racing; araç tasarımı, üretim, test süreçleri ve proje yönetimi gibi birçok alanda çalışmalar yürütmektedir. Takım içerisinde mekanik, elektronik, yazılım, üretim ve organizasyon süreçleri koordineli şekilde ilerletilmektedir.",
    enAnswer: "MSKU Racing works in vehicle design, manufacturing, testing and project management. Mechanical, electronics, software, manufacturing and organization processes progress in coordination within the team.",
  },
  {
    trQuestion: "Nasıl sponsor olabilirim?",
    enQuestion: "How can I become a sponsor?",
    trAnswer: "Takımımıza destek olmak isteyen kurum ve kuruluşlar, iletişim sayfamızdaki formu doldurarak veya e-posta adresimiz üzerinden bizimle iletişime geçebilir. Sponsorluk paketleri ve iş birliği fırsatları hakkında detaylı bilgi paylaşılmaktadır.",
    enAnswer: "Organizations interested in supporting our team can contact us through the form on this page or by email. We will share detailed information about sponsorship packages and collaboration opportunities.",
  },
  {
    trQuestion: "MSKU Racing'i nasıl takip edebilirim?",
    enQuestion: "How can I follow MSKU Racing?",
    trAnswer: "Takımımızın güncel çalışmalarını, etkinliklerini ve yarış hazırlıklarını web sitemiz ile Instagram, LinkedIn ve diğer resmi sosyal medya hesaplarımız üzerinden takip edebilirsiniz.",
    enAnswer: "You can follow our latest work, events and competition preparations through our website, Instagram, LinkedIn and other official social media accounts.",
  },
];

export default function ContactPage() {
  const { language, translate } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={translate("İletişim", "Contact")}
        title={translate("Bir konuşma başlatalım.", "Let's start a conversation.")}
        description={translate("Sponsorluk, iş birliği, etkinlik veya takımımızla ilgili sorularınız için bize ulaşabilirsiniz.", "Contact us about sponsorship, collaboration, events or any questions about our team.")}
      />
      <section className="section-space">
        <div className="container-shell">
          <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
            <Reveal>
              <p className="eyebrow">{translate("Bize ulaşın", "Reach us")}</p>
              <div className="mt-8 space-y-8">
                <div className="flex gap-4">
                  <MapPin className="mt-1 shrink-0 text-burgundy" size={20} />
                  <div>
                    <strong className="font-display uppercase">{translate("Yerleşke", "Campus")}</strong>
                    <p className="mt-2 text-sm leading-7 text-white/45">
                      Muğla Sıtkı Koçman Üniversitesi
                      <br />
                      {translate("Mühendislik Fakültesi", "Faculty of Engineering")}
                      <br />
                      {translate("Kötekli Yerleşkesi, Muğla", "Kötekli Campus, Muğla")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="mt-1 shrink-0 text-burgundy" size={20} />
                  <div>
                    <strong className="font-display uppercase">{translate("E-posta adresleri", "Email addresses")}</strong>
                    <div className="mt-3 space-y-2 text-sm">
                      <a href="mailto:mskuracing@gmail.com" className="block text-white/55 transition hover:text-white">mskuracing@gmail.com</a>
                      <a href="mailto:mskuracingtopluluk@gmail.com" className="block text-white/55 transition hover:text-white">mskuracingtopluluk@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={.1} className="premium-card border border-white/10 bg-white/[.025] p-6 md:p-9">
              <ContactForm />
            </Reveal>
          </div>

          <Reveal delay={.2} className="premium-card mt-14 overflow-hidden border border-white/10 bg-white/[.025]">
            <div className="border-b border-white/10 p-6 md:px-9 md:py-7">
              <p className="eyebrow">{translate("Konum", "Location")}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-[-.025em] md:text-3xl">
                {translate("MSKÜ Mühendislik Fakültesi", "MSKU Faculty of Engineering")}
              </h2>
            </div>
            <div className="aspect-[4/3] w-full md:aspect-[16/7]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.686751958454!2d28.374110269602728!3d37.16298681078372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bf73c67849a06d%3A0xbb46177fd2b5ee27!2zTcO8aGVuZGlzbGlrIEZha8O8bHRlc2kgfCBNdcSfbGEgU8SxdGvEsSBLb8OnbWFuIMOcbml2ZXJzaXRlc2k!5e0!3m2!1str!2str!4v1785221642069!5m2!1str!2str"
                title={translate("Muğla Sıtkı Koçman Üniversitesi Mühendislik Fakültesi konumu", "Location of Muğla Sıtkı Koçman University Faculty of Engineering")}
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
                <p className="eyebrow">{translate("Merak edilenler", "What people ask")}</p>
                <h2 className="mt-4 font-display text-3xl font-semibold uppercase tracking-[-.035em] md:text-4xl">
                  {translate("Sıkça sorulan sorular", "Frequently asked questions")}
                </h2>
                <p className="faq-answer mt-5 max-w-md text-sm leading-7 text-white/45">
                  {translate("Formula Student, takımımız, çalışmalarımız ve sponsorluk hakkında en çok sorulan soruların yanıtları.", "Answers to the most common questions about Formula Student, our team, our work and sponsorship.")}
                </p>
              </div>

              <div className="border-t border-white/10">
                {faqs.map(({ trQuestion, enQuestion, trAnswer, enAnswer }) => {
                  const question = language === "tr" ? trQuestion : enQuestion;
                  const answer = language === "tr" ? trAnswer : enAnswer;
                  return (
                  <details key={trQuestion} className="group border-b border-white/10">
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
                )})}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
