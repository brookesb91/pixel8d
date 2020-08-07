import {
  Directive,
  Input,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Pixels, Palette } from '../models';

@Directive({
  selector: 'canvas[pxCanvas]',
})
export class PixelCanvasDirective implements AfterViewInit, OnChanges {
  @Input() pixels: Pixels = [[]];
  @Input() palette: Palette = [];
  @Input() size = 10;

  get canvas() {
    return <HTMLCanvasElement>this.elementRef.nativeElement;
  }

  get context() {
    return this.canvas.getContext('2d');
  }

  get totalCols() {
    return this.pixels.reduce((max, row) => Math.max(max, row.length), 0);
  }

  get totalRows() {
    return this.pixels.length;
  }

  get width() {
    return this.canvas.width;
  }
  set width(value) {
    this.canvas.width = value;
  }

  get height() {
    return this.canvas.height;
  }
  set height(value) {
    this.canvas.height = value;
  }

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.init();
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.pixels && !changes.pixels.isFirstChange()) ||
      (changes.size && !changes.size.isFirstChange())
    ) {
      this.clear();
      this.init();
      this.render();
    }
  }

  init(): void {
    this.height = this.totalRows * this.size;
    this.width = this.totalCols * this.size;
  }

  render(): void {
    const start = Date.now();

    // TODO - Only render differences
    for (let row = 0, rowLen = this.pixels.length; row < rowLen; row++) {
      for (let col = 0, colLen = this.pixels[row].length; col < colLen; col++) {
        const pixel = this.pixels[row][col];
        this.draw(col, row, pixel);
      }
    }

    const end = Date.now();
    const diff = end - start;
    console.log(`Rendered in ${diff}ms`);
  }

  clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw(x: number, y: number, pixel: number) {
    const pos = { x: x * this.size, y: y * this.size };
    this.context.fillStyle = this.palette[pixel];
    this.context.fillRect(pos.x, pos.y, this.size, this.size);
  }
}
