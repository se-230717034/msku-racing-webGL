"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const field = "w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-accent/70 focus:bg-white/[.06]";

export function JoinForm() {
  const [sent,setSent] = useState(false);
  function submit(e:FormEvent){ e.preventDefault(); setSent(true); }
  if(sent) return <div className="rounded-sm border border-burgundy/40 bg-burgundy/10 p-8"><CheckCircle2 className="text-green" size={32}/><h3 className="mt-5 font-display text-2xl font-semibold uppercase">Başvurunuz alındı.</h3><p className="mt-3 leading-7 text-white/50">İlginiz için teşekkürler. Takımımız başvurunuzu değerlendirdikten sonra size dönüş yapacak.</p></div>;
  return <form onSubmit={submit} className="grid gap-4">
    <div className="grid gap-4 sm:grid-cols-2"><input required className={field} placeholder="Ad soyad" /><input required type="email" className={field} placeholder="Üniversite e-postası" /></div>
    <div className="grid gap-4 sm:grid-cols-2"><input required className={field} placeholder="Bölüm" /><select required className={field} defaultValue=""><option value="" disabled>İlgilendiğiniz departman</option><option>Araç Dinamiği</option><option>Güç Aktarma</option><option>Aerodinamik</option><option>Şasi ve Kompozit</option><option>Elektronik</option><option>İş Geliştirme ve Medya</option></select></div>
    <textarea required rows={6} className={field} placeholder="Bizimle ne üretmek veya öğrenmek istersiniz?" />
    <Button type="submit" className="mt-2 w-fit">Başvuruyu gönder <Send size={15}/></Button>
  </form>
}

export function ContactForm() {
  const [sent,setSent] = useState(false);
  function submit(e:FormEvent){ e.preventDefault(); setSent(true); }
  if(sent) return <div className="rounded-sm border border-burgundy/40 bg-burgundy/10 p-8"><CheckCircle2 className="text-green" size={32}/><h3 className="mt-5 font-display text-2xl font-semibold uppercase">Mesajınız gönderildi.</h3><p className="mt-3 leading-7 text-white/50">Mesajınızı aldık. En kısa sürede size dönüş yapacağız.</p></div>;
  return <form onSubmit={submit} className="grid gap-4">
    <div className="grid gap-4 sm:grid-cols-2"><input required className={field} placeholder="Adınız" /><input required type="email" className={field} placeholder="E-posta adresiniz" /></div>
    <input required className={field} placeholder="Konu" />
    <textarea required rows={7} className={field} placeholder="Size nasıl yardımcı olabiliriz?" />
    <Button type="submit" className="w-fit">Mesajı gönder <Send size={15}/></Button>
  </form>
}
