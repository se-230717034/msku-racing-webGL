import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";
import { ContactForm } from "@/components/forms";

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Start a conversation." description="Partnership, collaboration, events, or a question about the team—we would like to hear from you." />
      <section className="section-space"><div className="container-shell grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
        <Reveal>
          <p className="eyebrow">Find us</p>
          <div className="mt-8 space-y-7">
            <div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-accent" size={20}/><div><strong className="font-display uppercase">Workshop</strong><p className="mt-2 text-sm leading-7 text-white/45">Muğla Sıtkı Koçman University<br/>Kötekli Campus, Muğla</p></div></div>
            <div className="flex gap-4"><Mail className="mt-1 shrink-0 text-accent" size={20}/><div><strong className="font-display uppercase">Email</strong><p className="mt-2 text-sm text-white/45">racing@mu.edu.tr</p></div></div>
            <div className="flex gap-4"><Phone className="mt-1 shrink-0 text-accent" size={20}/><div><strong className="font-display uppercase">Team office</strong><p className="mt-2 text-sm text-white/45">+90 252 211 00 00</p></div></div>
          </div>
          <p className="mt-10 text-xs leading-6 text-white/25">Contact details shown are project placeholders and should be replaced with the team’s official information before launch.</p>
        </Reveal>
        <Reveal delay={.1} className="rounded-2xl border border-white/10 bg-white/[.025] p-6 md:p-9"><ContactForm /></Reveal>
      </div></section>
    </>
  );
}
