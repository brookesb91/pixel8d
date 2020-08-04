import { createReducer, on, Action } from '@ngrx/store';

import { GalleryActions } from './actions';
import { galleryInitialState, Gallery } from './interfaces';

const reducer = createReducer(
  // Initial state
  galleryInitialState,
  // Init
  on(GalleryActions.init, () => galleryInitialState),
  // Set page
  on(GalleryActions.setPage, (state, action) => {
    const sprites = { ...state.sprites, page: action.page };
    const query = {
      ...state.query,
      offset: state.query.limit * (action.page - 1),
    };
    return { ...state, sprites, query };
  }),
  // Load sprites
  on(GalleryActions.loadSprites, (state, action) => ({
    ...state,
    isLoaded: false,
    isLoading: true,
  })),
  // Load end
  on(
    GalleryActions.loadSpritesSuccess,
    GalleryActions.loadSpritesFail,
    (state, _) => ({ ...state, isLoading: false, isLoaded: true })
  ),
  // Load success
  on(GalleryActions.loadSpritesSuccess, (state, action) => {
    const sprites = {
      ...state.sprites,
      items: [...state.sprites.items.slice(), ...action.items],
      total: action.total,
    };

    return { ...state, sprites };
  })
);

export function galleryReducer(
  state: Gallery | undefined,
  action: Action
): Gallery {
  return reducer(state, action);
}
