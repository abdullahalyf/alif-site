import { expect, it } from "vitest";
import { labContent } from "@/content/lab";
import { labSchema } from "@/content/schemas/lab";
it("validates the demo index and rejects duplicate routes", () => {
  expect(labSchema.parse(labContent).demos).toHaveLength(2);
  expect(labSchema.safeParse({ ...labContent, demos: [labContent.demos[0], labContent.demos[0]] }).success).toBe(false);
});
