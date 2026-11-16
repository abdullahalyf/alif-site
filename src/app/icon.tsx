import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const serif = Uint8Array.from(await readFile(join(process.cwd(), "src/fonts/instrument-serif-share.ttf"))).buffer;

/** The favicon: the brand monogram in a circle, matching the header brand mark. */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#F2EDE3",
        color: "#1E1C19",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 52,
          height: 52,
          border: "2px solid #1E1C19",
          borderRadius: 9999,
          fontFamily: "Instrument Serif",
          fontSize: 34,
          lineHeight: 1,
        }}
      >
        {site.logoInitial}
      </div>
    </div>,
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, weight: 400 }] },
  );
}
