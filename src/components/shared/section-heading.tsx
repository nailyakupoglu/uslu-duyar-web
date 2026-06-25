import { Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary-700", align === "center" && "justify-center")}>
          <Leaf className="h-4 w-4 text-accent-700" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl font-semibold leading-tight text-ink text-balance md:text-6xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-ink/68 md:text-lg">{description}</p> : null}
    </div>
  );
}
