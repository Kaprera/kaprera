import type { Metadata } from "next";
import { SubpageHeader } from "@/components/layout/SubpageHeader";
import { NotFoundContent } from "@/components/subpage/NotFoundContent";

export const metadata: Metadata = {
  title: "page not found",
};

/** Catches every unmatched URL (and notFound() throws) app-wide. */
export default function NotFound() {
  return (
    <>
      <SubpageHeader />
      <NotFoundContent />
    </>
  );
}
