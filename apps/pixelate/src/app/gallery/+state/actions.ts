import { createAction, props } from '@ngrx/store';
import { Sprite } from '../../shared';

export enum GalleryActionTypes {
  INIT = '[gallery] INIT',
  SET_PAGE = '[gallery] SET_PAGE',
  SET_TAG = '[gallery] SET_TAG',
  REMOVE_TAG = '[gallery] REMOVE_TAG',
  LOAD_SPRITES = '[gallery] LOAD_SPRITES',
  LOAD_SPRITES_SUCCESS = '[gallery] LOAD_SPRITES_SUCCESS',
  LOAD_SPRITES_FAIL = '[gallery] LOAD_SPRITES_FAIL',
}

const init = createAction(GalleryActionTypes.INIT);

const setPage = createAction(
  GalleryActionTypes.SET_PAGE,
  props<{ page: number }>()
);

const setTag = createAction(
  GalleryActionTypes.SET_TAG,
  props<{ tag: string }>()
);

const removeTag = createAction(
  GalleryActionTypes.REMOVE_TAG,
  props<{ tag: string }>()
);

const loadSprites = createAction(GalleryActionTypes.LOAD_SPRITES);

const loadSpritesSuccess = createAction(
  GalleryActionTypes.LOAD_SPRITES_SUCCESS,
  props<{ items: Sprite[]; total: number }>()
);

const loadSpritesFail = createAction(
  GalleryActionTypes.LOAD_SPRITES_FAIL,
  props<{ error: Error }>()
);

export const GalleryActions = {
  init,
  setPage,
  setTag,
  removeTag,
  loadSprites,
  loadSpritesSuccess,
  loadSpritesFail,
};
