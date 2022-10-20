import getColorFromCanvas from './getColor';

const canvasWidth = 512;
export default class Canvas {
  // public
  canvas;

  currentTool;

  currСolor;

  dimension = 512

  // private
  _scale = 1;

  _context;

  constructor(canvas, currСolor) {
    this.canvas = canvas;
    this._context = this.canvas.getContext('2d');
    this.currСolor = currСolor;
  }

  get scale() {
    return this._scale;
  }

  setScale() {
    this._scale = Canvas.canvasWidth / this.dimension;
  }

  get context() {
    return this._context;
  }

  addListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
      //  1) paint bucket
      if (this.currentTool === 'paintBucket') {
        this.fillClosedArea(e);
      }

      //  2) pencil
      if (this.currentTool === 'pencil') {
        this.drawWithPencil(e);
      }
    });
  }


  drawWithPencil(event) {
    let draw = true;
    // when mousedown -> draw one pixel
    let prevCoord = this.drawPixel(event, this.canvas);

    this.canvas.addEventListener('mousemove', (e) => {
      if (draw === true) {
        const currCoord = Canvas.getCoord(e, this.canvas, this.scale);
        // when mousemove -> draw a lot of pixels
        // during  mousemove occurs spaces, so  drawLineByBresenham and reassign prevCoord
        this.drawLineByBresenham(prevCoord.x, prevCoord.y,
          currCoord.x, currCoord.y, this.currСolor);
        prevCoord = currCoord;
      }
    });

    this.canvas.addEventListener('mouseup', () => {
      draw = false;
    });
  }

  // draw one pixel
  drawPixel(e) {
    const currCoord = Canvas.getCoord(e, this.canvas, this.scale);
    this._context.fillStyle = this.currСolor;
    this._context.fillRect(currCoord.x, currCoord.y, 1, 1);

    return currCoord;
  }


  fillClosedArea(event) {
    const currCoord = Canvas.getCoord(event, this.canvas, this.scale);
    const firstColor = getColorFromCanvas(this.canvas, currCoord, this.dimension);

    this._context.fillStyle = this.currСolor;

    const pixelsToCheck = [currCoord.x, currCoord.y];

    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop();
      const x = pixelsToCheck.pop();

      const coord = {
        x,
        y,
      };

      const pixelColor = getColorFromCanvas(this.canvas, coord, this.dimension);
      if (x >= 0 && x < this.dimension && y >= 0 && y < this.dimension
        && pixelColor === firstColor) {
        this._context.fillRect(x, y, 1, 1);
        pixelsToCheck.push(x + 1, y);
        pixelsToCheck.push(x - 1, y);
        pixelsToCheck.push(x, y + 1);
        pixelsToCheck.push(x, y - 1);
      }
    }
  }

  drawResizedImage(src) {
    this.canvas.width = this.dimension;
    this.canvas.height = this.dimension;
    this.setScale();

    const img = new Image();

    img.src = src;
    img.onload = () => {
      this._context.drawImage(img, 0, 0, this.dimension, this.dimension);
    };
  }


  async drawImage(city, controlState) {
    const url = `https://api.unsplash.com/photos/random?query=town,${city}&client_id=50d7bd83f3a08efadf521f264f3fed834b2a7523aaff9997e2ba7c9e640ed2cc`;
    const request = await fetch(url)
      .then(res => res.json())
      .then(data => data);

    const {
      width,
      height,
    } = request;

    const dim = this.dimension;
    const scaleWidth = (width < height) ? width * dim / height : dim;
    const scaleHeight = (height < width) ? height * dim / width : dim;
    const offSetX = (scaleWidth < dim) ? (dim - scaleWidth) / 2 : 0;
    const offSetY = (scaleHeight < dim) ? (dim - scaleHeight) / 2 : 0;
    const pic = new Image();

    this._context.imageSmoothingEnabled = false;
    this._context.clearRect(0, 0, 512, 512);

    pic.src = request.urls.small;

    // Its allows images defined by the <img> element that are loaded from foreign origins
    // to be used in a < canvas > as if they had been loaded from the current origin
    pic.crossOrigin = 'Anonymous';

    pic.onload = () => {
      this._context.drawImage(pic, offSetX, offSetY, scaleWidth, scaleHeight);
      controlState.saveCanvas(this.dimension);
    };
  }

  static getCoord(event, canvas, scale) {
    const coord1 = {
      x: 0,
      y: 0,
    };
    coord1.x = (event.pageX - canvas.offsetLeft - 16);
    coord1.y = (event.pageY - canvas.offsetTop - 16);
    coord1.x = Math.floor(coord1.x / scale);
    coord1.y = Math.floor(coord1.y / scale);

    return coord1;
  }

  drawLineByBresenham(x0, y0, currX, currY, Сolor) {
    const dx = Math.abs(currX - x0);
    const dy = Math.abs(currY - y0);
    const sx = (x0 < currX) ? 1 : -1;
    const sy = (y0 < currY) ? 1 : -1;
    let err = dx - dy;

    let prevX = x0; // reassign in loop
    let prevY = y0;


    while ((prevX !== currX) || (prevY !== currY)) {
      this.context.fillStyle = Сolor;
      this.context.fillRect(prevX, prevY, 1, 1);

      const e2 = 2 * err;

      if (e2 > -dy) {
        err -= dy;
        prevX += sx;
      }

      if (e2 < dx) {
        err += dx;
        prevY += sy;
      }
    }
  }

  // CONSTANTS
  static get canvasWidth() {
    return canvasWidth;
  }
}
