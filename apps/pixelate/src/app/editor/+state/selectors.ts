import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Editor } from './interfaces';

export const FEATURE_NAME = 'editor';
export const EDITOR_MAX_COLORS = 8;

const getEditor = createFeatureSelector<Editor>(FEATURE_NAME);

const getSprite = createSelector(getEditor, (state) => state.sprite);

const getName = createSelector(getSprite, (state) => state.name);

const getPixels = createSelector(getSprite, (state) => state.pixels);

const getPalette = createSelector(getSprite, (state) => state.palette);

const getActiveColorIndex = createSelector(
  getEditor,
  (state) => state.activeColorIndex
);

const getActiveColor = createSelector(
  getEditor,
  (state) => state.sprite.palette[state.activeColorIndex]
);

const getHeight = createSelector(getSprite, (state) => state.height);

const getWidth = createSelector(getSprite, (state) => state.width);

const getSize = createSelector(getSprite, (state) => state.size);

const isLoading = createSelector(getEditor, (state) => state.isLoading);

const isLoaded = createSelector(getEditor, (state) => state.isLoaded);

const isClean = createSelector(getSprite, (state) =>
  state.pixels.every((row) => row.every((col) => col === 0))
);

const canAddColor = createSelector(
  getPalette,
  (palette) => palette.length < EDITOR_MAX_COLORS
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
  canAddColor,
};
