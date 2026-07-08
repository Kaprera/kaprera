"use client";

import type { FormEvent, ReactNode } from "react";
import { bi, useLang, type Bi } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { CalendarIcon, MailIcon, MapPinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { CONTACT } from "@/lib/site";

const inputClass =
  "w-full rounded-[11px] border border-hair bg-soft px-4 py-3.5 text-[15px] text-ink transition-[border-color,background-color] duration-200 focus-visible:border-2 focus-visible:border-blue focus-visible:bg-surface focus-visible:px-[15px] focus-visible:py-[13px] focus-visible:outline-none";
const labelClass = "mb-[9px] block font-mono text-[13px] text-muted";
const cardClass =
  "rounded-[18px] border border-hair bg-surface p-[clamp(26px,3vw,38px)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow] duration-350 ease-brand hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]";

function composeMailto(name: string, email: string, message: string): string {
  const subject = encodeURIComponent(`New project enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}

/** Contact form (composes a mailto — no backend) beside the direct-contact panel. */
export function Contact() {
  const { t } = useLang();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    window.location.href = composeMailto(name, email, message);
  };

  return (
    <div className="mt-2 grid grid-cols-[1.45fr_1fr] items-stretch gap-7 max-md:grid-cols-1 max-md:gap-5">
      <form onSubmit={onSubmit} className={cardClass}>
        <div className="grid grid-cols-2 gap-[18px] max-md:grid-cols-1 max-md:gap-0">
          <div className="mb-[18px]">
            <label htmlFor="contact-name" className={labelClass}>
              {t(bi("full name", "الاسم الكامل"))}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={t(bi("your name", "اسمك"))}
              className={inputClass}
            />
          </div>
          <div className="mb-[18px]">
            <label htmlFor="contact-email" className={labelClass}>
              {t(bi("email", "البريد الإلكتروني"))}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={inputClass}
            />
          </div>
        </div>
        <div className="mb-[18px]">
          <label htmlFor="contact-message" className={labelClass}>
            {t(bi("message", "الرسالة"))}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            placeholder={t(bi("what are you building?", "ما الذي تبنيه؟"))}
            className={`${inputClass} min-h-[130px] resize-y`}
          />
        </div>
        <Button type="submit" shine withArrow className="mt-1.5">
          {t(bi("send", "إرسال"))}
        </Button>
      </form>

      <aside
        className={`${cardClass} flex flex-col justify-between gap-1 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(0,140,193,0.05),transparent_55%)]`}
      >
        <ContactItem icon={<CalendarIcon />} label={bi("book a call", "احجز مكالمة")} first>
          <a
            className="text-lg font-semibold transition-colors duration-200 hover:text-blue"
            href={CONTACT.bookCall}
            target="_blank"
            rel="noopener"
          >
            {t(bi("schedule a meeting →", "حدّد موعدًا ←"))}
          </a>
        </ContactItem>
        <ContactItem icon={<MailIcon />} label={bi("email", "البريد الإلكتروني")}>
          <a
            className="text-lg font-semibold transition-colors duration-200 hover:text-blue"
            href={`mailto:${CONTACT.email}`}
          >
            {CONTACT.email}
          </a>
        </ContactItem>
        <ContactItem icon={<WhatsAppIcon size={15} />} label={bi("whatsapp", "واتساب")}>
          <a
            className="text-lg font-semibold transition-colors duration-200 hover:text-blue"
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener"
          >
            {t(bi("chat with us →", "تحدّث معنا ←"))}
          </a>
        </ContactItem>
        <ContactItem icon={<MapPinIcon />} label={bi("location", "الموقع")}>
          <div className="text-lg font-semibold">{t(bi("Beirut, Lebanon", "بيروت، لبنان"))}</div>
        </ContactItem>
      </aside>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  first,
  children,
}: {
  icon: ReactNode;
  label: Bi;
  first?: boolean;
  children: ReactNode;
}) {
  const { t } = useLang();
  return (
    <div className={first ? "pt-0.5 pb-4" : "border-t border-hair py-4 last:pb-0.5"}>
      <div className="mb-1.5 flex items-center gap-2 font-mono text-[13px] text-muted [&_svg]:shrink-0 [&_svg]:opacity-80">
        {icon}
        <span>{t(label)}</span>
      </div>
      {children}
    </div>
  );
}
