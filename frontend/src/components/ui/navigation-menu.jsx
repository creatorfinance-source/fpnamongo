import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

const NavigationMenu = NavigationMenuPrimitive.Root;
const NavigationMenuList = NavigationMenuPrimitive.List;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn("inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-[#1A1A1A] transition hover:bg-[#F2F0ED]", className)}
    {...props}
  />
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Portal>
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn("mt-2 rounded-3xl border border-cream bg-white p-4 shadow-2xl", className)}
      {...props}
    />
  </NavigationMenuPrimitive.Portal>
));
NavigationMenuContent.displayName = "NavigationMenuContent";
const NavigationMenuLink = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn("block rounded-xl px-3 py-2 text-sm text-[#1A1A1A] hover:bg-[#F2F0ED]", className)}
    {...props}
  />
));
NavigationMenuLink.displayName = "NavigationMenuLink";
export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink };
