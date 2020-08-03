import { Request, Response } from 'express';
import { Sprite } from '../models';

export const GalleryController = async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const offset = req.query.offset
    ? parseInt(req.query.offset as string, 10)
    : 0;

  const before =
    typeof req.query.before !== 'undefined'
      ? new Date(String(req.query.before))
      : new Date();

  const query = {
    createdAt: {
      $lt: before,
    },
  };

  const sort = {
    createdAt: -1,
  };

  const sprites = {
    items: await Sprite.find(query).sort(sort).skip(offset).limit(limit),
    total: await Sprite.countDocuments(query),
  };

  return res.json({ success: true, sprites });
};
