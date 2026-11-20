import { site, skillProfile } from "./site";
import { usesSchema } from "./schemas/uses";
// DEMO hardware below is illustrative and should be confirmed.
export const usesContent = usesSchema.parse({
  title: "Tools for thoughtful work.",
  intro:
    "I use these tools to specify work, direct AI agents, review their changes and test releases.",
  groups: [
    {
      title: "Hardware",
      items: [
        {
          name: "DEMO — Everyday laptop",
          why: "A portable machine for local development and client demos.",
        },
        {
          name: "DEMO — External monitor",
          why: "Space for a data model beside the interface.",
        },
      ],
    },
    {
      title: skillProfile.toolsTitle,
      items: skillProfile.tools,
    },
    ...site.skills.map((group) => ({
      title: group.title,
      items: group.items.map(({ name, note }) => ({ name, why: note })),
    })),
    {
      title: "Productivity",
      items: [
        {
          name: "DEMO — Plain Markdown notes",
          why: "Portable decisions that stay close to the code.",
        },
        {
          name: "DEMO — A weekly review",
          why: "A short pause to check priorities and unfinished work.",
        },
      ],
    },
  ],
});
