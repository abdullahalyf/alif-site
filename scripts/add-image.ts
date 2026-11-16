import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Resolve the sharp installation supplied by Next without relying on pnpm hoisting.
const requireFromNext = createRequire(createRequire(import.meta.url).resolve('next/package.json'));
export const sharp: ReturnType<typeof import('next/dist/server/image-optimizer').getSharp> = requireFromNext('sharp');

export async function addImage(input: string, name: string, max = 2400, outputDirectory = resolve('public/images')) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) throw new Error('Name must be lowercase words separated by hyphens, e.g. your-portrait');
  if (!Number.isSafeInteger(max) || max < 1) throw new Error('--max must be a positive integer, e.g. 2400');
  const metadata = await sharp(input).metadata();
  const ext = metadata.hasAlpha ? 'png' : 'jpg';
  const pipeline = sharp(input).rotate().resize({ width: max, withoutEnlargement: true });
  const { data, info } = await (ext === 'png' ? pipeline.png() : pipeline.jpeg({ quality: 90, mozjpeg: true })).toBuffer({ resolveWithObject: true });
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(resolve(outputDirectory, `${name}.${ext}`), data, { flag: 'wx' });
  return { src: `/images/${name}.${ext}`, width: info.width, height: info.height, alt: 'TODO' };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [input, name, flag, size, ...extra] = process.argv.slice(2);
  if (!input || !name || (flag !== undefined && (flag !== '--max' || !size)) || extra.length) {
    console.error('Usage: pnpm add:image <input> <name> [--max 2400]'); process.exitCode = 1;
  } else {
    addImage(input, name, size === undefined ? 2400 : Number(size)).then(result => console.log(JSON.stringify(result, null, 2))).catch(error => { console.error(error.message); process.exitCode = 1; });
  }
}
