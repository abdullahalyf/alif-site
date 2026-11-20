import Image from "next/image";
import type { Site } from "@/content/schema";

export function EducationTimeline({ items }: { items: Site["education"] }) {
  return (
    <div className="education-timeline">
      <span className="education-timeline__line" aria-hidden="true">
        <span className="education-timeline__fill" />
      </span>
      {items.map((item) => (
        <article key={item.title}>
          <div className="education-timeline__photo">
            <Image src={item.image.src} width={item.image.width} height={item.image.height} alt={item.image.alt} sizes="(max-width: 768px) 90vw, 18rem" />
          </div>
          <div className="education-timeline__copy">
            <p className="label">{item.years}</p>
            <h3>{item.title}</h3>
            <p>{item.org}</p>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
