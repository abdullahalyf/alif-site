import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

const serif = Uint8Array.from(await readFile(join(process.cwd(), "src/fonts/instrument-serif-share.ttf"))).buffer;
const sans = Uint8Array.from(await readFile(join(process.cwd(), "src/fonts/inter-share.ttf"))).buffer;
export const shareImageSize = { width: 1200, height: 630 };

export function shareImage(title: string, detail: string) {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 72px", background: "#F2EDE3", color: "#1E1C19", fontFamily: "Inter" }}>
      <div style={{ display: "flex", fontSize: 24, color: "#6A645A" }}>{detail}</div>
      <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 78, lineHeight: 1.05, letterSpacing: "-0.025em" }}>{title}</div>
      <div style={{ display: "flex", borderTop: "1px solid #D6CEBF", paddingTop: 24, fontSize: 24 }}>{site.name}</div>
    </div>,
    { ...shareImageSize, fonts: [{ name: "Instrument Serif", data: serif, weight: 400 }, { name: "Inter", data: sans, weight: 400 }] },
  );
}
