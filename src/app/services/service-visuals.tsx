import { serviceHero } from "@/content/services";

const iconPaths = {
  shop: "M3 10h18l-2-6H5zm2 0v10h14V10m-9 10v-6h4v6M8 4l-1 6m9-6 1 6",
  system: "m3 8 9-5 9 5-9 5zm0 4 9 5 9-5M3 16l9 5 9-5",
  chart: "M3 19h18M6 15v-4m6 4V5m6 10V8",
  checklist: "M8 4H5v16h14V4h-3M8 3h8v4H8zm0 11 2 2 5-5",
  chat: "M4 4h16v12h-9l-5 4v-4H4zm4 5h8m-8 3h5",
  map: "m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zm6-3v15m6-12v15",
  flag: "M5 22V3m0 1c5-5 9 4 15 0v10c-6 4-10-5-15 0",
  launch: "M8 16 4 17l1-5 8-8 6-1-1 6-8 8-2-1zm3-3 2 2m-7 4-2 2m10-13h.01",
  check: "m5 12 4 4L19 6",
  minus: "M6 12h12",
  sync: "M20 8a8 8 0 0 0-13-3L3 9m0-5v5h5m-4 7a8 8 0 0 0 13 3l4-4m0 5v-5h-5",
  queue: "M5 5h14v14H5zm3 4h8m-8 3h8m-8 3h5",
  arrow: "M4 12h15m-6-6 6 6-6 6",
};

export function ServiceGlyph({ name }: { name: keyof typeof iconPaths }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  );
}

export function ServiceHeroVisual() {
  const icons = ["shop", "system", "chart"] as const;
  return (
    <div className="service-hero-visual" aria-hidden="true">
      <div className="service-flow">
        {serviceHero.map((label, index) => (
          <div className="service-flow__node" key={label}>
            <span><ServiceGlyph name={icons[index]} /></span>
            <strong>{label}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
