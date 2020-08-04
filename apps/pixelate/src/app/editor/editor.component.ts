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
  pixels$: Observable<Pixels>;
  palette$: Observable<string[]>;
  size$: Observable<number>;

  constructor(private editor: EditorFacade) {}

  ngOnInit() {
    this.pixels$ = this.editor.pixels$;
    this.palette$ = this.editor.palette$;
    this.size$ = this.editor.size$;
  }

  draw(pos: { x: number; y: number }) {
    this.editor.setPixel(pos.x, pos.y);
  }

  ngOnDestroy() {
    this.editor.init();
  }
}
