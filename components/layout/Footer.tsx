"use client";

import Link from "next/link";
import { bi, useLang, type Bi } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/icons";

const EXPLORE: ReadonlyArray<{ href: string; label: Bi }> = [
  { href: "/#work", label: bi("work", "أعمالنا") },
  { href: "/#services", label: bi("services", "خدماتنا") },
  { href: "/#testimonials", label: bi("testimonials", "آراء العملاء") },
  { href: "/#contact", label: bi("contact", "تواصل") },
  { href: "/careers", label: bi("careers", "وظائف") },
];

const columnHeading = "mb-3.5 font-mono text-[13px] font-normal lowercase text-muted";
const columnLink = "mb-2.5 block text-[15px] lowercase transition-colors duration-200 hover:text-blue";

export function Footer() {
  const { t } = useLang();
  return (
    <footer id="footer" className="border-t border-hair bg-[#f1f2f4] py-14 pb-10 dark:bg-[#0a0d12]">
      <div className="wrap">
        <div className="mb-11 flex flex-wrap justify-between gap-[30px]">
          <div>
            <Link href="/" aria-label="kaprera home">
              <span role="img" aria-label="kaprera" className="brand-logo block h-[30px] aspect-[640/140]" />
            </Link>
            <p className="mt-3 max-w-[320px] text-muted">
              {t(bi("stronger digital presence for startups & scaleups.", "حضور رقمي أقوى للشركات الناشئة والمتنامية."))}
            </p>
          </div>
          <div className="flex flex-wrap gap-16">
            <nav aria-label="explore">
              <h2 className={columnHeading}>{t(bi("explore", "استكشف"))}</h2>
              {EXPLORE.map(({ href, label }) => (
                <Link key={href} href={href} className={columnLink}>
                  {t(label)}
                </Link>
              ))}
            </nav>
            <nav aria-label="legal">
              <h2 className={columnHeading}>{t(bi("legal", "قانوني"))}</h2>
              <Link href="/privacy-policy" className={columnLink}>
                {t(bi("privacy policy", "سياسة الخصوصية"))}
              </Link>
            </nav>
            <nav aria-label="social">
              <h2 className={columnHeading}>{t(bi("social", "تواصل اجتماعي"))}</h2>
              <a href="#" target="_blank" rel="noopener" className={`${columnLink} flex items-center gap-[9px]`}>
                <LinkedInIcon className="shrink-0" />
                <span>{t(bi("linkedin", "لينكدإن"))}</span>
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener"
                className={`${columnLink} flex items-center gap-[9px]`}
              >
                <InstagramIcon className="shrink-0" />
                <span>{t(bi("instagram", "إنستغرام"))}</span>
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener"
                className={`${columnLink} flex items-center gap-[9px]`}
              >
                <WhatsAppIcon className="shrink-0" />
                <span>{t(bi("whatsapp", "واتساب"))}</span>
              </a>
            </nav>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3.5 border-t border-hair pt-6 font-mono text-[13px] text-muted">
          <span>{t(bi("© 2026 kaprera. all rights reserved.", "© 2026 كابريرا. جميع الحقوق محفوظة."))}</span>
          <span>
            {t(bi("made in lebanon ·", "صُنع في لبنان ·"))} <span className="keep-mono text-blue">&gt;_</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
