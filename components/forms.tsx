"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const field = "w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-accent/70 focus:bg-white/[.06]";

export function JoinForm() {
  const [sent,setSent] = useState(false);
  function submit(e:FormEvent){ e.preventDefault(); setSent(true); }
  if(sent) return <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8"><CheckCircle2 className="text-accent" size={32}/><h3 className="mt-5 font-display text-2xl font-semibold uppercase">Application received.</h3><p className="mt-3 leading-7 text-white/50">Thanks for stepping forward. The team will get back to you after reviewing your interests.</p></div>;
  return <form onSubmit={submit} className="grid gap-4">
    <div className="grid gap-4 sm:grid-cols-2"><input required className={field} placeholder="Full name" /><input required type="email" className={field} placeholder="University email" /></div>
    <div className="grid gap-4 sm:grid-cols-2"><input required className={field} placeholder="Department" /><select required className={field} defaultValue=""><option value="" disabled>Preferred sub-team</option><option>Vehicle Dynamics</option><option>Powertrain</option><option>Aerodynamics</option><option>Chassis & Composites</option><option>Electronics</option><option>Business & Media</option></select></div>
    <textarea required rows={6} className={field} placeholder="What would you like to build or learn with us?" />
    <Button type="submit" className="mt-2 w-fit">Send application <Send size={15}/></Button>
  </form>
}

export function ContactForm() {
  const [sent,setSent] = useState(false);
  function submit(e:FormEvent){ e.preventDefault(); setSent(true); }
  if(sent) return <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8"><CheckCircle2 className="text-accent" size={32}/><h3 className="mt-5 font-display text-2xl font-semibold uppercase">Message sent.</h3><p className="mt-3 leading-7 text-white/50">We have your note and will respond as soon as possible.</p></div>;
  return <form onSubmit={submit} className="grid gap-4">
    <div className="grid gap-4 sm:grid-cols-2"><input required className={field} placeholder="Your name" /><input required type="email" className={field} placeholder="Email address" /></div>
    <input required className={field} placeholder="Subject" />
    <textarea required rows={7} className={field} placeholder="Tell us how we can help..." />
    <Button type="submit" className="w-fit">Send message <Send size={15}/></Button>
  </form>
}
