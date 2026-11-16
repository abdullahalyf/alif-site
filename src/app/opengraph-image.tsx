import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const photo = await readFile(join(process.cwd(), "public", site.heroPhoto.src), "base64");

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {/* ImageResponse requires a native image to render into the generated PNG. */}
      <img src={`data:image/jpeg;base64,${photo}`} alt={site.heroPhoto.alt} width={size.width} height={size.height} style={{ objectFit: "cover" }} />
    </div>, size,
  );
}
