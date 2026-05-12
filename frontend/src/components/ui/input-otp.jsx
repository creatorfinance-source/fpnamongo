import * as React from "react";
import InputOtpLib from "input-otp";
import { cn } from "@/lib/utils";

const InputOtp = React.forwardRef(({ className, ...props }, ref) => (
  <InputOtpLib
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-md border border-cream bg-white px-3 py-2 text-sm text-[#1A1A1A] shadow-sm transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
InputOtp.displayName = "InputOtp";

export { InputOtp };
