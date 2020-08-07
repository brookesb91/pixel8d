import {
  Directive,
  Inject,
  AfterViewInit,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { WINDOW } from '../window-provider';

@Directive({
  selector: '[pxScrollSentinel]',
})
export class ScrollSentinelDirective implements AfterViewInit, OnDestroy {
  @Output() intersecting = new EventEmitter();
  @Input() rootMargin = '0px 0px 0px 0px';
  @Input() debounce = 100;

  intersecting$ = new Subject<boolean>();
  unsubscribe$ = new Subject();

  private observer: IntersectionObserver;

  constructor(
    @Inject(WINDOW) private window: any,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    if ('IntersectionObserver' in this.window) {
      this.observer = new IntersectionObserver(this.handle, {
        rootMargin: this.rootMargin,
      });
      this.observer.observe(this.elementRef.nativeElement);

      this.intersecting$
        .pipe(takeUntil(this.unsubscribe$), debounceTime(this.debounce))
        .subscribe(() => this.intersecting.emit());
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.unobserve(this.elementRef.nativeElement);
    }

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private handle: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    if (entries[0].isIntersecting) {
      this.intersecting$.next(true);
    }
  };
}
