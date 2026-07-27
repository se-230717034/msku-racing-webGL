import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion-reveal";

const stories = [
  ["Geliştirme","Amper konsept tasarımı tamamlandı","Aylar süren karşılaştırma, simülasyon ve yerleşim çalışmalarının ardından yeni platformumuz detay tasarım sürecine girdi.","22 Temmuz 2026","https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=85"],
  ["Takım","Araç dinamiği: yol tutuş doğru sorularla başlar","Lastik verilerini ve sürücü geri bildirimlerini çevik bir şasiye dönüştüren ekibimizi tanıyın.","04 Temmuz 2026","https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85"],
  ["Atölye","İlk karbon fiber serimimiz","Yeni takım içi üretim süreci daha hafif, daha rijit gövde parçaları ve büyük bir öğrenme deneyimi sağlıyor.","18 Haziran 2026","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85"],
  ["İş Birliği","2026 üretim iş birliğimiz büyüyor","Hassas imalat olanaklarına daha iyi erişim, geliştirme döngülerimizi hızlandırıyor.","29 Mayıs 2026","https://images.unsplash.com/photo-1565439396-9e59f6d5dc1b?auto=format&fit=crop&w=1200&q=85"]
];

export default function NewsPage() {
  return (
    <>
      <PageHero eyebrow="Haberler ve üretim notları" title="Garajdan gelişmeler." description="İlerleme raporları, takım hikâyeleri, teknik incelemeler ve süreç boyunca öğrendiklerimiz." />
      <section className="section-space"><div className="container-shell grid gap-x-6 gap-y-12 md:grid-cols-2">
        {stories.map(([tag,title,copy,date,image],i)=><Reveal key={title} delay={(i%2)*.07}>
          <article className="group">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10"><Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover saturate-[.7] transition duration-700 group-hover:scale-105 group-hover:saturate-100" /></div>
            <div className="mt-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[.18em] text-white/35"><span className="text-accent">{tag}</span><span>{date}</span></div>
            <h2 className="mt-4 flex items-start justify-between gap-5 font-display text-3xl font-semibold uppercase leading-tight tracking-[-.035em]">{title}<ArrowUpRight className="mt-1 shrink-0 text-white/25 transition group-hover:text-accent" /></h2>
            <p className="mt-4 max-w-xl leading-7 text-white/45">{copy}</p>
          </article>
        </Reveal>)}
      </div></section>
    </>
  );
}
