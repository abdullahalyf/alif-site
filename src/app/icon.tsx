import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const face = await readFile(join(process.cwd(), "public", "images", "alif-avatar.jpg"));

/** The favicon: Alif's face, cropped tight and cut to a circle. */
export default function Icon() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
      {/* ImageResponse needs a native image to draw into the generated PNG. */}
      <img src={`data:image/jpeg;base64,${face.toString("base64")}`} alt={site.avatar.alt} width={96} height={96}
        style={{ width: 64, height: 64, borderRadius: 9999, objectFit: "cover", objectPosition: "50% 38%" }} />
    </div>,
    size,
  );
}
