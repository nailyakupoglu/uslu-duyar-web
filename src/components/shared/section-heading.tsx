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
        <p className={cn("spec-mono mb-5 inline-flex items-center gap-3 text-[0.7rem] text-primary-700", align === "center" && "justify-center")}>
          <span className="h-px w-9 bg-accent-500" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="display-tight font-display text-[clamp(2.8rem,5.6vw,5.75rem)] font-medium leading-[0.92] text-ink">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-ink/68 md:text-lg">{description}</p> : null}
    </div>
  );
}
