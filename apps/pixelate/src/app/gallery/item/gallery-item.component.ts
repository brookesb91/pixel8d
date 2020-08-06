import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Sprite } from '../../shared';
import { copyMessage } from '../../utils';
import { environment } from '../../../environments/environment';

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
    const size = Math.min(dim, this.size / dim, this.size);
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

  copySVG() {
    copyMessage(`<img src="${environment.api_url}/svg/${this.sprite.slug}" />`);
    alert('Copied to clipboard!');
  }

  copyEmbed() {
    const h = this.height * this.sprite.size;
    const w = this.width * this.sprite.size;
    copyMessage(
      `<iframe
        src="${environment.api_url}/embed/${this.sprite.slug}"
        frameborder="0"
        height="${h}"
        width="${w}">
      </iframe>`
    );
    alert('Copied to clipboard!');
  }
}
