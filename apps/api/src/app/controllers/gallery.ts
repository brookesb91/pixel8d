import { Request, Response } from 'express';
import { Sprite } from '../models';

export const GalleryController = async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const offset = req.query.offset
    ? parseInt(req.query.offset as string, 10)
    : 0;

  const query = {};

  const sprites = {
    items: await Sprite.find(query).skip(offset).limit(limit),
  };

  return res.json({ success: true, sprites });
};
