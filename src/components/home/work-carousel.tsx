import type { ReactNode } from "react";
import { HorizontalRow } from "@/components/horizontal-row";
import { workContent } from "@/content/site";

export function WorkCarousel({ children }: { children: ReactNode }) {
  return <HorizontalRow className="project-carousel" label={workContent.carouselLabel} as="ul">{children}</HorizontalRow>;
}
