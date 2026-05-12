import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import "react-day-picker/dist/style.css";

const Calendar = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-3xl border border-cream bg-white p-4 shadow-sm", className)}>
    <DayPicker {...props} />
  </div>
));
Calendar.displayName = "Calendar";

export { Calendar };
