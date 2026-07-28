"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const field = "w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-accent/70 focus:bg-white/[.06]";
const contactEndpoint = "https://formspree.io/f/mqernppb";

export function JoinForm() {
  const [sent,setSent] = useState(false);
  function submit(e:FormEvent){ e.preventDefault(); setSent(true); }
  if(sent) return <div className="rounded-sm border border-burgundy/40 bg-burgundy/10 p-8"><CheckCircle2 className="text-green" size={32}/><h3 className="mt-5 font-display text-2xl font-semibold uppercase">Başvurunuz alındı.</h3><p className="mt-3 leading-7 text-white/50">İlginiz için teşekkürler. Takımımız başvurunuzu değerlendirdikten sonra size dönüş yapacak.</p></div>;
  return <form onSubmit={submit} className="grid gap-4">
    <div className="grid gap-4 sm:grid-cols-2"><input required className={field} placeholder="Ad soyad" /><input required type="email" className={field} placeholder="Üniversite e-postası" /></div>
    <div className="grid gap-4 sm:grid-cols-2"><input required className={field} placeholder="Bölüm" /><select required className={field} defaultValue=""><option value="" disabled>İlgilendiğiniz ekip</option><option>Mekanik Ekip</option><option>Elektronik Ekip</option><option>Yazılım Ekibi</option><option>Organizasyon Ekibi</option></select></div>
    <textarea required rows={6} className={field} placeholder="Bizimle ne üretmek veya öğrenmek istersiniz?" />
    <Button type="submit" className="mt-2 w-fit">Başvuruyu gönder <Send size={15}/></Button>
  </form>
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Formspree submission failed");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-sm border border-burgundy/40 bg-burgundy/10 p-8">
        <CheckCircle2 className="text-green" size={32} />
        <h3 className="mt-5 font-display text-2xl font-semibold uppercase">Mesajınız gönderildi.</h3>
        <p className="mt-3 leading-7 text-white/50">Mesajınızı aldık. En kısa sürede size dönüş yapacağız.</p>
        <Button type="button" onClick={() => setStatus("idle")} className="mt-6">
          Yeni mesaj gönder
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <input type="hidden" name="_subject" value="MSKU Racing web sitesi iletişim mesajı" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" autoComplete="name" aria-label="Adınız" className={field} placeholder="Adınız" />
        <input required name="email" type="email" autoComplete="email" aria-label="E-posta adresiniz" className={field} placeholder="E-posta adresiniz" />
      </div>
      <input required name="subject" aria-label="Konu" className={field} placeholder="Konu" />
      <textarea required name="message" rows={7} aria-label="Mesajınız" className={field} placeholder="Size nasıl yardımcı olabiliriz?" />

      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 text-sm text-burgundy">
          <AlertCircle size={16} />
          Mesaj gönderilemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin.
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-fit">
        {status === "sending" ? (
          <>
            Gönderiliyor <LoaderCircle size={15} className="animate-spin" />
          </>
        ) : (
          <>
            Mesajı gönder <Send size={15} />
          </>
        )}
      </Button>
    </form>
  );
}
