import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = RadioGroupPrimitive.Root;
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "peer relative flex h-5 w-5 items-center justify-center rounded-full border border-cream bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-moss focus:ring-offset-2",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="h-2.5 w-2.5 rounded-full bg-moss" />
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
