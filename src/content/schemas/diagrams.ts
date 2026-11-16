import { z } from "zod";
const text = z.string().min(1);
export const diagramSchema = z
  .object({
    title: text,
    description: text,
    nodes: z
      .array(
        z.object({
          id: text,
          label: text,
          kind: z.enum(["client", "service", "db", "external"]),
        }),
      )
      .min(1),
    edges: z.array(z.object({ from: text, to: text, label: text })),
  })
  .superRefine((diagram, ctx) => {
    const ids = new Set(diagram.nodes.map((node) => node.id));
    if (ids.size !== diagram.nodes.length)
      ctx.addIssue({ code: "custom", message: "Node IDs must be unique" });
    for (const edge of diagram.edges)
      if (!ids.has(edge.from) || !ids.has(edge.to))
        ctx.addIssue({
          code: "custom",
          message: "Edges must reference existing nodes",
        });
    const remaining = new Set(ids);
    while (remaining.size) {
      const roots = [...remaining].filter(
        (id) =>
          !diagram.edges.some(
            (edge) => edge.to === id && remaining.has(edge.from),
          ),
      );
      if (!roots.length) {
        ctx.addIssue({ code: "custom", message: "Diagram must be acyclic" });
        break;
      }
      roots.forEach((id) => remaining.delete(id));
    }
  });
export type Diagram = z.infer<typeof diagramSchema>;
