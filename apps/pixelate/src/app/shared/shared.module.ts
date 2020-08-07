import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollPagerComponent } from './components';
import { PixelCanvasDirective, ScrollSentinelDirective } from './directives';

import { WINDOW_PROVIDERS } from './window-provider';

@NgModule({
  declarations: [
    PixelCanvasDirective,
    ScrollPagerComponent,
    ScrollSentinelDirective,
  ],
  imports: [CommonModule],
  exports: [
    PixelCanvasDirective,
    ScrollPagerComponent,
    ScrollSentinelDirective,
  ],
  providers: [WINDOW_PROVIDERS],
})
export class SharedModule {}
