import type { Metadata } from "next";
import { MaintenanceContent } from "@/components/subpage/MaintenanceContent";

export const metadata: Metadata = {
  title: "be right back",
  description: "kaprera is down for maintenance — we saw one misaligned pixel and couldn't let it go.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return <MaintenanceContent />;
}
