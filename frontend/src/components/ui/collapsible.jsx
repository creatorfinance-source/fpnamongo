import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger ref={ref} className={cn("inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition hover:bg-[#F2F0ED]", className)} {...props} />
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";
const CollapsibleContent = React.forwardRef(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Content ref={ref} className={cn("overflow-hidden text-sm", className)} {...props} />
));
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
