import { z } from 'zod';
const text = z.string().min(1);
export const usesSchema = z.object({ title: text, intro: text, groups: z.array(z.object({ title: text, items: z.array(z.object({ name: text, why: text })).min(1) })).min(1) });
