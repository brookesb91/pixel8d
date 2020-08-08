import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  HostListener,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  take,
  filter,
  debounceTime,
  map,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

import { PixelCanvasDirective, roundDownTo, Pixels } from '../../shared';

@Component({
  selector: 'px-editor-stage',
  templateUrl: './editor-stage.component.html',
  styleUrls: ['./editor-stage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorStageComponent implements OnDestroy, OnInit {
  @ViewChild(PixelCanvasDirective) renderer: PixelCanvasDirective;

  @Input()
  pixels$: Observable<Pixels>;

  @Input()
  palette$: Observable<string[]>;

  @Input()
  size$: Observable<number>;

  @Output()
  drawing = new EventEmitter<{ x: number; y: number }>();

  mouseOver$ = new BehaviorSubject(false);
  mouseOut$ = this.mouseOver$.pipe(map((m) => !m));
  drawing$ = new BehaviorSubject(false);
  position$ = new Subject<{ x: number; y: number }>();

  unsubscribe$ = new Subject();

  ngOnInit(): void {
    this.position$
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(10),
        withLatestFrom(this.drawing$),
        filter(([_, drawing]) => drawing),
        map(([pos]) => pos)
      )
      .subscribe((pos) => this.draw(pos));
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.drawing$.next(true);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  onMouseUp() {
    this.drawing$.next(false);
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.drawing$.next(false);
    this.mouseOver$.next(false);
  }

  @HostListener('touchmove', ['$event'])
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent) {
    const pos = this.getEventPosition(event);
    this.mouseOver$.next(true);
    this.position$.next(pos);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private draw(pos: { x: number; y: number }) {
    this.drawing.emit(pos);
  }

  private getEventPosition(event: MouseEvent | TouchEvent) {
    return event instanceof MouseEvent
      ? this.getMousePosition(event)
      : this.getTouchPosition(event);
  }

  private getMousePosition(event: MouseEvent): { x: number; y: number } {
    return this.getClampedPosition(event.clientX, event.clientY);
  }

  private getTouchPosition(event: TouchEvent): { x: number; y: number } {
    return this.getClampedPosition(
      event.touches[0].clientX,
      event.touches[0].clientY
    );
  }

  private getClampedPosition(clientX: number, clientY: number) {
    const rect = this.renderer.canvas.getBoundingClientRect();
    const clamp = this.renderer.size;
    return {
      x: roundDownTo(clientX - rect.left, clamp),
      y: roundDownTo(clientY - rect.top, clamp),
    };
  }
}
