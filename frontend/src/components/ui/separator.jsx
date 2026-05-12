import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef(({ className, decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    className={cn("shrink-0 bg-cream", className)}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };
