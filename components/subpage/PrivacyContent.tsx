"use client";

import { useEffect } from "react";
import { bi, useLang, type Bi } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import { SubpageHero } from "./SubpageHero";

type Block = { kind: "p"; text: Bi } | { kind: "h3"; text: Bi } | { kind: "ul"; items: readonly Bi[] };

const p = (en: string, ar: string): Block => ({ kind: "p", text: bi(en, ar) });
const h3 = (en: string, ar: string): Block => ({ kind: "h3", text: bi(en, ar) });
const ul = (items: readonly Bi[]): Block => ({ kind: "ul", items });

interface PolicySection {
  num: string;
  heading: Bi;
  blocks: readonly Block[];
}

const SECTIONS: readonly PolicySection[] = [
  {
    num: "01",
    heading: bi("Introduction", "مقدمة"),
    blocks: [
      p(
        "kaprera (“we”, “us”, or “our”) is a digital agency based in Beirut, Lebanon, operating the website kaprera.com (the “Service”). We are committed to protecting your privacy and handling your information responsibly.",
        "كابريرا («نحن» أو «لنا») هي وكالة رقمية مقرّها بيروت، لبنان، وتُشغّل موقع kaprera.com («الخدمة»). نلتزم بحماية خصوصيتك والتعامل مع معلوماتك بمسؤولية.",
      ),
      p(
        "By using the Service, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the Service.",
        "باستخدامك للخدمة، فإنك توافق على جمع المعلومات واستخدامها وفقًا لهذه السياسة. إذا كنت لا توافق، يُرجى التوقف عن استخدام الخدمة.",
      ),
    ],
  },
  {
    num: "02",
    heading: bi("Information We Collect", "المعلومات التي نجمعها"),
    blocks: [
      h3("Personal data", "البيانات الشخصية"),
      p(
        "When you contact us or request a service, we may ask you to provide personally identifiable information, such as:",
        "عند تواصلك معنا أو طلبك لخدمة، قد نطلب منك تقديم معلومات تعرّف عنك شخصيًا، مثل:",
      ),
      ul([
        bi("Name", "الاسم"),
        bi("Email address", "عنوان البريد الإلكتروني"),
        bi("Phone number", "رقم الهاتف"),
        bi(
          "Company name and any details you include in a message",
          "اسم الشركة وأي تفاصيل تُضمّنها في رسالتك",
        ),
      ]),
      h3("Usage data", "بيانات الاستخدام"),
      p(
        "We may also collect information that your browser sends whenever you visit the Service, such as your IP address, browser type and version, the pages you visit, the time and date of your visit, and other diagnostic data.",
        "قد نجمع أيضًا معلومات يرسلها متصفّحك عند زيارتك للخدمة، مثل عنوان IP الخاص بك، ونوع المتصفّح وإصداره، والصفحات التي تزورها، ووقت وتاريخ الزيارة، وبيانات تشخيصية أخرى.",
      ),
      h3("Cookies and tracking", "ملفات تعريف الارتباط والتتبّع"),
      p(
        "We use cookies and similar technologies to operate and improve the Service. Cookies are small files stored on your device. You can instruct your browser to refuse cookies, but some parts of the Service may not function properly as a result.",
        "نستخدم ملفات تعريف الارتباط (الكوكيز) وتقنيات مشابهة لتشغيل الخدمة وتحسينها. الكوكيز ملفات صغيرة تُخزَّن على جهازك. يمكنك ضبط متصفّحك لرفض الكوكيز، لكن قد لا تعمل بعض أجزاء الخدمة بشكل صحيح نتيجة لذلك.",
      ),
    ],
  },
  {
    num: "03",
    heading: bi("How We Use Your Information", "كيف نستخدم معلوماتك"),
    blocks: [
      p("We use the information we collect to:", "نستخدم المعلومات التي نجمعها من أجل:"),
      ul([
        bi("Provide, operate, and maintain the Service", "تقديم الخدمة وتشغيلها وصيانتها"),
        bi(
          "Respond to your enquiries and deliver the services you request",
          "الرد على استفساراتك وتقديم الخدمات التي تطلبها",
        ),
        bi(
          "Improve, personalise, and analyse how the Service is used",
          "تحسين الخدمة وتخصيصها وتحليل طريقة استخدامها",
        ),
        bi(
          "Send you administrative or, where permitted, marketing communications",
          "إرسال رسائل إدارية أو تسويقية إليك حيثما يُسمح بذلك",
        ),
        bi(
          "Detect, prevent, and address technical issues or misuse",
          "اكتشاف المشكلات التقنية أو إساءة الاستخدام ومنعها ومعالجتها",
        ),
        bi("Comply with legal obligations", "الامتثال للالتزامات القانونية"),
      ]),
    ],
  },
  {
    num: "04",
    heading: bi("Sharing & Third Parties", "المشاركة والأطراف الثالثة"),
    blocks: [
      p(
        "We do not sell your personal data. We may share information with trusted third-party service providers (for example, hosting, analytics, and email tools) who process it solely on our behalf and only to the extent necessary to perform their tasks. They are obligated not to disclose or use it for any other purpose.",
        "نحن لا نبيع بياناتك الشخصية. قد نشارك المعلومات مع مزوّدي خدمات خارجيين موثوقين (مثل الاستضافة والتحليلات وأدوات البريد الإلكتروني) يعالجونها نيابةً عنا فقط وبالقدر اللازم لأداء مهامهم. وهم ملزمون بعدم الإفصاح عنها أو استخدامها لأي غرض آخر.",
      ),
      p(
        "We may also disclose information where required by law, to enforce our rights, or to protect the safety of our users and the public.",
        "قد نفصح أيضًا عن المعلومات عندما يقتضي القانون ذلك، أو لإنفاذ حقوقنا، أو لحماية سلامة مستخدمينا والعامة.",
      ),
    ],
  },
  {
    num: "05",
    heading: bi("Data Retention", "الاحتفاظ بالبيانات"),
    blocks: [
      p(
        "We retain personal data only for as long as is necessary for the purposes set out in this policy, and to comply with our legal obligations, resolve disputes, and enforce our agreements. Usage data is generally retained for a shorter period, except where it is used to strengthen security or improve the Service, or where we are legally required to retain it longer.",
        "نحتفظ بالبيانات الشخصية فقط للمدة اللازمة للأغراض المبيّنة في هذه السياسة، وللامتثال لالتزاماتنا القانونية وحلّ النزاعات وإنفاذ اتفاقياتنا. يُحتفظ ببيانات الاستخدام عادةً لمدة أقصر، إلا عند استخدامها لتعزيز الأمان أو تحسين الخدمة، أو عندما نكون ملزمين قانونيًا بالاحتفاظ بها لمدة أطول.",
      ),
    ],
  },
  {
    num: "06",
    heading: bi("Data Security", "أمن البيانات"),
    blocks: [
      p(
        "The security of your data is important to us. We use commercially acceptable measures to protect your personal data. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.",
        "أمن بياناتك يهمّنا. نستخدم وسائل مقبولة تجاريًا لحماية بياناتك الشخصية. ومع ذلك، لا توجد وسيلة نقل عبر الإنترنت أو وسيلة تخزين إلكتروني آمنة بنسبة 100%، ولا يمكننا ضمان أمنها المطلق.",
      ),
    ],
  },
  {
    num: "07",
    heading: bi("Your Rights", "حقوقك"),
    blocks: [
      p(
        "Depending on your location, you may have the right to access, correct, update, or request deletion of your personal data, to object to or restrict its processing, and to data portability. Residents of the EU/EEA (under GDPR) and California (under CCPA) may have additional rights.",
        "بحسب موقعك، قد يكون لديك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو تحديثها أو طلب حذفها، والاعتراض على معالجتها أو تقييدها، والحق في نقل البيانات. وقد يتمتّع المقيمون في الاتحاد الأوروبي/المنطقة الاقتصادية الأوروبية (بموجب اللائحة العامة لحماية البيانات GDPR) وفي كاليفورنيا (بموجب قانون CCPA) بحقوق إضافية.",
      ),
      p(
        "To exercise any of these rights, please contact us using the details below.",
        "لممارسة أيٍّ من هذه الحقوق، يُرجى التواصل معنا عبر التفاصيل أدناه.",
      ),
    ],
  },
  {
    num: "08",
    heading: bi("International Transfers", "عمليات النقل الدولية"),
    blocks: [
      p(
        "Your information, including personal data, may be processed and stored on servers located outside your country, where data protection laws may differ. By using the Service, you consent to this transfer where applicable.",
        "قد تُعالَج معلوماتك، بما في ذلك البيانات الشخصية، وتُخزَّن على خوادم موجودة خارج بلدك، حيث قد تختلف قوانين حماية البيانات. باستخدامك للخدمة، فإنك توافق على هذا النقل حيثما ينطبق.",
      ),
    ],
  },
  {
    num: "09",
    heading: bi("Children’s Privacy", "خصوصية الأطفال"),
    blocks: [
      p(
        "The Service is not directed to anyone under the age of 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will take steps to remove it.",
        "الخدمة ليست موجَّهة لأي شخص دون سنّ 16 عامًا. ولا نجمع عمدًا بيانات شخصية من الأطفال. إذا كنت تعتقد أن طفلًا قد زوّدنا ببيانات شخصية، فيُرجى التواصل معنا وسنتّخذ خطوات لإزالتها.",
      ),
    ],
  },
  {
    num: "10",
    heading: bi("Links to Other Sites", "روابط إلى مواقع أخرى"),
    blocks: [
      p(
        "The Service may contain links to websites we do not operate. We are not responsible for the privacy practices or content of those third-party sites and encourage you to review their policies.",
        "قد تحتوي الخدمة على روابط لمواقع لا نُشغّلها. نحن لسنا مسؤولين عن ممارسات الخصوصية أو محتوى تلك المواقع الخارجية، وننصحك بمراجعة سياساتها.",
      ),
    ],
  },
  {
    num: "11",
    heading: bi("Changes to This Policy", "التغييرات على هذه السياسة"),
    blocks: [
      p(
        "We may update this Privacy Policy from time to time. We will post any changes on this page and update the effective date above. We encourage you to review this policy periodically.",
        "قد نحدّث سياسة الخصوصية هذه من حينٍ لآخر. سننشر أي تغييرات على هذه الصفحة ونحدّث تاريخ السريان أعلاه. ونشجّعك على مراجعة هذه السياسة بشكل دوري.",
      ),
    ],
  },
  {
    num: "12",
    heading: bi("Contact Us", "تواصل معنا"),
    blocks: [
      p(
        "If you have any questions about this Privacy Policy or your data, you can reach us at:",
        "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو بياناتك، يمكنك التواصل معنا عبر:",
      ),
    ],
  },
];

export function PrivacyContent() {
  const { t, isAr } = useLang();

  useEffect(() => {
    document.title = isAr ? "سياسة الخصوصية — كابريرا" : "privacy policy — kaprera";
  }, [isAr]);

  return (
    <main className="pt-[78px]">
      <SubpageHero
        eyebrow={bi("legal", "قانوني")}
        title={bi("Privacy Policy", "سياسة الخصوصية")}
        lead={bi(
          "This Privacy Policy explains how kaprera collects, uses, safeguards, and discloses information when you visit kaprera.com or engage our services.",
          "توضّح سياسة الخصوصية هذه كيف تقوم كابريرا بجمع المعلومات واستخدامها وحمايتها والإفصاح عنها عند زيارتك لموقع kaprera.com أو الاستعانة بخدماتنا.",
        )}
        meta={
          <>
            <span>{t(bi("Effective date:", "تاريخ السريان:"))}</span>{" "}
            <b className="font-medium text-ink">{t(bi("28 June 2026", "28 حزيران 2026"))}</b>
          </>
        }
      />

      <div className="py-14 pb-[90px]">
        <div className="wrap">
          <div className="mx-auto max-w-[780px]">
            {SECTIONS.map((section, i) => (
              <section key={section.num} className={i === 0 ? "py-[26px]" : "border-t border-hair py-[26px]"}>
                <h2 className="mb-4 flex items-baseline gap-3 text-[clamp(21px,3vw,26px)] font-bold tracking-[-0.01em]">
                  <span className="keep-mono font-mono text-[15px] font-medium text-blue-text">{section.num}</span>
                  <span>{t(section.heading)}</span>
                </h2>
                {section.blocks.map((block, j) => {
                  if (block.kind === "h3") {
                    return (
                      <h3 key={j} className="mt-[22px] mb-2 text-[17px] font-bold">
                        {t(block.text)}
                      </h3>
                    );
                  }
                  if (block.kind === "ul") {
                    return (
                      <ul key={j} className="mb-4">
                        {block.items.map((item) => (
                          <li
                            key={item.en}
                            className="relative mb-2.5 ps-[22px] leading-[1.7] text-muted before:absolute before:start-0.5 before:top-[11px] before:size-1.5 before:rounded-full before:bg-blue"
                          >
                            {t(item)}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={j} className="mb-3.5 leading-[1.7] text-muted">
                      {t(block.text)}
                    </p>
                  );
                })}
                {section.num === "12" && (
                  <div className="mt-[18px] rounded-(--radius-card) border border-hair bg-soft px-6 py-[22px]">
                    <p className="mb-1.5 leading-[1.7] text-muted">
                      <strong className="font-semibold text-ink">kaprera</strong>
                    </p>
                    <p className="mb-1.5 leading-[1.7] text-muted">
                      <span>{t(bi("Email:", "البريد الإلكتروني:"))}</span>{" "}
                      <a
                        href={`mailto:${CONTACT.email}`}
                        target="_blank"
                        className="font-semibold text-blue-text hover:underline"
                      >
                        {CONTACT.email}
                      </a>
                    </p>
                    <p className="leading-[1.7] text-muted">
                      <span>{t(bi("Location:", "الموقع:"))}</span>{" "}
                      <span>{t(bi("Beirut, Lebanon", "بيروت، لبنان"))}</span>
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
