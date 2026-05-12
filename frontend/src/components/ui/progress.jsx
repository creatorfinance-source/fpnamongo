import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root ref={ref} className={cn("relative h-3 w-full overflow-hidden rounded-full bg-[#F2F0ED]", className)} {...props} value={value}>
    <ProgressPrimitive.Indicator
      className="h-full bg-moss transition-all"
      style={{ transform: `translateX(-${100 - Number(value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = "Progress";

export { Progress };
