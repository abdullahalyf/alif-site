const paths = {
  architecture: "M9 3h6v5H9zM3 16h6v5H3zm12 0h6v5h-6zM12 8v4m-6 4v-4h12v4",
  operations: "M3 4h18v16H3zm0 5h18m-12 0v11m3-7h6m-6 3h4",
  offline: "M3 8c5-5 13-5 18 0M6 11c3-3 9-3 12 0m-9 3c2-2 4-2 6 0m-3 5h.01M3 3l18 18",
  access: "M6 10h12v11H6zm2 0V7a4 4 0 0 1 8 0v3m-4 4v3",
};

export function ServiceIcon({ name }: { name: keyof typeof paths }) {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d={paths[name]} />
  </svg>;
}
