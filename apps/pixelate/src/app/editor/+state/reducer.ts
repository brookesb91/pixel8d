import { createReducer, on, Action } from '@ngrx/store';
import { createInitialState, Editor } from './interfaces';
import { EditorActions } from './actions';

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

  on(EditorActions.setPixel, (state, action) => {
    const x = action.x / state.size;
    const y = action.y / state.size;
    const row = state.pixels[y];

    const newRow = [
      ...row.slice(0, x),
      state.palette.active,
      ...row.slice(x + 1),
    ];

    const pixels = [
      ...state.pixels.slice(0, y),
      newRow,
      ...state.pixels.slice(y + 1),
    ];

    return { ...state, pixels };
  }),

  on(EditorActions.setColor, (state, action) => {
    const colors = [
      ...state.palette.colors.slice(0, action.index),
      action.color,
      ...state.palette.colors.slice(action.index + 1),
    ];

    return { ...state, palette: { ...state.palette, colors } };
  }),

  on(EditorActions.addColor, (state, action) => ({
    ...state,
    palette: {
      colors: [...state.palette.colors, action.color],
      active: state.palette.colors.length - 1,
    },
  }))
);

export function editorReducer(
  state: Editor | undefined,
  action: Action
): Editor {
  return reducer(state, action);
}
