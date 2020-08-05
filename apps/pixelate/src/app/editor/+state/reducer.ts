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
    const x = action.x / state.sprite.size;
    const y = action.y / state.sprite.size;
    const row = state.sprite.pixels[y];

    const newRow = [
      ...row.slice(0, x),
      state.sprite.palette.active,
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
    const colors = [
      ...state.sprite.palette.colors.slice(0, action.index),
      action.color,
      ...state.sprite.palette.colors.slice(action.index + 1),
    ];

    const sprite = {
      ...state.sprite,
      palette: { ...state.sprite.palette, colors },
    };

    return { ...state, sprite };
  }),

  on(EditorActions.addColor, (state, action) => ({
    ...state,
    sprite: {
      ...state.sprite,
      palette: {
        colors: [...state.sprite.palette.colors, action.color],
        active: state.sprite.palette.colors.length - 1,
      },
    },
  }))
);

export function editorReducer(
  state: Editor | undefined,
  action: Action
): Editor {
  return reducer(state, action);
}
