import { seo } from "@/content/site";

type SiteEnvironment = Partial<Pick<NodeJS.ProcessEnv, "NEXT_PUBLIC_SITE_URL" | "VERCEL_PROJECT_PRODUCTION_URL">>;

export function getBaseUrl(environment: SiteEnvironment = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
}): URL {
  const value = environment.NEXT_PUBLIC_SITE_URL?.trim() || environment.VERCEL_PROJECT_PRODUCTION_URL?.trim() || seo.fallbackUrl;
  const url = new URL(value.includes("://") ? value : `https://${value}`);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Site URL must use HTTP or HTTPS");
  return new URL(url.origin);
}
