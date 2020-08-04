import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Editor } from './interfaces';

export const FEATURE_NAME = 'editor';

const getEditor = createFeatureSelector<Editor>(FEATURE_NAME);

const getPixels = createSelector(getEditor, (state) => state.pixels);

const getPalette = createSelector(getEditor, (state) => state.palette.colors);

const getActiveColorIndex = createSelector(
  getEditor,
  (state) => state.palette.active
);

const getActiveColor = createSelector(
  getEditor,
  (state) => state.palette.colors[state.palette.active]
);

const getHeight = createSelector(getEditor, (state) => state.height);

const getWidth = createSelector(getEditor, (state) => state.width);

const getSize = createSelector(getEditor, (state) => state.size);

const isLoading = createSelector(getEditor, (state) => state.isLoading);

const isLoaded = createSelector(getEditor, (state) => state.isLoaded);

export const EditorSelectors = {
  getPixels,
  getActiveColor,
  getActiveColorIndex,
  getPalette,
  getHeight,
  getWidth,
  getSize,
  isLoading,
  isLoaded,
};
