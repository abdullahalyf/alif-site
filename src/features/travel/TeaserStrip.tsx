import type { ReactNode } from "react";
import { HorizontalRow } from "@/components/horizontal-row";

export function TeaserStrip({ title, progressLabel, children }: { title: string; progressLabel: string; children: ReactNode }) {
  return <HorizontalRow className="travel-teaser-strip" label={title} progressLabel={progressLabel}>{children}</HorizontalRow>;
}
