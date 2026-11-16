// @vitest-environment node
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { it, expect } from 'vitest';
import { addImage, sharp } from '../../scripts/add-image';
it('resizes, strips metadata, keeps alpha, and refuses overwrites or unsafe names', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'add-image-'));
  try {
    const input = join(dir, 'source.png');
    await sharp({ create: { width: 8, height: 4, channels: 4, background: { r: 20, g: 30, b: 40, alpha: 0.5 } } }).png().withMetadata().toFile(input);
    expect(await addImage(input, 'sample', 4, dir)).toEqual({ src: '/images/sample.png', width: 4, height: 2, alt: 'TODO' });
    expect((await sharp(join(dir, 'sample.png')).metadata()).exif).toBeUndefined();
    expect((await sharp(join(dir, 'sample.png')).metadata()).hasAlpha).toBe(true);
    await expect(addImage(input, 'sample', 4, dir)).rejects.toThrow();
    await expect(addImage(input, '../escape', 4, dir)).rejects.toThrow('Name');
    await expect(addImage(input, 'bad-size', 0, dir)).rejects.toThrow('--max');
    const opaque = join(dir, 'opaque.png');
    await sharp(input).removeAlpha().png().toFile(opaque);
    expect(await addImage(opaque, 'opaque', 2400, dir)).toEqual({ src: '/images/opaque.jpg', width: 8, height: 4, alt: 'TODO' });
  } finally { await rm(dir, { recursive: true, force: true }); }
});
