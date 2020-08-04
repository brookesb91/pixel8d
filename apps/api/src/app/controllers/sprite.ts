import { Request, Response } from 'express';
import { Sprite } from '../models';

export const SpriteController = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  const sprite = await Sprite.findOne({ slug });

  return res.json({ success: true, sprite });
};
