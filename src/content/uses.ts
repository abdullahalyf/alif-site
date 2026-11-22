import { site, skillProfile } from "./site";
import { usesSchema } from "./schemas/uses";
export const usesContent = usesSchema.parse({
  title: "Tools for thoughtful work.",
  intro:
    "I use these tools to specify work, direct AI agents, review their changes and test releases.",
  groups: [
    {
      title: "Hardware",
      items: [
        {
          name: "Lenovo Legion 5",
          why: "Ryzen 7 8745H, RTX 4060 8GB, 16GB DDR5-5600, 1TB SSD. Runs local builds, tests and client demos.", // TODO(alif): confirm GPU and SSD.
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
  ],
});
