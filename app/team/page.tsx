import { BriefcaseBusiness, CalendarDays, Code2, Cpu, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";

const teams = [
  {
    name: "Yönetim",
    description: "Takımın genel koordinasyonu, karar süreçleri ve departmanlar arası yönetimi.",
    icon: BriefcaseBusiness,
    members: [
      "Prof. Dr. Ali Arslan Kaya",
      "Dr. Öğr. Üyesi Hayriye Serra Altınoluk",
    ],
  },
  {
    name: "Elektronik Ekibi",
    description: "Araç elektroniği, kablolama, veri toplama ve kontrol sistemleri.",
    icon: Cpu,
    members: [
      "Ufuk Çok",
      "Mahmut Can Aşar",
      "Eylül Deniz Kudu",
      "Alper Salih Günaydın",
      "Barış Bağcı",
      "Ebrar Azra Arslan",
      "Alperen Kaşıkçı",
      "Vatan Saatçi",
    ],
  },
  {
    name: "Yazılım Ekibi",
    description: "Gömülü yazılım, telemetri, veri analizi ve takımın dijital sistemleri.",
    icon: Code2,
    members: [
      "Aslı Ceren Yılmaz",
      "Şenol Durmuş",
      "Yaşar Kaki",
      "Yunus Emre Çelik",
    ],
  },
  {
    name: "Mekanik Ekip",
    description: "Şasi, süspansiyon, aktarma, üretim ve aracın mekanik bütünlüğü.",
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
    name: "Organizasyon Ekibi",
    description: "Etkinlik, iletişim, sponsorluk ve takım organizasyonu.",
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

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Takımımız"
        title="Yönetim ve dört ekip. Tek hedef."
        description="Amper'i tasarlayan, geliştiren ve takımın sürdürülebilirliğini sağlayan MSKU RACING üyeleri."
      />

      <section className="section-space">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          {teams.map(({ name, description, icon: Icon, members }, teamIndex) => (
            <Reveal key={name} delay={teamIndex * .06} className={teamIndex === 0 ? "lg:col-span-2" : ""}>
              <article className="h-full border border-white/10 bg-[#0D1425]">
                <header className="flex items-start justify-between gap-6 border-b border-white/10 p-7 md:p-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.22em] text-green">
                      Ekip 0{teamIndex + 1}
                    </p>
                    <h2 className="mt-4 font-display text-3xl font-semibold uppercase tracking-[-.035em]">
                      {name}
                    </h2>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/45">{description}</p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center border border-university/50 bg-university/10 text-white/70">
                    <Icon size={22} />
                  </span>
                </header>

                <div className="p-7 md:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Ekip üyeleri</p>
                    <span className="font-display text-sm text-burgundy">{members.length} kişi</span>
                  </div>
                  <ul className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
                    {members.map((member, memberIndex) => (
                      <li key={`${name}-${member}`} className="flex items-center gap-3 bg-[#0A1020] px-4 py-4 text-sm">
                        <span className="font-display text-[10px] text-university">
                          {String(memberIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white/75">{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
