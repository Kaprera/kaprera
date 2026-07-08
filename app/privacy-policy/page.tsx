import type { Metadata } from "next";
import { SubpageHeader } from "@/components/layout/SubpageHeader";
import { PrivacyContent } from "@/components/subpage/PrivacyContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "privacy policy",
  description:
    "How kaprera, a digital agency in Beirut, Lebanon, collects, uses, safeguards, and discloses information when you use kaprera.com.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "privacy policy — kaprera",
    description: "How kaprera collects, uses, safeguards, and discloses information when you use kaprera.com.",
    url: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SubpageHeader />
      <PrivacyContent />
    </>
  );
}
