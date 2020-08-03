import { Router } from 'express';
import {
  EmbedController,
  GalleryController,
  SaveController,
  SpriteController,
  SVGController,
} from './controllers';

const router = Router();

router.get('/api/gallery', GalleryController);
router.get('/api/sprites/:slug', SpriteController);
router.post('/api/sprites', SaveController);

router.get('/svg/:slug', SVGController);
router.get('/embed/:slug', EmbedController);

export { router };
