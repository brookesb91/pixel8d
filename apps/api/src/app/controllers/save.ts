import { Request, Response } from 'express';
import { Sprite, Palette, Pixels } from '../models';

interface SavePayload {
  name: string;
  size: number;
  palette: Palette;
  pixels: Pixels;
}

export const SaveController = async (req: Request, res: Response) => {
  const { name, size, palette, pixels }: SavePayload = req.body;

  const sprite = new Sprite({ name, size, palette, pixels });

  await sprite.save();

  return res.json({ success: true, sprite });
};
