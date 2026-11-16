import { it, expect } from "vitest";
import { briefSchema } from "@/content/schemas/contact";
import { briefUrl } from "./brief";
import { site } from "@/content/site";
it("validates required fields and safely encodes special characters", () => {
  expect(briefSchema.safeParse({}).success).toBe(false);
  const brief = briefSchema.parse({
    name: "A & B",
    email: "a@example.com",
    company: "",
    projectType: "Other",
    budget: "Not sure yet",
    timeline: "Flexible",
    message:
      "A project with spaces & Unicode বাংলা and newlines\nfor a real team.",
  });
  const email = new URL(briefUrl(brief, "email"));
  expect(email.pathname).toBe(site.email);
  expect(email.searchParams.get("body")).toContain(brief.message);
  expect(
    new URL(briefUrl(brief, "whatsapp")).searchParams.get("text"),
  ).toContain("A & B");
  expect(
    briefSchema.safeParse({ ...brief, projectType: "unknown" }).success,
  ).toBe(false);
});
