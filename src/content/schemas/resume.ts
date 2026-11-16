import { z } from 'zod';
const text = z.string().min(1);
export const resumeSchema = z.object({ title: text, description: text, print: text, summaryTitle: text, experienceTitle: text, projectsTitle: text, educationTitle: text, skillsTitle: text, languagesTitle: text, achievementsTitle: text, experience: z.array(z.object({ title: text, period: text, text })).min(1) });
