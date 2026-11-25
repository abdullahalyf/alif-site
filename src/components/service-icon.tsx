const paths = {
  architecture: "M9 3h6v5H9zM3 16h6v5H3zm12 0h6v5h-6zM12 8v4m-6 4v-4h12v4",
  operations: "M3 4h18v16H3zm0 5h18m-12 0v11m3-7h6m-6 3h4",
  offline: "M3 8c5-5 13-5 18 0M6 11c3-3 9-3 12 0m-9 3c2-2 4-2 6 0m-3 5h.01M3 3l18 18",
  access: "M6 10h12v11H6zm2 0V7a4 4 0 0 1 8 0v3m-4 4v3",
  custom: "m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16",
  pos: "M5 3h14v18H5zm3 3h8v4H8zm0 7h2m4 0h2m-8 3h2m4 0h2",
  backoffice: "M3 8l9-5 9 5v12H3zm5 12v-7h8v7M8 9h8",
  business: "M3 5h18v14H3zm0 4h18M6 7h.01M9 7h.01M7 13h6m-6 3h10",
  landing: "M5 3h14v18H5zm3 4h8m-8 3h8m-8 4h4m-4 4h8",
  portfolio: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 9a8 8 0 0 1 16 0",
  ecommerce: "M3 4h3l2.5 11h9L20 7H7M10 20h.01M17 20h.01",
  dashboard: "M3 3h8v8H3zm10 0h8v5h-8zm0 7h8v11h-8zM3 13h8v8H3z",
  mobile: "M7 2h10v20H7zm4 17h2",
};

export function ServiceIcon({ name }: { name: keyof typeof paths }) {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d={paths[name]} />
  </svg>;
}
