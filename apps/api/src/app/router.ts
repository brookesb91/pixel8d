import { Router } from 'express';
import { GalleryController } from './controllers';

const router = Router();

router.get('/api/gallery', GalleryController);

export { router };
