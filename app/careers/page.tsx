import type { Metadata } from "next";
import { SubpageHeader } from "@/components/layout/SubpageHeader";
import { CareersContent } from "@/components/subpage/CareersContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "careers",
  description:
    "Careers at kaprera — we're hiring a commission-based Business Development Manager. Digital agency in Beirut, Lebanon. Remote-friendly.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "careers — kaprera",
    description:
      "We're hiring a commission-based Business Development Manager. Digital agency in Beirut, Lebanon. Remote-friendly.",
    url: `${SITE_URL}/careers`,
  },
};

export default function CareersPage() {
  return (
    <>
      <SubpageHeader />
      <CareersContent />
    </>
  );
}
