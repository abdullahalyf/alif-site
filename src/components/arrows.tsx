import type { ComponentProps } from "react";

type ArrowProps = ComponentProps<"svg">;

export function ArrowUpRight(props: ArrowProps) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false" {...props}><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

export function ArrowLeft(props: ArrowProps) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false" {...props}><path d="M19 12H5m6-6-6 6 6 6" /></svg>;
}

export function ArrowRight(props: ArrowProps) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false" {...props}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}
