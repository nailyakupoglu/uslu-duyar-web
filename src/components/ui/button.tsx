"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-700 text-white hover:bg-primary-900",
        accent: "bg-accent-500 text-ink hover:bg-accent-700 hover:text-white",
        ghost: "bg-transparent text-current hover:bg-white/14",
        outline: "border border-primary-700/25 bg-white/70 text-primary-900 hover:bg-primary-50",
        export: "border border-white/16 bg-white/10 text-white backdrop-blur-xl hover:bg-white/18",
        steel: "bg-port-900 text-white hover:bg-port-700",
        link: "h-auto p-0 text-primary-700 underline-offset-4 hover:underline"
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-5",
        lg: "h-12 px-6",
        xl: "h-14 px-8 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  magnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, magnetic = false, onMouseMove, onMouseLeave, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 220, damping: 18 });
    const springY = useSpring(y, { stiffness: 220, damping: 18 });
    const translateX = useTransform(springX, (value) => value / 7);
    const translateY = useTransform(springY, (value) => value / 7);
    const reduceMotion = useSafeReducedMotion();

    const button = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onMouseMove={(event) => {
          if (magnetic && !reduceMotion) {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set(event.clientX - rect.left - rect.width / 2);
            y.set(event.clientY - rect.top - rect.height / 2);
          }
          onMouseMove?.(event);
        }}
        onMouseLeave={(event) => {
          x.set(0);
          y.set(0);
          onMouseLeave?.(event);
        }}
        {...props}
      />
    );

    if (!magnetic || reduceMotion) {
      return button;
    }

    return (
      <motion.span style={{ x: translateX, y: translateY }} className="inline-flex will-change-transform">
        {button}
      </motion.span>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
