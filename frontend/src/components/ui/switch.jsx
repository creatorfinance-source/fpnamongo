import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-cream bg-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none block h-5 w-5 translate-x-0 rounded-full bg-[#F2F0ED] shadow transition duration-150 data-[state=checked]:translate-x-5 data-[state=checked]:bg-moss" />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";

export { Switch };
