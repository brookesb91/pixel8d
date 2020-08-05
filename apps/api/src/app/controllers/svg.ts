import { Request, Response } from 'express';

import { Sprite } from '../models';

export const SVGController = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const sprite = await Sprite.findOne({ slug });
  const size = Number(req.query.size);
  const svg = sprite.toSVG(size);

  res.set('Content-Type', 'image/svg+xml');
  return res.send(svg);
};
