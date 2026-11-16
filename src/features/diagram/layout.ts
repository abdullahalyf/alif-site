import type { Diagram } from '@/content/schemas/diagrams';
export function layoutDiagram(diagram: Diagram) {
  const columns = new Map<string, number>();
  const pending = new Set(diagram.nodes.map(node => node.id));
  while (pending.size) {
    let progress = false;
    for (const id of pending) { const parents = diagram.edges.filter(edge => edge.to === id).map(edge => edge.from); if (parents.every(parent => columns.has(parent))) { columns.set(id, parents.length ? Math.max(...parents.map(parent => columns.get(parent)!)) + 1 : 0); pending.delete(id); progress = true; } }
    if (!progress) throw new Error('Architecture diagrams require an acyclic graph with valid references.');
  }
  const rows = new Map<number, number>();
  return diagram.nodes.map(node => { const column = columns.get(node.id)!; const row = rows.get(column) ?? 0; rows.set(column, row + 1); return { ...node, x: 24 + column * 320, y: 40 + row * 150 }; });
}
