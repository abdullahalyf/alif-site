// DEMO: seeded placeholder photographs, not screenshots or personal story photographs.
export function demoImage(seed: string, alt: string) {
  return { src: `https://picsum.photos/seed/${seed}/1600/1000`, width: 1600, height: 1000, alt };
}
