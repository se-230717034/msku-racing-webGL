import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold uppercase tracking-[.14em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent px-6 py-3.5 text-white shadow-[0_0_30px_rgba(225,61,88,.22)] hover:-translate-y-0.5 hover:bg-[#ef4964]",
        outline: "border border-white/15 bg-white/[.04] px-6 py-3.5 text-white hover:border-white/30 hover:bg-white/[.08]",
        ghost: "px-4 py-2 text-white/70 hover:bg-white/[.06] hover:text-white"
      },
      size: {
        default: "h-12",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
