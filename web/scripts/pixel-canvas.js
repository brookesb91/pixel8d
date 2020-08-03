class PixelCanvas extends HTMLCanvasElement {
  /**
   * @returns {string[]} Observed attributes
   */
  static get observedAttributes() {
    return ['palette', 'pixels', 'size'];
  }

  get _context() {
    return this.getContext('2d');
  }

  /**
   * @returns {Array<number[]>} Pixel definitions
   */
  get pixels() {
    return this._getJSONAttribute('pixels');
  }

  /**
   * @returns {string[]} Colour palette
   */
  get palette() {
    return this._getJSONAttribute('palette');
  }

  get size() {
    return parseInt(this.getAttribute('size'));
  }

  get cols() {
    return this.pixels.reduce((max, row) => Math.max(max, row.length), 0);
  }

  get rows() {
    return this.pixels.length;
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!!oldVal && oldVal !== newVal) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.init();

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const pixel = this.pixels[row][col];
        this._drawPixel(pixel, col, row);
      }
    }
  }

  clear() {
    this._context.clearRect(0, 0, this.width, this.height);
  }

  init() {
    this.clear();
    this.height = this.rows * this.size;
    this.width = this.cols * this.size;
  }

  _drawPixel(pixel, x, y) {
    const posX = x * this.size;
    const posY = y * this.size;

    this._context.fillStyle = this.palette[pixel];
    this._context.fillRect(posX, posY, this.size, this.size);
  }

  /**
   * Parse and return a JSON data attribute
   * @private
   * @param {string} name Attribute name
   */
  _getJSONAttribute(name) {
    return JSON.parse(this.getAttribute(name));
  }
}

customElements.define('pixel-canvas', PixelCanvas, {
  extends: 'canvas'
});