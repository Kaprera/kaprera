"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useAutoplay, usePrefersReducedMotion } from "@/hooks/useAutoplay";
import { bi, useLang, type Bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { CONTACT } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

const AUTO_MS = 5000;
const SWAP_MS = 280;

interface Testimonial {
  name: string;
  role: Bi;
  logo: string;
  logoAlt: string;
  quote: Bi;
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: "Lebanese Spotlight",
    role: bi("NGO", "منظمة غير حكومية"),
    logo: "/cases/lbspotlight/favicon.png",
    logoAlt: "Lebanese Spotlight logo",
    quote: bi(
      "Kaprera built a website that perfectly represents our organization and makes it easy for people to discover and engage with our initiatives, with a smooth, reliable structure that supports our growing community.",
      "بنت kaprera موقعًا يمثّل منظمتنا تمثيلًا مثاليًا ويسهّل على الناس اكتشاف مبادراتنا والتفاعل معها، ببنية سلسة وموثوقة تدعم مجتمعنا المتنامي.",
    ),
  },
  {
    name: "Agri Pro Services",
    role: bi("Agriculture & Pest Control", "الزراعة ومكافحة الآفات"),
    logo: "/cases/agripro/favicon.png",
    logoAlt: "Agri Pro Services logo",
    quote: bi(
      "They built a complex, custom system for our pest control services with exceptional speed and efficiency. The owner uniquely combines high technical competence with strict professional ethics and privacy.",
      "بنوا نظامًا مخصصًا ومعقّدًا لخدمات مكافحة الآفات لدينا بسرعة وكفاءة استثنائية. يجمع المالك بشكل فريد بين كفاءة تقنية عالية والتزام صارم بأخلاقيات المهنة والخصوصية.",
    ),
  },
];

/** Featured quote + clickable client picker (auto-rotates, pauses on hover/focus). */
export function Testimonials() {
  const { t } = useLang();
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);

  const select = useCallback(
    (n: number, animate = true) => {
      const next =
        ((n % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;
      if (!animate || reduce) {
        setIndex(next);
        return;
      }
      setSwapping(true);
      setTimeout(() => {
        setIndex(next);
        setSwapping(false);
      }, SWAP_MS);
    },
    [reduce],
  );

  const autoplay = useAutoplay(AUTO_MS, () => select(index + 1), !reduce);
  const featured = TESTIMONIALS[index];

  return (
    <>
      <div
        className="mt-[30px] grid grid-cols-[1.55fr_1fr] items-stretch gap-6 max-md:grid-cols-1 max-md:gap-4"
        onMouseEnter={autoplay.pause}
        onMouseLeave={autoplay.resume}
        onFocus={autoplay.pause}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            autoplay.resume();
        }}
      >
        <figure className="tst-feature-bg relative isolate flex min-h-[340px] flex-col justify-center gap-[clamp(20px,2.6vw,30px)] overflow-hidden rounded-3xl p-[clamp(34px,4vw,56px)] text-white shadow-[0_40px_90px_-45px_rgba(0,0,0,0.5)] rtl:text-right max-md:min-h-0 max-md:px-[26px] max-md:py-[34px]">
          <span
            aria-hidden
            className="pointer-events-none absolute end-[clamp(26px,4vw,56px)] top-[clamp(-8px,1vw,16px)] -z-[1] font-serif text-[clamp(150px,20vw,280px)] leading-none font-bold text-white/12 select-none max-md:text-[clamp(130px,40vw,240px)]"
          >
            &ldquo;
          </span>
          <div
            className="text-lg tracking-[5px] text-white"
            aria-label="5 out of 5"
          >
            ★★★★★
          </div>
          <blockquote
            className={cn(
              "text-[clamp(20px,2.3vw,31px)] leading-[1.42] font-semibold tracking-[-0.01em] transition-[opacity,translate] duration-350 ease-brand",
              swapping
                ? "translate-y-3 opacity-0"
                : "translate-y-0 opacity-100",
            )}
          >
            {t(featured.quote)}
          </blockquote>
          <figcaption
            className={cn(
              "flex items-center gap-3.5 transition-[opacity,translate] duration-350 ease-brand",
              swapping
                ? "translate-y-3 opacity-0"
                : "translate-y-0 opacity-100",
            )}
          >
            <span className="flex size-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/55 bg-white">
              <Image
                src={featured.logo}
                alt={featured.logoAlt}
                width={50}
                height={50}
                className="size-full rounded-full object-contain p-[5px]"
              />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-base font-bold tracking-[-0.01em]">
                {featured.name}
              </span>
              <span className="text-[13px] text-white/80">
                {t(featured.role)}
              </span>
            </span>
          </figcaption>
        </figure>

        <div
          className="flex flex-col justify-center gap-2.5"
          role="tablist"
          aria-label="clients"
        >
          {TESTIMONIALS.map((testimonial, i) => {
            const active = i === index;
            return (
              <button
                key={testimonial.name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  select(i);
                  autoplay.reset();
                }}
                className={cn(
                  "relative flex w-full cursor-pointer items-center gap-3.5 rounded-2xl border px-[18px] py-4 text-start text-ink transition-[border-color,box-shadow,translate,background-color] duration-300 ease-brand hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
                  // the active card keeps its blue inset ring on hover — a hover
                  // shadow would replace (and visually erase) the ring
                  active
                    ? "border-transparent bg-blue/6 shadow-[inset_0_0_0_1.6px_var(--blue)]"
                    : "border-hair bg-surface hover:shadow-[0_12px_28px_rgba(0,0,0,0.07)]",
                )}
              >
                <span className="flex size-[46px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                  <Image
                    src={testimonial.logo}
                    alt={testimonial.logoAlt}
                    width={46}
                    height={46}
                    className="size-full rounded-full object-contain p-[5px]"
                  />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[15px] font-bold tracking-[-0.01em]">
                    {testimonial.name}
                  </span>
                  <span className="text-[13px] text-muted">
                    {t(testimonial.role)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 text-center max-md:mt-8">
        <p className="text-lg font-semibold tracking-[-0.01em] text-ink">
          {t(
            bi(
              "ready to be our next success story?",
              "مستعد لتكون قصة نجاحنا القادمة؟",
            ),
          )}
        </p>
        <ButtonLink
          href={CONTACT.bookCall}
          target="_blank"
          rel="noopener"
          shine
          withArrow
        >
          {t(bi("book a call", "احجز مكالمة"))}
        </ButtonLink>
      </div>
    </>
  );
}
