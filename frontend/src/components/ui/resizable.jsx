import * as React from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { cn } from "@/lib/utils";

const ResizableGroup = React.forwardRef(({ className, ...props }, ref) => (
  <PanelGroup ref={ref} className={cn("flex h-full w-full", className)} {...props} />
));
ResizableGroup.displayName = "ResizableGroup";
const ResizablePanel = React.forwardRef(({ className, ...props }, ref) => (
  <Panel ref={ref} className={cn("min-h-0 overflow-auto", className)} {...props} />
));
ResizablePanel.displayName = "ResizablePanel";

export { ResizableGroup as PanelGroup, ResizablePanel as Panel };
