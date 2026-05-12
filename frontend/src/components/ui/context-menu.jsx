import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn("min-w-[180px] rounded-3xl border border-cream bg-white p-2 shadow-2xl", className)}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = "ContextMenuContent";
const ContextMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm text-[#1A1A1A] outline-none transition duration-150 data-[highlighted]:bg-[#F2F0ED]",
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = "ContextMenuItem";
const ContextMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator ref={ref} className={cn("my-1 h-px bg-cream", className)} {...props} />
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator };
