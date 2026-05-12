import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-[#F2F0ED] text-moss",
    secondary: "bg-[#E5E5E5] text-[#1A1A1A]",
    destructive: "bg-[#FBE6E7] text-[#A82022]",
  };
  return (
    <span ref={ref} className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", variantClasses[variant] || variantClasses.default, className)} {...props} />
  );
});
Badge.displayName = "Badge";

export { Badge };
