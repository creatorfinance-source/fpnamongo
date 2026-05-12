import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full overflow-hidden rounded-3xl border border-cream", className)} {...props} />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("bg-[#F7F7F7] p-4", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("divide-y divide-cream", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-4 px-4 py-3", className)} {...props} />
));
TableRow.displayName = "TableRow";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-[#1A1A1A]", className)} {...props} />
));
TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableRow, TableCell };
