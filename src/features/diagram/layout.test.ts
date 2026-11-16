import { expect, it } from 'vitest';
import { diagrams } from '@/content/diagrams';
import { diagramSchema } from '@/content/schemas/diagrams';
import { layoutDiagram } from './layout';
it('lays out every project with forward edges and no overlapping nodes', () => { for (const diagram of Object.values(diagrams)) { expect(diagramSchema.safeParse(diagram).success).toBe(true); const nodes = layoutDiagram(diagram); expect(new Set(nodes.map(node => `${node.x},${node.y}`)).size).toBe(nodes.length); for (const edge of diagram.edges) expect(nodes.find(node => node.id === edge.to)!.x).toBeGreaterThan(nodes.find(node => node.id === edge.from)!.x); } });
it('rejects cycles and missing endpoints', () => { const original = diagrams['traffic-accident-risk']; expect(diagramSchema.safeParse({ ...original, edges: [...original.edges, { from: 'map', to: 'data', label: 'Cycle' }] }).success).toBe(false); expect(diagramSchema.safeParse({ ...original, edges: [{ from: 'missing', to: 'data', label: 'Bad' }] }).success).toBe(false); });
