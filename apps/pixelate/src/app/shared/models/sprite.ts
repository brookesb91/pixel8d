export type Pixels = number[][];
export type Palette = string[];

export interface Sprite {
  slug: string;
  name: string;
  size: number;
  pixels: Pixels;
  palette: Palette;
}
