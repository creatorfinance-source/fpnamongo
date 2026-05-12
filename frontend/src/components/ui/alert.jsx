import * as React from "react";
import { cn } from "@/lib/utils";

const Alert = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variantClass = {
    default: "bg-[#F2F0ED] text-[#1A1A1A]",
    destructive: "bg-[#FBE6E7] text-[#A82022]",
    success: "bg-[#EAF7EF] text-[#1B5B34]",
    warning: "bg-[#FFF4E5] text-[#7A5A18]",
  }[variant];

  return <div ref={ref} className={cn("rounded-3xl border border-cream p-4 text-sm", variantClass, className)} {...props} />;
});
Alert.displayName = "Alert";

export { Alert };
