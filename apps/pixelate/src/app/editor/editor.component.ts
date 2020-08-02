import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  HostListener,
  OnDestroy,
} from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, filter, debounceTime, map, takeUntil } from 'rxjs/operators';

import { PixelCanvasDirective, roundDownTo, Pixels } from '../shared';
import { EditorFacade } from './+state';

@Component({
  selector: 'px-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild(PixelCanvasDirective) renderer: PixelCanvasDirective;

  pixels$: Observable<Pixels>;
  palette$: Observable<string[]>;
  size$: Observable<number>;

  mouseOver$ = new BehaviorSubject(false);
  mouseOut$ = this.mouseOver$.pipe(map((m) => !m));
  drawing$ = new BehaviorSubject(false);
  position$ = new Subject<{ x: number; y: number }>();

  unsubscribe$ = new Subject();

  constructor(private facade: EditorFacade) {}

  ngOnInit(): void {
    this.pixels$ = this.facade.pixels$;
    this.palette$ = this.facade.palette$;
    this.size$ = this.facade.size$;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.draw(event);
    this.drawing$.next(true);
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.drawing$.next(false);
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.drawing$.next(false);
    this.mouseOver$.next(false);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseOver$.next(true);
    this.position$.next(this.getCanvasMousePosition(event));

    this.drawing$
      .pipe(
        debounceTime(50),
        takeUntil(this.unsubscribe$),
        take(1),
        filter((drawing) => drawing)
      )
      .subscribe(() => this.draw(event));
  }

  ngOnDestroy(): void {
    this.facade.init();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private draw(event: MouseEvent) {
    const pos = this.getCanvasMousePosition(event);
    this.facade.setPixel(pos.x, pos.y);
  }

  private getCanvasMousePosition(event: MouseEvent) {
    const rect = this.renderer.canvas.getBoundingClientRect();
    const size = this.renderer.size;
    return {
      x: roundDownTo(event.clientX - rect.left, size),
      y: roundDownTo(event.clientY - rect.top, size),
    };
  }
}
