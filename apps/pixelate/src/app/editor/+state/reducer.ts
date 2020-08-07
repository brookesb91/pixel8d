import { createReducer, on, Action } from '@ngrx/store';

import { createInitialState, Editor } from './interfaces';
import { EditorActions } from './actions';
import { resize } from '../../utils';

export const EDITOR_MAX_WIDTH = 128;
export const EDITOR_MAX_HEIGHT = 128;
export const EDITOR_MAX_SIZE = 50;

const reducer = createReducer(
  createInitialState(),

  on(EditorActions.init, () => createInitialState()),

  on(EditorActions.loadSprite, EditorActions.save, (state, _) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),

  on(
    EditorActions.saveFail,
    EditorActions.saveSuccess,
    EditorActions.loadSpriteFail,
    EditorActions.loadSpriteSuccess,
    (state, _) => ({
      ...state,
      isLoaded: true,
      isLoading: false,
    })
  ),

  on(EditorActions.loadSpriteSuccess, (state, action) => ({
    ...state,
    sprite: { ...state.sprite, ...action.sprite },
  })),

  on(EditorActions.setPixel, (state, action) => {
    const x = action.x / state.sprite.size;
    const y = action.y / state.sprite.size;
    const row = state.sprite.pixels[y];

    const newRow = [
      ...row.slice(0, x),
      state.activeColorIndex,
      ...row.slice(x + 1),
    ];

    const pixels = [
      ...state.sprite.pixels.slice(0, y),
      newRow,
      ...state.sprite.pixels.slice(y + 1),
    ];

    const sprite = { ...state.sprite, pixels };

    return { ...state, sprite };
  }),

  on(EditorActions.setName, (state, action) => {
    const sprite = { ...state.sprite, name: action.name };
    return { ...state, sprite };
  }),

  on(EditorActions.setColor, (state, action) => {
    const palette = [
      ...state.sprite.palette.slice(0, action.index),
      action.color,
      ...state.sprite.palette.slice(action.index + 1),
    ];

    const sprite = {
      ...state.sprite,
      palette,
    };

    return { ...state, sprite };
  }),

  on(EditorActions.addColor, (state, action) => ({
    ...state,
    sprite: {
      ...state.sprite,
      palette: [...state.sprite.palette, action.color],
    },
  })),

  on(EditorActions.removeColor, (state, action) => {
    // remove the color
    // shuffle all pixels down to max palette index
    const palette = [
      ...state.sprite.palette.slice(0, action.index),
      ...state.sprite.palette.slice(action.index + 1),
    ];

    const lastIndex = palette.length - 1;

    const pixels = [
      ...state.sprite.pixels.map((row) =>
        row.map((col) => Math.min(col, lastIndex))
      ),
    ];

    const sprite = { ...state.sprite, palette, pixels };
    return { ...state, sprite };
  }),

  on(EditorActions.setActiveColor, (state, action) => ({
    ...state,
    activeColorIndex: action.index,
  })),

  on(EditorActions.setWidth, (state, action) => {
    const width = Math.max(1, Math.min(action.width, EDITOR_MAX_WIDTH));
    const sprite = { ...state.sprite, width };
    return { ...state, sprite };
  }),

  on(EditorActions.setHeight, (state, action) => {
    const height = Math.max(1, Math.min(action.height, EDITOR_MAX_HEIGHT));
    const sprite = { ...state.sprite, height };
    return { ...state, sprite };
  }),

  on(EditorActions.setSize, (state, action) => {
    const size = Math.max(1, Math.min(action.size, EDITOR_MAX_SIZE));
    const sprite = { ...state.sprite, size };
    return { ...state, sprite };
  }),

  on(EditorActions.resize, (state, action) => {
    const pixels = resize(
      [...state.sprite.pixels.map((p) => resize(p, state.sprite.width, 0))],
      state.sprite.height,
      new Array(state.sprite.width).fill(0)
    );
    const sprite = { ...state.sprite, pixels };
    return { ...state, sprite };
  })
);

export function editorReducer(
  state: Editor | undefined,
  action: Action
): Editor {
  return reducer(state, action);
}
