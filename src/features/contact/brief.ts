import { site } from '@/content/site';
import { contactContent as c } from '@/content/contact';
import type { Brief } from '@/content/schemas/contact';
export function briefUrl(brief: Brief, channel: 'email' | 'whatsapp') {
  const body = c.fields.map(field => `${field.label}: ${brief[field.name]}`).join('\n\n');
  if (channel === 'email') return `mailto:${site.email}?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent(body)}`;
  const url = new URL(site.whatsapp.href); url.searchParams.set('text', `${c.subject}\n\n${body}`); return url.href;
}
