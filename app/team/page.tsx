"use client";

import { BriefcaseBusiness, CalendarDays, Code2, Cpu, ExternalLink, Linkedin, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { useLanguage } from "@/components/language-provider";

const teams = [
  {
    trName: "Yönetim",
    enName: "Management",
    trDescription: "Takımın genel koordinasyonu, karar süreçleri ve departmanlar arası yönetimi.",
    enDescription: "Overall team coordination, decision-making and cross-department management.",
    icon: BriefcaseBusiness,
    members: [
      "Prof. Dr. Ali Arslan Kaya",
      "Dr. Öğr. Üyesi Hayriye Serra Altınoluk",
    ],
  },
  {
    trName: "Elektronik Ekibi",
    enName: "Electronics Team",
    trDescription: "Araç elektroniği, kablolama, veri toplama ve kontrol sistemleri.",
    enDescription: "Vehicle electronics, wiring, data acquisition and control systems.",
    icon: Cpu,
    members: [
      "Ufuk Çok",
      "Mahmut Can Aşar",
      "Eylül Deniz Kudu",
      "Alper Salih Günaydın",
      "Barış Bağcı",
      "Ebrar Azra Arslan",
      "Alperen Kaşıkçı",
      "Vatan Saatci",
    ],
  },
  {
    trName: "Yazılım Ekibi",
    enName: "Software Team",
    trDescription: "Gömülü yazılım, telemetri, veri analizi ve takımın dijital sistemleri.",
    enDescription: "Embedded software, telemetry, data analysis and the team's digital systems.",
    icon: Code2,
    members: [
      "Aslı Ceren Yılmaz",
      "Şenol Durmuş",
      "Yaşar Kaki",
      "Yunus Emre Çelik",
    ],
  },
  {
    trName: "Mekanik Ekip",
    enName: "Mechanical Team",
    trDescription: "Şasi, süspansiyon, aktarma, üretim ve aracın mekanik bütünlüğü.",
    enDescription: "Chassis, suspension, drivetrain, manufacturing and vehicle mechanical integrity.",
    icon: Wrench,
    members: [
      "Halil İbrahim Yılmaz",
      "Sertan Kurt",
      "Ata Üstün",
      "Tuğra Temur",
      "Zişan Günay",
    ],
  },
  {
    trName: "Organizasyon Ekibi",
    enName: "Organization Team",
    trDescription: "Etkinlik, iletişim, sponsorluk ve takım organizasyonu.",
    enDescription: "Events, communications, sponsorship and team organization.",
    icon: CalendarDays,
    members: [
      "Eylül Deniz Kudu",
      "Ebrar Azra Arslan",
      "Şule Nilay Aktaş",
      "Selin Kula",
      "Zişan Günay",
    ],
  },
];

const linkedinProfiles: Record<string, string> = {
  "Ufuk Çok": "https://www.linkedin.com/in/ufuk-%C3%A7ok-9a326734a/",
  "Mahmut Can Aşar": "https://www.linkedin.com/in/mahmut-can-a%C5%9Far-50a2b93b0/",
  "Eylül Deniz Kudu": "https://www.linkedin.com/in/eyl%C3%BCldenizkudu/",
  "Alper Salih Günaydın": "https://www.linkedin.com/in/alper-g%C3%BCnayd%C4%B1n-2641543b6/",
  "Barış Bağcı": "https://www.linkedin.com/in/bar%C4%B1%C5%9F-ba%C4%9Fc%C4%B1-580a5a1ab/",
  "Ebrar Azra Arslan": "https://www.linkedin.com/in/ebrar-azra-arslan-88a592290/",
  "Vatan Saatci": "https://www.linkedin.com/in/vatan-saatci-3a2571425/",
  "Aslı Ceren Yılmaz": "https://www.linkedin.com/in/asl%C4%B1cereny%C4%B1lmaz/",
  "Şenol Durmuş": "https://www.linkedin.com/in/%C5%9Fenol-durmu%C5%9F-b570613b7/",
  "Yaşar Kaki": "https://www.linkedin.com/in/yasarkaki/",
  "Halil İbrahim Yılmaz": "https://www.linkedin.com/in/halil-ibrahim-y%C4%B1lmaz-7a2a35229/",
  "Sertan Kurt": "https://www.linkedin.com/in/sertan-kurt-59bb6a185/",
  "Ata Üstün": "https://www.linkedin.com/in/ata-ustun/",
  "Tuğra Temur": "https://www.linkedin.com/in/tu%C4%9Fra-temur-8508732a3/",
  "Zişan Günay": "https://www.linkedin.com/in/zi%C5%9Fan-g%C3%BCnay-9bb27b286/",
  "Şule Nilay Aktaş": "https://www.linkedin.com/in/nilay-aktas-95b1aa3ab/",
  "Selin Kula": "https://www.linkedin.com/in/selin-kula-5b033b2a2/",
};

const universityProfiles: Record<string, string> = {
  "Prof. Dr. Ali Arslan Kaya": "https://www.mu.edu.tr/tr/personel/aakaya",
  "Dr. Öğr. Üyesi Hayriye Serra Altınoluk": "https://www.mu.edu.tr/tr/personel/serraltinoluk",
};

export default function TeamPage() {
  const { language, translate } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={translate("Takımımız", "Our Team")}
        title={translate("Yönetim ve dört ekip. Tek hedef.", "Management and four teams. One goal.")}
        description={translate("Amper'i tasarlayan, geliştiren ve takımın sürdürülebilirliğini sağlayan MSKU RACING üyeleri.", "The MSKU RACING members who design and develop Amper while ensuring the team's sustainability.")}
      />

      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          {teams.map(({ trName, enName, trDescription, enDescription, icon: Icon, members }, teamIndex) => {
            const name = language === "tr" ? trName : enName;
            return (
            <Reveal key={trName} delay={teamIndex * .06} className={teamIndex === 0 ? "lg:col-span-2" : ""}>
              <article className="h-full border border-white/10 bg-[#0D1425]">
                <header className="flex items-start justify-between gap-6 border-b border-white/10 p-7 md:p-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.22em] text-green">
                      {translate("Ekip", "Team")} 0{teamIndex + 1}
                    </p>
                    <h2 className="mt-4 font-display text-3xl font-semibold uppercase tracking-[-.035em]">
                      {name}
                    </h2>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/45">{language === "tr" ? trDescription : enDescription}</p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center border border-university/50 bg-university/10 text-white/70">
                    <Icon size={22} />
                  </span>
                </header>

                <div className="p-7 md:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/35">{translate("Ekip üyeleri", "Team members")}</p>
                    <span className="font-display text-sm text-burgundy">{members.length} {translate("kişi", "people")}</span>
                  </div>
                  <ul className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
                    {members.map((member, memberIndex) => {
                      const linkedinUrl = linkedinProfiles[member];
                      const universityUrl = universityProfiles[member];
                      const profileUrl = universityUrl ?? linkedinUrl;

                      return (
                        <li key={`${name}-${member}`} className="flex items-center gap-3 bg-[#0A1020] px-4 py-4 text-sm">
                          <span className="font-display text-[10px] text-university">
                            {String(memberIndex + 1).padStart(2, "0")}
                          </span>
                          {profileUrl ? (
                            <a
                              href={profileUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${member} ${universityUrl ? translate("üniversite personel sayfasını aç", "open university staff page") : translate("LinkedIn profilini aç", "open LinkedIn profile")}`}
                              className="group/member flex min-w-0 flex-1 items-center justify-between gap-3 text-white/75 transition-colors hover:text-burgundy"
                            >
                              <span>{member}</span>
                              {universityUrl ? (
                                <ExternalLink
                                  size={15}
                                  className="shrink-0 opacity-50 transition-opacity group-hover/member:opacity-100"
                                />
                              ) : (
                                <Linkedin
                                  size={15}
                                  className="shrink-0 opacity-50 transition-opacity group-hover/member:opacity-100"
                                />
                              )}
                            </a>
                          ) : (
                            <span className="text-white/75">{member}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            </Reveal>
          )})}
        </div>
      </section>
    </>
  );
}
