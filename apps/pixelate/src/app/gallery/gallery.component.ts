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

  constructor(private gallery: GalleryFacade) {}

  ngOnInit(): void {
    this.sprites$ = this.gallery.sprites$;

    this.gallery.load();
  }

  ngOnDestroy(): void {
    this.gallery.init();
  }
}
