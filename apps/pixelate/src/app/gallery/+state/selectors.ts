import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Gallery } from './interfaces';

export const FEATURE_NAME = 'gallery';

const getGallery = createFeatureSelector<Gallery>(FEATURE_NAME);

const getSprites = createSelector(getGallery, (state) => state.sprites.items);

const getTotal = createSelector(getGallery, (state) => state.sprites.total);

const getCurrentPage = createSelector(
  getGallery,
  (state) => state.sprites.page
);

const getLimit = createSelector(getGallery, (state) => state.query.limit);

const getOffset = createSelector(getGallery, (state) => state.query.offset);

const getTags = createSelector(getGallery, (state) => state.query.tags);

const isLoading = createSelector(getGallery, (state) => state.isLoading);

const isLoaded = createSelector(getGallery, (state) => state.isLoaded);

export const GallerySelectors = {
  getSprites,
  getTotal,
  getCurrentPage,
  getLimit,
  getOffset,
  getTags,
  isLoading,
  isLoaded,
};
