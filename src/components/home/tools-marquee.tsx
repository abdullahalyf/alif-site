import { toolsMarquee } from "@/content/site";

export function ToolsMarquee() {
  return <section className="tools-marquee tint-a section-space" aria-labelledby="tools-marquee-title">
    <div className="container">
      <h2 id="tools-marquee-title">{toolsMarquee.label}</h2>
      <div className="tools-marquee__area">
        <label className="tools-marquee__pause"><input type="checkbox" /> {toolsMarquee.pause}</label>
        <div className="tools-marquee__window">
          <div className="tools-marquee__track">
            <ul>{toolsMarquee.items.map((tool) => <li key={tool}>{tool}</li>)}</ul>
            <ul aria-hidden="true">{toolsMarquee.items.map((tool) => <li key={tool}>{tool}</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
