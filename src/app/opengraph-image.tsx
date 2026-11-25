import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const face = await readFile(join(process.cwd(), "public", "images", "alif-about.jpg"));
const serif = Uint8Array.from(await readFile(join(process.cwd(), "src/fonts/instrument-serif-share.ttf"))).buffer;
const sans = Uint8Array.from(await readFile(join(process.cwd(), "src/fonts/inter-share.ttf"))).buffer;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#1E1C19", color: "#F2EDE3" }}>
      {/* ImageResponse needs a native image to draw into the generated PNG. */}
      <img src={`data:image/jpeg;base64,${face.toString("base64")}`} alt={site.avatar.alt} width={515} height={630} style={{ width: 515, height: 630, objectFit: "cover", objectPosition: "50% 15%" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", flex: 1 }}>
        <div style={{ fontFamily: "Instrument Serif", fontSize: 96, lineHeight: 1.02, letterSpacing: -2 }}>{site.name}</div>
        <div style={{ fontFamily: "Inter", fontSize: 32, lineHeight: 1.3, marginTop: 28, color: "#A8CC9F" }}>{site.role}</div>
        <div style={{ fontFamily: "Inter", fontSize: 26, marginTop: 40, color: "#B9B3A8" }}>{site.location}</div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, weight: 400 }, { name: "Inter", data: sans, weight: 400 }] },
  );
}
