import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("overflow-hidden rounded-3xl border border-cream bg-white shadow-sm", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-[#1A1A1A] transition hover:bg-[#F9F8F6]",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 transition-transform duration-150 data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";
const AccordionContent = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className={cn("overflow-hidden text-sm transition-[height] duration-300", className)} {...props} />
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
