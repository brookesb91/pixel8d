import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Editor } from './interfaces';

export const FEATURE_NAME = 'editor';

const getEditor = createFeatureSelector<Editor>(FEATURE_NAME);

const getSprite = createSelector(getEditor, (state) => state.sprite);

const getName = createSelector(getSprite, (state) => state.name);

const getPixels = createSelector(getSprite, (state) => state.pixels);

const getPalette = createSelector(getSprite, (state) => state.palette.colors);

const getActiveColorIndex = createSelector(
  getSprite,
  (state) => state.palette.active
);

const getActiveColor = createSelector(
  getSprite,
  (state) => state.palette.colors[state.palette.active]
);

const getHeight = createSelector(getSprite, (state) => state.height);

const getWidth = createSelector(getSprite, (state) => state.width);

const getSize = createSelector(getSprite, (state) => state.size);

const isLoading = createSelector(getEditor, (state) => state.isLoading);

const isLoaded = createSelector(getEditor, (state) => state.isLoaded);

const isClean = createSelector(getSprite, (state) =>
  state.pixels.every((row) => row.every((col) => col === 0))
);

export const EditorSelectors = {
  getSprite,
  getName,
  getPixels,
  getActiveColor,
  getActiveColorIndex,
  getPalette,
  getHeight,
  getWidth,
  getSize,
  isLoading,
  isLoaded,
  isClean,
};
