"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-provider";

const field = "form-field w-full border border-white/10 bg-white/[.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-accent/70 focus:bg-white/[.06]";
const contactEndpoint = "https://formspree.io/f/mqernppb";

export function JoinForm() {
  const [sent,setSent] = useState(false);
  const { translate } = useLanguage();
  function submit(e:FormEvent){ e.preventDefault(); setSent(true); }
  if(sent) return <div className="rounded-sm border border-burgundy/40 bg-burgundy/10 p-8"><CheckCircle2 className="text-green" size={32}/><h3 className="mt-5 font-display text-2xl font-semibold uppercase">{translate("Başvurunuz alındı", "Your application has been received")}</h3><p className="mt-3 leading-7 text-white/50">{translate("İlginiz için teşekkürler. Takımımız başvurunuzu değerlendirdikten sonra size dönüş yapacak.", "Thank you for your interest. Our team will contact you after reviewing your application.")}</p></div>;
  return <form onSubmit={submit} className="grid gap-4">
    <div className="grid gap-4 sm:grid-cols-2"><input required className={field} placeholder={translate("Ad soyad", "Full name")} /><input required type="email" className={field} placeholder={translate("Üniversite e-postası", "University email")} /></div>
    <div className="grid gap-4 sm:grid-cols-2"><input required className={field} placeholder={translate("Bölüm", "Department")} /><select required className={field} defaultValue=""><option value="" disabled>{translate("İlgilendiğiniz ekip", "Team of interest")}</option><option>{translate("Mekanik Ekip", "Mechanical Team")}</option><option>{translate("Elektronik Ekip", "Electronics Team")}</option><option>{translate("Yazılım Ekibi", "Software Team")}</option><option>{translate("Organizasyon Ekibi", "Organization Team")}</option></select></div>
    <textarea required rows={6} className={field} placeholder={translate("Bizimle ne üretmek veya öğrenmek istersiniz?", "What would you like to build or learn with us?")} />
    <Button type="submit" className="mt-2 w-fit">{translate("Başvuruyu gönder", "Submit application")} <Send size={15}/></Button>
  </form>
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { translate } = useLanguage();

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
        <h3 className="mt-5 font-display text-2xl font-semibold uppercase">{translate("Mesajınız gönderildi", "Your message has been sent")}</h3>
        <p className="mt-3 leading-7 text-white/50">{translate("Mesajınızı aldık. En kısa sürede size dönüş yapacağız.", "We have received your message and will get back to you as soon as possible.")}</p>
        <Button type="button" onClick={() => setStatus("idle")} className="mt-6">
          {translate("Yeni mesaj gönder", "Send another message")}
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
        <input required name="name" autoComplete="name" aria-label={translate("Adınız", "Your name")} className={field} placeholder={translate("Adınız", "Your name")} />
        <input required name="email" type="email" autoComplete="email" aria-label={translate("E-posta adresiniz", "Your email address")} className={field} placeholder={translate("E-posta adresiniz", "Your email address")} />
      </div>
      <input required name="subject" aria-label={translate("Konu", "Subject")} className={field} placeholder={translate("Konu", "Subject")} />
      <textarea required name="message" rows={7} aria-label={translate("Mesajınız", "Your message")} className={field} placeholder={translate("Size nasıl yardımcı olabiliriz?", "How can we help you?")} />

      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 text-sm text-burgundy">
          <AlertCircle size={16} />
          {translate("Mesaj gönderilemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin.", "The message could not be sent. Please check your connection and try again.")}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-fit">
        {status === "sending" ? (
          <>
            {translate("Gönderiliyor", "Sending")} <LoaderCircle size={15} className="animate-spin" />
          </>
        ) : (
          <>
            {translate("Mesajı gönder", "Send message")} <Send size={15} />
          </>
        )}
      </Button>
    </form>
  );
}
