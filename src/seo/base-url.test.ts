import { expect, it } from "vitest";
import { getBaseUrl } from "./base-url";

it("prefers the explicit public URL and normalizes to its origin", () => {
  expect(getBaseUrl({ NEXT_PUBLIC_SITE_URL: "https://alif.example/path/", VERCEL_PROJECT_PRODUCTION_URL: "production.example" }).href).toBe("https://alif.example/");
});
it("uses the production domain over any preview host", () => {
  expect(getBaseUrl({ VERCEL_PROJECT_PRODUCTION_URL: "alif.vercel.app" }).href).toBe("https://alif.vercel.app/");
});
it("falls back locally when values are missing or blank", () => {
  expect(getBaseUrl({}).href).toBe("http://localhost:3000/");
  expect(getBaseUrl({ NEXT_PUBLIC_SITE_URL: "  ", VERCEL_PROJECT_PRODUCTION_URL: "" }).href).toBe("http://localhost:3000/");
});
it("preserves explicit local HTTP and rejects non-web protocols", () => {
  expect(getBaseUrl({ NEXT_PUBLIC_SITE_URL: "http://localhost:4000" }).href).toBe("http://localhost:4000/");
  expect(() => getBaseUrl({ NEXT_PUBLIC_SITE_URL: "ftp://example.com" })).toThrow();
});
