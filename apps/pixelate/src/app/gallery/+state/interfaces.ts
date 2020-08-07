import { Sprite } from '../../shared';

export interface Gallery {
  sprites: {
    items: Sprite[];
    total: number;
    page: number;
  };
  query: {
    limit: number;
    offset: number;
    before?: Date;
    tags?: string[];
  };
  isLoading: boolean;
  isLoaded: boolean;
}

export const galleryInitialState: Gallery = {
  sprites: {
    items: [],
    total: 0,
    page: 1,
  },
  query: {
    limit: 3,
    offset: 0,
    before: new Date(),
  },
  isLoaded: false,
  isLoading: false,
};
