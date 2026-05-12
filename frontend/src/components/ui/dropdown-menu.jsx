import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 5, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn("min-w-[220px] rounded-3xl border border-cream bg-white p-2 text-[#1A1A1A] shadow-2xl", className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition duration-150 data-[highlighted]:bg-[#F2F0ED]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("my-1 h-px bg-cream", className)} {...props} />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
const DropdownMenuCheckboxItem = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn("relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm data-[state=checked]:font-semibold data-[highlighted]:bg-[#F2F0ED]", className)}
    {...props}
  />
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
const DropdownMenuItemIndicator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.ItemIndicator ref={ref} className={cn("absolute left-3 inline-flex items-center", className)} {...props} />
));
DropdownMenuItemIndicator.displayName = "DropdownMenuItemIndicator";
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuSubTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex w-full cursor-default select-none items-center justify-between rounded-lg px-3 py-2 text-sm outline-none transition duration-150 data-[highlighted]:bg-[#F2F0ED]",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="h-4 w-4 opacity-70" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn("min-w-[220px] rounded-3xl border border-cream bg-white p-2 shadow-2xl", className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
