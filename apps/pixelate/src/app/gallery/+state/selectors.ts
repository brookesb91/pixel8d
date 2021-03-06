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

const getQuery = createSelector(getGallery, (state) => state.query);

const getLimit = createSelector(getQuery, (query) => query.limit);

const getOffset = createSelector(getQuery, (query) => query.offset);

const getTags = createSelector(getQuery, (query) => query.tags);

const isLoading = createSelector(getGallery, (state) => state.isLoading);

const isLoaded = createSelector(getGallery, (state) => state.isLoaded);

export const GallerySelectors = {
  getSprites,
  getTotal,
  getCurrentPage,
  getQuery,
  getLimit,
  getOffset,
  getTags,
  isLoading,
  isLoaded,
};
