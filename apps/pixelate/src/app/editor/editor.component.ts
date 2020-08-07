import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { Observable } from 'rxjs';

import { Pixels } from '../shared';
import { EditorFacade } from './+state';

@Component({
  selector: 'px-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy {
  name$: Observable<string>;
  pixels$: Observable<Pixels>;
  palette$: Observable<string[]>;
  size$: Observable<number>;
  isClean$: Observable<boolean>;
  activeColorIndex$: Observable<number>;
  height$: Observable<number>;
  width$: Observable<number>;
  canAddColor$: Observable<boolean>;

  constructor(private editor: EditorFacade) {}

  ngOnInit() {
    this.name$ = this.editor.name$;
    this.pixels$ = this.editor.pixels$;
    this.palette$ = this.editor.palette$;
    this.size$ = this.editor.size$;
    this.isClean$ = this.editor.isClean$;
    this.activeColorIndex$ = this.editor.activeColorIndex$;
    this.height$ = this.editor.height$;
    this.width$ = this.editor.width$;
    this.canAddColor$ = this.editor.canAddColor$;
  }

  draw(pos: { x: number; y: number }) {
    this.editor.setPixel(pos.x, pos.y);
  }

  setActiveColor(index: number) {
    this.editor.setActiveColor(index);
  }

  addColor(color: string) {
    this.editor.addColor(color);
  }

  removeColor(index: number) {
    this.editor.removeColor(index);
  }

  setName(name: string) {
    this.editor.setName(name);
  }

  setHeight(height: number) {
    this.editor.setHeight(height);
  }

  setWidth(width: number) {
    this.editor.setWidth(width);
  }

  setSize(size: number) {
    this.editor.setSize(size);
  }

  save() {
    this.editor.save();
  }

  ngOnDestroy() {
    this.editor.init();
  }
}
