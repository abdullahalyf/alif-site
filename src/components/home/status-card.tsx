import Image from "next/image";
import { StatusClock } from "./status-clock";
import { site } from "@/content/site";

type StatusCardProps = {
  className?: string;
  /** Marks the card as a floating element that animates in. */
  float?: boolean;
};

/**
 * The floating status card in the hero: who Alif is, whether he is taking
 * work, the local time in Dhaka, what he is building, and his stack.
 *
 * The clock only starts on the client, so the server-rendered markup shows
 * the time as an empty placeholder rather than a stale time.
 */
export function StatusCard({ className, float = false }: StatusCardProps) {
  const { statusCard } = site;
  return (
    <div className={className} data-float={float ? "true" : undefined}>
      <div className="status-card__top">
        <Image
          {...site.avatar}
          width={40}
          height={40}
          sizes="40px"
          alt=""
          className="status-card__avatar"
        />
        <div className="status-card__identity">
          <p className="status-card__name">{site.name}</p>
          <p className="status-card__availability">
            <span className="status-card__dot" aria-hidden="true" />
            {statusCard.availability}
          </p>
        </div>
        <p className="status-card__clock">
          <StatusClock timezone={statusCard.timezone} />
          <span className="status-card__zone">{statusCard.timezoneLabel}</span>
        </p>
      </div>
      <p className="status-card__building">
        <span className="status-card__building-label">{statusCard.buildingLabel}</span>
        <span className="status-card__building-text">{statusCard.building}</span>
      </p>
      <ul className="status-card__stack">
        {statusCard.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
