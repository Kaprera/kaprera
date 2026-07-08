"use client";

import { useEffect } from "react";
import { bi, useLang } from "@/lib/i18n";
import { ArrowRightIcon } from "@/components/ui/icons";
import { CONTACT } from "@/lib/site";
import { SubpageHero } from "./SubpageHero";

const APPLY_HREF = `mailto:${CONTACT.email}?subject=Application%20%E2%80%94%20Business%20Development%20Manager`;
const LOCATION = bi("Beirut, Lebanon · remote-friendly", "بيروت، لبنان · عمل عن بُعد");

export function CareersContent() {
  const { t, isAr } = useLang();

  useEffect(() => {
    document.title = isAr ? "وظائف — كابريرا" : "careers — kaprera";
  }, [isAr]);

  return (
    <main className="pt-[78px]">
      <SubpageHero
        eyebrow={bi("careers", "وظائف")}
        title={bi("Join kaprera", "انضم إلى كابريرا")}
        lead={bi(
          "We're a small digital agency in Beirut building brands, websites, and SEO for startups and scaleups. One role is open right now.",
          "نحن وكالة رقمية صغيرة في بيروت نبني الهويات والمواقع ونحسّن الظهور في نتائج البحث للشركات الناشئة والمتنامية. لدينا وظيفة واحدة متاحة حاليًا.",
        )}
        meta={t(LOCATION)}
      />

      <div className="py-14 pb-[90px]">
        <div className="wrap">
          <div className="mx-auto max-w-[780px]">
            <section className="py-[26px]">
              <h2 className="mb-4 text-[clamp(21px,3vw,26px)] font-bold tracking-[-0.01em]">
                {t(bi("Open Role", "الوظيفة المتاحة"))}
              </h2>
              <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                <div className="group flex flex-col gap-2.5 rounded-(--radius-card) border border-hair bg-soft p-6 transition-[translate,border-color,box-shadow] duration-250 ease-brand hover:-translate-y-[3px] hover:border-blue hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] motion-reduce:hover:translate-y-0">
                  <span className="font-mono text-xs lowercase text-blue-text">
                    {t(bi("commission-based", "بنظام العمولة"))}
                  </span>
                  <h3 className="text-lg font-bold">{t(bi("Business Development Manager", "مدير تطوير الأعمال"))}</h3>
                  <p className="flex-1 text-[15px] leading-[1.6] text-muted">
                    {t(
                      bi(
                        "Bring in new clients for our web design, development, and SEO services. You own the pipeline from first contact to signed deal, and earn a commission on every project you close. Remote-friendly.",
                        "تجلب عملاء جدداً لخدماتنا في تصميم وتطوير المواقع وتحسين محركات البحث. تدير العلاقة من أول تواصل حتى توقيع الاتفاق، وتحصل على عمولة عن كل مشروع تُغلقه. العمل عن بُعد ممكن.",
                      ),
                    )}
                  </p>
                  <a
                    href={APPLY_HREF}
                    target="_blank"
                    className="mt-1 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue-text hover:underline"
                  >
                    <span>{t(bi("apply", "قدّم طلبك"))}</span>
                    <ArrowRightIcon size={15} className="rtl:-scale-x-100" />
                  </a>
                </div>
              </div>
            </section>

            <section className="border-t border-hair py-[26px]">
              <h2 className="mb-4 text-[clamp(21px,3vw,26px)] font-bold tracking-[-0.01em]">
                {t(bi("How to Apply", "كيف تقدّم طلبك"))}
              </h2>
              <p className="mb-3.5 leading-[1.7] text-muted">
                {t(
                  bi(
                    "Send a few lines about yourself and your sales or business development experience.",
                    "أرسل بضعة أسطر عن نفسك وعن خبرتك في المبيعات أو تطوير الأعمال. لا حاجة لسيرة ذاتية رسمية.",
                  ),
                )}
              </p>
              <div className="mt-[18px] rounded-(--radius-card) border border-hair bg-soft px-6 py-[22px]">
                <p className="mb-1.5 leading-[1.7] text-muted">
                  <span>{t(bi("Email:", "البريد الإلكتروني:"))}</span>{" "}
                  <a href={APPLY_HREF} target="_blank" className="font-semibold text-blue-text hover:underline">
                    {CONTACT.email}
                  </a>
                </p>
                <p className="leading-[1.7] text-muted">
                  <span>{t(bi("Location:", "الموقع:"))}</span> <span>{t(LOCATION)}</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
