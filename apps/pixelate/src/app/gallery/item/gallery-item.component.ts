import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Sprite } from '../../shared';

@Component({
  selector: 'px-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryItemComponent {
  @Input() sprite: Sprite;
  @Input() size: number = 250;

  get scaledSize() {
    const dim = Math.max(this.height, this.width);
    const size = Math.min(Math.max(dim, this.size / dim), this.size);
    return size;
  }

  get height() {
    return this.sprite.pixels.length;
  }

  get width() {
    return this.sprite.pixels[0].length;
  }

  get palette() {
    return this.sprite.palette.filter((c) => c !== 'transparent');
  }
}
