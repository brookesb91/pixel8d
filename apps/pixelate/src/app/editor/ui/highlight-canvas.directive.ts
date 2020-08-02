import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { filter, takeUntil, withLatestFrom, map, tap } from 'rxjs/operators';

@Directive({
  selector: 'canvas[pxHighlightCanvas]',
})
export class HighlightCanvasDirective implements OnInit, OnDestroy {
  get canvas() {
    return <HTMLCanvasElement>this.elementRef.nativeElement;
  }

  get context() {
    return this.canvas.getContext('2d');
  }

  get width() {
    return this.canvas.width;
  }

  @Input()
  set width(value: number) {
    this.canvas.width = value;
  }

  get height() {
    return this.canvas.height;
  }

  @Input()
  set height(value: number) {
    this.canvas.height = value;
  }

  @Input() size: number;
  @Input() hidden$: Observable<boolean>;
  @Input() position$: Observable<{ x: number; y: number }>;

  unsubscribe$ = new Subject<void>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.hidden$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.clear()),
        filter((hidden) => !hidden),
        withLatestFrom(this.position$),
        map(([_, position]) => position)
      )
      .subscribe((position) => this.highlight(position));
  }

  highlight(position: { x: number; y: number }) {
    this.context.fillStyle = 'rgba(0,0,0,0.5)';
    this.context.fillRect(position.x, position.y, this.size, this.size);
  }

  clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
