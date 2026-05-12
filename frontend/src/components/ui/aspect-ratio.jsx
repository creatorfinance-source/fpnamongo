import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";

const AspectRatio = React.forwardRef(({ className, ratio = 16 / 9, ...props }, ref) => (
  <AspectRatioPrimitive.Root ref={ref} ratio={ratio} className={cn("relative w-full overflow-hidden rounded-3xl", className)} {...props} />
));
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
