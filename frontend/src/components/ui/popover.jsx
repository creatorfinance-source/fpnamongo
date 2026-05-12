import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn("z-50 w-auto rounded-3xl border border-cream bg-white p-4 text-sm shadow-2xl", className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";
const PopoverArrow = React.forwardRef(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow ref={ref} className={cn("fill-white", className)} {...props} />
));
PopoverArrow.displayName = "PopoverArrow";

export { Popover, PopoverTrigger, PopoverContent, PopoverArrow };
