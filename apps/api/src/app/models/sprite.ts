import { Document, Schema, model } from 'mongoose';
import slugify from 'slugify';
import * as randomstring from 'randomstring';

import { createRect, createSVG } from '../utils';

export type Pixels = number[][];
export type Palette = string[];

export interface SpriteModel {
  // Fields
  name: string;
  slug: string;
  size: number;
  pixels: Pixels;
  palette: Palette;
  // Methods
  getHeight: getHeightFn;
  getWidth: getWidthFn;
  toSVG: toSVGFn;
}

export type SpriteDocument = Document & SpriteModel;

type getHeightFn = (this: SpriteDocument) => number;
type getWidthFn = (this: SpriteDocument) => number;
type toSVGFn = (this: SpriteDocument, size?: number) => string;

export const SpriteSchema = new Schema<SpriteDocument>(
  {
    name: { type: String, required: [true, 'is required.'] },
    slug: { type: String },
    size: { type: Number, required: [true, 'is required.'] },
    palette: [{ type: String }],
    pixels: [[{ type: Number }]],
  },
  { timestamps: true }
);

const getHeight: getHeightFn = function () {
  return !!this.pixels ? this.pixels.length : 0;
};

const getWidth: getWidthFn = function () {
  return !!this.pixels[0] ? this.pixels[0].length : 0;
};

const toSVG: toSVGFn = function (size?: number) {
  const rects: string[] = [];
  const width = this.getWidth();
  const height = this.getHeight();
  const s = size || this.size;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const pixel = this.pixels[row][col];

      const x = col * s;
      const y = row * s;
      const fill = this.palette[pixel];
      const rect = createRect(x, y, s, s, fill);

      rects.push(rect);
    }
  }

  const calculated = {
    height: s * height,
    width: s * width,
  };

  const svg = createSVG(calculated.width, calculated.height, rects.join(''));

  return svg;
};

SpriteSchema.methods.getHeight = getHeight;
SpriteSchema.methods.getWidth = getWidth;
SpriteSchema.methods.toSVG = toSVG;

SpriteSchema.pre<SpriteDocument>('save', function (done) {
  if (!this.slug) {
    const slug = slugify(this.name, { lower: true });
    const rnd = randomstring.generate(8);
    this.slug = `${slug}-${rnd}`;
  }

  done();
});

SpriteSchema.index({ name: 'text' });

export const Sprite = model<SpriteDocument>('Sprite', SpriteSchema);
