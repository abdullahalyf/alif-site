"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ImageAsset } from "@/content/schema";
import "@/features/travel/lightbox.css";

export function AchievementPhoto({ photo, title, view, close }: { photo: ImageAsset; title: string; view: string; close: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <a className="text-link" href={photo.src} onClick={(event) => { event.preventDefault(); dialog.current?.showModal(); }} aria-label={`${view}: ${title}`}>{view}</a>
    <dialog ref={dialog} className="trip-lightbox" aria-label={title} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="trip-lightbox-header"><h3>{title}</h3><button type="button" onClick={() => dialog.current?.close()}>{close}</button></div>
      <div className="trip-lightbox-photo"><Image {...photo} alt={photo.alt} sizes="90vw" loading="eager" fetchPriority="low" /></div>
    </dialog>
  </>;
}
