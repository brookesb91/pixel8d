import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Gallery } from './interfaces';
import { GalleryActions } from './actions';
import { GallerySelectors } from './selectors';

@Injectable()
export class GalleryFacade {
  sprites$ = this.store.select(GallerySelectors.getSprites);
  total$ = this.store.select(GallerySelectors.getTotal);
  currentPage$ = this.store.select(GallerySelectors.getCurrentPage);
  query$ = this.store.select(GallerySelectors.getQuery);
  limit$ = this.store.select(GallerySelectors.getLimit);
  offset$ = this.store.select(GallerySelectors.getOffset);
  tags$ = this.store.select(GallerySelectors.getTags);
  isLoading$ = this.store.select(GallerySelectors.isLoading);
  isLoaded$ = this.store.select(GallerySelectors.isLoaded);

  constructor(private store: Store<Gallery>) {}

  init() {
    this.store.dispatch(GalleryActions.init());
  }

  load() {
    this.store.dispatch(GalleryActions.loadSprites());
  }

  setPage(page: number) {
    this.store.dispatch(GalleryActions.setPage({ page }));
  }
}
