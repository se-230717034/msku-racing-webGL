"use client";

import { BriefcaseBusiness, CalendarDays, Code2, Cpu, ExternalLink, Linkedin, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { useLanguage } from "@/components/language-provider";
import { getMemberProfile, isUniversityProfile, teamGroups } from "@/lib/team-data";

const teamIcons = [BriefcaseBusiness, Cpu, Code2, Wrench, CalendarDays];

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
          {teamGroups.map(({ trName, enName, trDescription, enDescription, members }, teamIndex) => {
            const name = language === "tr" ? trName : enName;
            const Icon = teamIcons[teamIndex];
            return (
            <Reveal key={trName} delay={teamIndex * .06} className={teamIndex === 0 ? "lg:col-span-2" : ""}>
              <article className="premium-card h-full border border-white/10 bg-[#0D1425]">
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
                      const profileUrl = getMemberProfile(member);
                      const universityUrl = isUniversityProfile(member);

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
