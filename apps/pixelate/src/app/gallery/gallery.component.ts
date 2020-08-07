import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';

import { Observable } from 'rxjs';

import { Sprite } from '../shared';
import { GalleryFacade } from './+state';

@Component({
  selector: 'px-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit, OnDestroy {
  sprites$: Observable<Sprite[]>;
  isLoading$: Observable<boolean>;
  currentPage$: Observable<number>;
  perPage$: Observable<number>;
  total$: Observable<number>;

  constructor(private gallery: GalleryFacade) {}

  ngOnInit(): void {
    this.sprites$ = this.gallery.sprites$;
    this.currentPage$ = this.gallery.currentPage$;
    this.perPage$ = this.gallery.limit$;
    this.total$ = this.gallery.total$;

    this.isLoading$ = this.gallery.isLoading$;

    this.gallery.load();
  }

  setPage(page: number) {
    this.gallery.setPage(page);
  }

  ngOnDestroy(): void {
    this.gallery.init();
  }
}
