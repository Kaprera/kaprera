import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "./icons";

type Variant = "primary" | "ghost" | "inverse" | "inverseGhost";

const base =
  "group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent px-6 py-[13px] text-[15px] font-semibold lowercase transition-[translate,box-shadow,background-color,color,border-color] duration-250 ease-brand hover:-translate-y-0.5 motion-reduce:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-blue-dark hover:shadow-[0_12px_24px_-8px_rgba(0,140,193,0.55)]",
  ghost: "border-hair bg-transparent text-ink hover:border-blue hover:text-blue hover:shadow-[0_10px_22px_-10px_rgba(0,0,0,0.18)]",
  /* for colored hero backgrounds */
  inverse: "bg-white text-[#0a2540] hover:bg-[#eaf7fc]",
  inverseGhost: "border-white/50 bg-transparent text-white hover:border-white hover:bg-white/14",
};

interface CommonProps {
  variant?: Variant;
  /** Sheen sweep for the main conversion CTAs. */
  shine?: boolean;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

function buttonClass({ variant = "primary", shine, className }: CommonProps) {
  return cn(base, variants[variant], shine && "btn-shine", className);
}

/* the arrow nudges forward on hover and points the other way in rtl */
const arrowClass =
  "transition-[translate,scale] duration-300 ease-brand group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1 motion-reduce:group-hover:translate-x-0";

export function ButtonLink({
  withArrow,
  variant,
  shine,
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClass({ variant, shine, className, children })} {...rest}>
      {children}
      {withArrow && <ArrowRightIcon className={arrowClass} />}
    </a>
  );
}

export function Button({
  withArrow,
  variant,
  shine,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClass({ variant, shine, className, children })} {...rest}>
      {children}
      {withArrow && <ArrowRightIcon className={arrowClass} />}
    </button>
  );
}
