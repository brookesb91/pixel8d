import { Request, Response } from 'express';
import { Sprite } from '../models';

export const EmbedController = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const sprite = await Sprite.findOne({ slug });

  if (!sprite) {
    return res.render('404');
  }

  return res.render('embed', { sprite });
};
