import * as React from "react";
import { cn } from "@/lib/utils";

const Form = React.forwardRef(({ className, ...props }, ref) => (
  <form ref={ref} className={cn("space-y-6", className)} {...props} />
));
const FormField = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
const FormItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
));
const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium text-[#1A1A1A]", className)} {...props} />
));
const FormControl = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex w-full", className)} {...props} />
));
const FormDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-[#5C5C5C]", className)} {...props} />
));
const FormMessage = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm font-medium text-[#A82022]", className)} {...props} />
));

Form.displayName = "Form";
FormField.displayName = "FormField";
FormItem.displayName = "FormItem";
FormLabel.displayName = "FormLabel";
FormControl.displayName = "FormControl";
FormDescription.displayName = "FormDescription";
FormMessage.displayName = "FormMessage";

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage };
