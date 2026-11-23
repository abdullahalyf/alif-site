export function photoSlot(name: string, width: number, height: number, alt: string) {
  return { src: `/images/slots/${name}.jpg`, width, height, alt };
}
