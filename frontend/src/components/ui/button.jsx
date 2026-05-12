import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-moss text-white hover:bg-[#3D5247]",
        secondary: "bg-[#F2F0ED] text-[#1A1A1A] hover:bg-[#E6E2D7]",
        outline: "border border-cream bg-white text-[#1A1A1A] hover:bg-[#F9F8F6]",
        ghost: "bg-transparent text-[#1A1A1A] hover:bg-[#F9F8F6]",
        destructive: "bg-destructive text-white hover:bg-[#9F1D22]",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
