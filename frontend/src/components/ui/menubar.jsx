import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@/lib/utils";

const Menubar = MenubarPrimitive.Root;
const MenubarMenu = MenubarPrimitive.Menu;
const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn("rounded-md px-3 py-2 text-sm font-medium text-[#1A1A1A] transition hover:bg-[#F2F0ED]", className)}
    {...props}
  />
));
MenubarTrigger.displayName = "MenubarTrigger";
const MenubarContent = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      className={cn("rounded-3xl border border-cream bg-white p-2 shadow-2xl", className)}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = "MenubarContent";
const MenubarItem = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn("flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm text-[#1A1A1A] outline-none transition duration-150 data-[highlighted]:bg-[#F2F0ED]", className)}
    {...props}
  />
));
MenubarItem.displayName = "MenubarItem";

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem };
