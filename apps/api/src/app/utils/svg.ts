export function createRect(
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string
): string {
  return createElement('rect', w, h, fill, x, y);
}

export function createElement(
  name: string,
  w: number,
  h: number,
  fill: string,
  x: number = 0,
  y: number = 0
): string {
  return `<${name} x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" />`;
}

export function createSVG(w: number, h: number, content: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    ${content}
  </svg>
`;
}
