import { buildSearchIndex } from "@/features/search";
// No runtime inputs: Next prerenders this JSON with the production content.
export function GET() {
  return Response.json(buildSearchIndex());
}
