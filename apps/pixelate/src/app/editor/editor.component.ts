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

  constructor(private editor: EditorFacade) {}

  ngOnInit() {
    this.name$ = this.editor.name$;
    this.pixels$ = this.editor.pixels$;
    this.palette$ = this.editor.palette$;
    this.size$ = this.editor.size$;
    this.isClean$ = this.editor.isClean$;
  }

  draw(pos: { x: number; y: number }) {
    this.editor.setPixel(pos.x, pos.y);
  }

  setActiveColor(index: number) {
    this.editor.setActiveColor(index);
  }

  setName(name: string) {
    this.editor.setName(name);
  }

  ngOnDestroy() {
    this.editor.init();
  }
}
