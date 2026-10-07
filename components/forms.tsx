"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-provider";

const field = "form-field w-full border border-white/10 bg-white/[.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/45 focus:border-accent/70 focus:bg-white/[.06]";
const web3FormsEndpoint = "https://api.web3forms.com/submit";
const communityAccessKey = "1bec78ea-c6ef-4f98-bdf3-ca42ba8daf95";
const teamApplicationAccessKey = "e831a724-fbce-48d6-8c66-b7cd73bf1dd2";

type JoinRequestType = "team" | "community";

export function JoinForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [communityOnly, setCommunityOnly] = useState(false);
  const [submittedType, setSubmittedType] = useState<JoinRequestType | null>(null);
  const { translate } = useLanguage();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const requestType: JoinRequestType = communityOnly ? "community" : "team";
    const formData = new FormData(form);
    formData.set("application_type", requestType === "community" ? "community_membership" : "team_application");
    setSubmittedType(requestType);
    setStatus("sending");

    try {
      const response = await fetch(web3FormsEndpoint, {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) throw new Error("Web3Forms submission failed");

      form.reset();
      setCommunityOnly(false);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    const isCommunityMembership = submittedType === "community";

    return (
      <div role="status" className="rounded-sm border border-burgundy/40 bg-burgundy/10 p-8">
        <CheckCircle2 className="text-green" size={32} />
        <h3 className="mt-5 font-display text-2xl font-semibold uppercase">
          {isCommunityMembership
            ? translate("Üyelik talebiniz alındı.", "Your membership request has been received.")
            : translate("Başvurunuz alındı.", "Your application has been received.")}
        </h3>
        <p className="mt-3 leading-7 text-white/50">
          {isCommunityMembership
            ? translate("Topluluğumuza gösterdiğiniz ilgi için teşekkürler. En kısa sürede size dönüş yapacağız.", "Thank you for your interest in our community. We will get back to you as soon as possible.")
            : translate("İlginiz için teşekkürler. Takımımız başvurunuzu değerlendirdikten sonra size dönüş yapacak.", "Thank you for your interest. Our team will contact you after reviewing your application.")}
        </p>
        <Button
          type="button"
          onClick={() => {
            setSubmittedType(null);
            setStatus("idle");
          }}
          className="mt-6"
        >
          {translate("Yeni talep gönder", "Send another request")}
        </Button>
      </div>
    );
  }

  const activeAccessKey = communityOnly ? communityAccessKey : teamApplicationAccessKey;

  return (
    <form action={web3FormsEndpoint} method="POST" onSubmit={submit} className="join-form grid gap-5">
      <input type="hidden" name="access_key" value={activeAccessKey} />
      <input type="hidden" name="subject" value={communityOnly ? "MSKU Racing topluluk üyeliği" : "MSKU Racing takım başvurusu"} />
      <input type="hidden" name="from_name" value="MSKU Racing Website" />
      <input type="hidden" name="application_type" value={communityOnly ? "community_membership" : "team_application"} />
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="form-field-group" htmlFor="join-name">
          <span className="form-label">{translate("Ad soyad", "Full name")} <b aria-hidden="true">*</b></span>
          <input id="join-name" required name="name" autoComplete="name" className={field} placeholder={translate("Adınız ve soyadınız", "Your full name")} />
        </label>
        <label className="form-field-group" htmlFor="join-email">
          <span className="form-label">{translate("Üniversite e-postası", "University email")} <b aria-hidden="true">*</b></span>
          <input id="join-email" required name="email" type="email" autoComplete="email" className={field} placeholder="ornek@posta.mu.edu.tr" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="form-field-group" htmlFor="join-department">
          <span className="form-label">{translate("Bölüm", "Department")} <b aria-hidden="true">*</b></span>
          <input id="join-department" required name="department" className={field} placeholder={translate("Okuduğunuz bölüm", "Your department")} />
        </label>
        <label className="form-field-group" htmlFor="join-phone">
          <span className="form-label">{translate("Telefon numarası", "Phone number")} <small>{translate("Opsiyonel", "Optional")}</small></span>
          <input id="join-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} placeholder="05xx xxx xx xx" />
        </label>
      </div>
      <label
        className="flex cursor-pointer items-start gap-4 border border-white/10 bg-white/[.035] p-4 transition hover:border-accent/45 hover:bg-white/[.055]"
        htmlFor="join-community-only"
      >
        <input
          id="join-community-only"
          type="checkbox"
          name="community_only"
          value="yes"
          checked={communityOnly}
          onChange={(event) => setCommunityOnly(event.target.checked)}
          className="mt-1 size-5 shrink-0 accent-[#A70C30]"
        />
        <span>
          <strong className="block text-sm font-semibold text-white">
            {translate("Yalnızca topluluğa üye olmak istiyorum", "I only want to join the community")}
          </strong>
          <small className="mt-1 block text-xs leading-5 text-white/45">
            {translate("Takım kadrosuna başvurmadan etkinliklere ve topluluk çalışmalarına katılmak istiyorsanız işaretleyin.", "Select this if you want to join community activities without applying to the team roster.")}
          </small>
        </span>
      </label>

      {!communityOnly && (
        <>
          <label className="form-field-group" htmlFor="join-team">
            <span className="form-label">{translate("İlgilendiğiniz ekip", "Team of interest")} <b aria-hidden="true">*</b></span>
            <select id="join-team" required name="team" className={`${field} team-select`} defaultValue="">
              <option value="" disabled>{translate("Bir ekip seçin", "Choose a team")}</option>
              <option value="mechanical">{translate("Mekanik Ekip", "Mechanical Team")}</option>
              <option value="electronics">{translate("Elektronik Ekip", "Electronics Team")}</option>
              <option value="software">{translate("Yazılım Ekibi", "Software Team")}</option>
              <option value="organization">{translate("Organizasyon Ekibi", "Organization Team")}</option>
            </select>
          </label>
          <label className="form-field-group" htmlFor="join-motivation">
            <span className="form-label">{translate("Başvuru mesajı", "Application message")} <b aria-hidden="true">*</b></span>
            <textarea id="join-motivation" required name="motivation" rows={6} className={field} placeholder={translate("Bizimle ne üretmek veya öğrenmek istersiniz?", "What would you like to build or learn with us?")} />
          </label>
        </>
      )}

      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 text-sm text-burgundy">
          <AlertCircle size={16} />
          {translate("Başvuru gönderilemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin.", "The application could not be sent. Please check your connection and try again.")}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} className="mt-2 w-fit">
        {status === "sending" ? (
          <>
            {translate("Gönderiliyor", "Sending")} <LoaderCircle size={15} className="animate-spin" />
          </>
        ) : (
          <>
            {communityOnly
              ? translate("Üyelik talebini gönder", "Submit membership request")
              : translate("Başvuruyu gönder", "Submit application")} <Send size={15} />
          </>
        )}
      </Button>
    </form>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { translate } = useLanguage();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(web3FormsEndpoint, {
        method: "POST",
        body: new FormData(form),
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) throw new Error("Web3Forms submission failed");

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
        <h3 className="mt-5 font-display text-2xl font-semibold uppercase">{translate("Mesajınız gönderildi.", "Your message has been sent.")}</h3>
        <p className="mt-3 leading-7 text-white/50">{translate("Mesajınızı aldık. En kısa sürede size dönüş yapacağız.", "We have received your message and will get back to you as soon as possible.")}</p>
        <Button type="button" onClick={() => setStatus("idle")} className="mt-6">
          {translate("Yeni mesaj gönder", "Send another message")}
        </Button>
      </div>
    );
  }

  return (
    <form action={web3FormsEndpoint} method="POST" onSubmit={submit} className="grid gap-4">
      <input type="hidden" name="access_key" value={communityAccessKey} />
      <input type="hidden" name="subject" value="MSKU Racing web sitesi iletişim mesajı" />
      <input type="hidden" name="from_name" value="MSKU Racing Website" />
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" autoComplete="name" aria-label={translate("Adınız", "Your name")} className={field} placeholder={translate("Adınız", "Your name")} />
        <input required name="email" type="email" autoComplete="email" aria-label={translate("E-posta adresiniz", "Your email address")} className={field} placeholder={translate("E-posta adresiniz", "Your email address")} />
      </div>
      <input required name="message_subject" aria-label={translate("Konu", "Subject")} className={field} placeholder={translate("Konu", "Subject")} />
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
