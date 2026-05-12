import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

const ToggleGroup = ToggleGroupPrimitive.Root;

const ToggleGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-full border border-cream bg-white px-4 text-sm text-[#1A1A1A] transition duration-150 data-[state=on]:bg-moss data-[state=on]:text-white hover:bg-[#F2F0ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
