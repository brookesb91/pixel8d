import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'px-scroll-pager',
  template: `
    <div
      *ngIf="!disabled && canPage"
      pxScrollSentinel
      [rootMargin]="rootMargin"
      (intersecting)="onIntersect()"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollPagerComponent {
  @Input() currentPage: number = 1;
  @Input() perPage: number = 0;
  @Input() total: number = 0;
  @Input() disabled: boolean;
  @Input() rootMargin: string = '0px 100px 0px 0px';

  @Output() page = new EventEmitter<number>();

  get canPage() {
    return this.total === 0
      ? false
      : this.currentPage * this.perPage <= this.total;
  }

  onIntersect() {
    if (this.canPage) {
      this.page.emit(this.currentPage + 1);
    }
  }
}
