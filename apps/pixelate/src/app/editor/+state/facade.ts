import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Editor } from './interfaces';
import { EditorSelectors } from './selectors';
import { EditorActions } from './actions';

@Injectable()
export class EditorFacade {
  sprite$ = this.store.select(EditorSelectors.getSprite);
  name$ = this.store.select(EditorSelectors.getName);
  pixels$ = this.store.select(EditorSelectors.getPixels);
  palette$ = this.store.select(EditorSelectors.getPalette);
  height$ = this.store.select(EditorSelectors.getHeight);
  width$ = this.store.select(EditorSelectors.getWidth);
  size$ = this.store.select(EditorSelectors.getSize);
  activeColor$ = this.store.select(EditorSelectors.getActiveColor);
  activeColorIndex$ = this.store.select(EditorSelectors.getActiveColorIndex);
  isLoading$ = this.store.select(EditorSelectors.isLoading);
  isLoaded$ = this.store.select(EditorSelectors.isLoaded);
  isClean$ = this.store.select(EditorSelectors.isClean);

  constructor(private store: Store<Editor>) {}

  init() {
    this.store.dispatch(EditorActions.init());
  }

  load(slug: string) {
    this.store.dispatch(EditorActions.loadSprite({ slug }));
  }

  save() {
    this.store.dispatch(EditorActions.save());
  }

  setName(name: string) {
    this.store.dispatch(EditorActions.setName({ name }));
  }

  setColor(index: number, color: string) {
    this.store.dispatch(EditorActions.setColor({ index, color }));
  }

  addColor(color: string) {
    this.store.dispatch(EditorActions.addColor({ color }));
  }

  removeColor(index: number) {
    this.store.dispatch(EditorActions.removeColor({ index }));
  }

  setActiveColor(index: number) {
    this.store.dispatch(EditorActions.setActiveColor({ index }));
  }

  setPixel(x: number, y: number) {
    this.store.dispatch(EditorActions.setPixel({ x, y }));
  }
}
