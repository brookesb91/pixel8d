import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PixelCanvasDirective } from './directives';

@NgModule({
  declarations: [PixelCanvasDirective],
  imports: [CommonModule],
  exports: [PixelCanvasDirective],
  providers: [],
})
export class SharedModule {}
