import * as React from "react";
import * as CommandPrimitive from "cmdk";
import { cn } from "@/lib/utils";

const Command = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Command ref={ref} className={cn("rounded-3xl border border-cream bg-white shadow-2xl", className)} {...props} />
));
const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  <div className="border-b border-cream px-4 py-3">
    <CommandPrimitive.Input ref={ref} className={cn("w-full bg-transparent text-sm outline-none", className)} {...props} />
  </div>
));
const CommandList = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn("max-h-80 overflow-auto px-2 py-1", className)} {...props} />
));
const CommandItem = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Item ref={ref} className={cn("cursor-pointer rounded-lg px-3 py-2 text-sm text-[#1A1A1A] hover:bg-[#F2F0ED]", className)} {...props} />
));
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Group ref={ref} className={cn("px-2 py-1", className)} {...props} />
));
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("my-2 h-px bg-cream", className)} {...props} />
));

Command.displayName = "Command";
CommandInput.displayName = "CommandInput";
CommandList.displayName = "CommandList";
CommandItem.displayName = "CommandItem";
CommandGroup.displayName = "CommandGroup";
CommandSeparator.displayName = "CommandSeparator";

export { Command, CommandInput, CommandList, CommandItem, CommandGroup, CommandSeparator };
