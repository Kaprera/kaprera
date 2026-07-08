import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { Contact } from "@/components/sections/Contact";
import { Industries } from "@/components/sections/Industries";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ServicesSlider } from "@/components/sections/ServicesSlider";
import { Testimonials } from "@/components/sections/Testimonials";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { bi } from "@/lib/bi";
import { SITE_URL } from "@/lib/site";
import { professionalServiceSchema, webSiteSchema, workItemListSchema } from "@/lib/structured-data";

const TITLE = "kaprera — digital agency in Beirut | web design, development & SEO";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description:
      "We design websites and brands, build fast high-performance sites, and grow organic visibility with SEO — turning audiences into customers.",
    url: SITE_URL,
  },
  twitter: {
    title: "kaprera — digital agency in Beirut",
    description: "We design websites and brands, build fast sites, and grow organic visibility with SEO.",
  },
};

const jsonLd = [professionalServiceSchema, webSiteSchema, workItemListSchema];

export default function HomePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Preloader />
      <Navbar />
      <main id="top">
        <WorkShowcase />

        <section
          id="services"
          className="section-tint-start relative scroll-mt-16 overflow-hidden border-t border-hair py-[110px] max-md:py-20"
        >
          {/* slow drifting colour blob for life */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-[130px] -start-[110px] size-[460px] animate-[blob-drift-a_18s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(0,140,193,0.12),transparent_70%)] opacity-35 blur-[90px]"
          />
          <div className="wrap relative z-[1]">
            <SectionIntro
              num="02"
              label={bi("/ what we do", "/ ماذا نقدّم")}
              title={bi("services built to convert.", "خدمات مصمّمة لتحقيق النتائج.")}
              lede={bi(
                "three core disciplines, one outcome — digital products that look sharp, perform, and get found.",
                "ثلاثة تخصصات أساسية ونتيجة واحدة — منتجات رقمية أنيقة وسريعة وسهلة الظهور.",
              )}
            />
            <Reveal>
              <ServicesSlider />
            </Reveal>
          </div>
        </section>

        <section
          id="testimonials"
          className="section-tint-end relative scroll-mt-16 overflow-hidden border-t border-hair py-[110px] max-md:py-20"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-[150px] -end-[130px] size-[460px] animate-[blob-drift-b_21s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(70,196,236,0.11),transparent_70%)] opacity-35 blur-[90px]"
          />
          <div className="wrap relative z-[1]">
            <SectionIntro
              num="03"
              label={bi("/ what clients say", "/ ماذا يقول عملاؤنا")}
              title={bi("trusted by teams across lebanon.", "موثوق به من فرق في جميع أنحاء لبنان.")}
            />
            <Reveal>
              <Industries />
            </Reveal>
            <Reveal>
              <Testimonials />
            </Reveal>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 border-t border-hair py-[110px] max-md:py-20">
          <div className="wrap">
            <SectionIntro
              num="04"
              label={bi("/ let's build something", "/ لنبنِ شيئًا معًا")}
              title={bi("tell us about your project.", "أخبرنا عن مشروعك.")}
            />
            <Reveal>
              <Contact />
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
