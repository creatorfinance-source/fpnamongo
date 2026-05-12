import * as React from "react";
import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn("text-sm text-[#5C5C5C]", className)} aria-label="Breadcrumb" {...props} />
));
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("flex items-center space-x-2", className)} {...props} />
));
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
));
const BreadcrumbLink = React.forwardRef(({ className, ...props }, ref) => (
  <a ref={ref} className={cn("text-[#5C5C5C] transition hover:text-[#1A1A1A]", className)} {...props} />
));
Breadcrumb.displayName = "Breadcrumb";
BreadcrumbList.displayName = "BreadcrumbList";
BreadcrumbItem.displayName = "BreadcrumbItem";
BreadcrumbLink.displayName = "BreadcrumbLink";

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink };
