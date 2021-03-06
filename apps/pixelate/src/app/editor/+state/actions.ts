import { createAction, props } from '@ngrx/store';
import { Sprite } from '../../shared';

export enum EditorActionTypes {
  INIT = '[editor] INIT',
  LOAD_SPRITE = '[editor] LOAD_SPRITE',
  LOAD_SPRITE_FAIL = '[editor] LOAD_SPRITE_FAIL',
  LOAD_SPRITE_SUCCESS = '[editor] LOAD_SPRITE_SUCCESS',
  SAVE = '[editor] SAVE',
  SAVE_FAIL = '[editor] SAVE_FAIL',
  SAVE_SUCCESS = '[editor] SAVE_SUCCESS',
  SET_NAME = '[editor] SET_NAME',
  SET_COLOR = '[editor] SET_COLOR',
  SET_HEIGHT = '[editor] SET_HEIGHT',
  SET_WIDTH = '[editor] SET_WIDTH',
  SET_SIZE = '[editor] SET_SIZE',
  RESIZE = '[editor] RESIZE',
  SET_ACTIVE_COLOR = '[editor] SET_ACTIVE_COLOR',
  ADD_COLOR = '[editor] ADD_COLOR',
  REMOVE_COLOR = '[editor] REMOVE_COLOR',
  SET_PIXEL = '[editor] SET_PIXEL',
}

const init = createAction(EditorActionTypes.INIT);

const loadSprite = createAction(
  EditorActionTypes.LOAD_SPRITE,
  props<{ slug: string }>()
);

const loadSpriteFail = createAction(
  EditorActionTypes.LOAD_SPRITE_FAIL,
  props<{ error: Error }>()
);

const loadSpriteSuccess = createAction(
  EditorActionTypes.LOAD_SPRITE_SUCCESS,
  props<{ sprite: Sprite }>()
);

const save = createAction(EditorActionTypes.SAVE);

const saveFail = createAction(
  EditorActionTypes.SAVE_FAIL,
  props<{ error: Error }>()
);

const saveSuccess = createAction(
  EditorActionTypes.SAVE_SUCCESS,
  props<{ sprite: Sprite }>()
);

const setName = createAction(
  EditorActionTypes.SET_NAME,
  props<{ name: string }>()
);

const setColor = createAction(
  EditorActionTypes.SET_COLOR,
  props<{ color: string; index: number }>()
);

const addColor = createAction(
  EditorActionTypes.ADD_COLOR,
  props<{ color: string }>()
);

const removeColor = createAction(
  EditorActionTypes.REMOVE_COLOR,
  props<{ index: number }>()
);

const setActiveColor = createAction(
  EditorActionTypes.SET_ACTIVE_COLOR,
  props<{ index: number }>()
);

const setPixel = createAction(
  EditorActionTypes.SET_PIXEL,
  props<{ x: number; y: number }>()
);

const setHeight = createAction(
  EditorActionTypes.SET_HEIGHT,
  props<{ height: number }>()
);

const setWidth = createAction(
  EditorActionTypes.SET_WIDTH,
  props<{ width: number }>()
);

const setSize = createAction(
  EditorActionTypes.SET_SIZE,
  props<{ size: number }>()
);

const resize = createAction(EditorActionTypes.RESIZE);

export const EditorActions = {
  init,
  loadSprite,
  loadSpriteFail,
  loadSpriteSuccess,
  save,
  saveFail,
  saveSuccess,
  setName,
  setColor,
  setActiveColor,
  addColor,
  removeColor,
  setWidth,
  setHeight,
  setSize,
  setPixel,
  resize,
};
