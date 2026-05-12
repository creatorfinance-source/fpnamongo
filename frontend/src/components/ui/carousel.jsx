import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

const Carousel = React.forwardRef(({ className, children, ...props }, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ skipSnaps: false });
  React.useImperativeHandle(ref, () => emblaApi, [emblaApi]);

  return (
    <div ref={emblaRef} className={cn("overflow-hidden", className)} {...props}>
      <div className="flex gap-4">{children}</div>
    </div>
  );
});
Carousel.displayName = "Carousel";

export { Carousel };
