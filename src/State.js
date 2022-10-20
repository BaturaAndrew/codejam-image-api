export default class State {
  constructor(canvas) {
    this.canvas = canvas;
    this.state = this.initialState();
  }

  saveStateApp(colors) {
    // save state of colors
    [this.state.currСolor, this.state.prevСolor] = colors;

    this.state.img = this.canvas.toDataURL();

    localStorage.setItem('state', JSON.stringify(this.state));
  }

  // just change dinemtion - eg: 512 -> 128
  saveDimension(dimension) {
    this.state.dimension = dimension;
    localStorage.setItem('state', JSON.stringify(this.state));
    return true;
  }

  saveCanvas(dimension) {
    this.state.dimension = dimension;
    this.state.img = this.canvas.toDataURL();
    localStorage.setItem('state', JSON.stringify(this.state));
    return true;
  }

  saveTool(tool) {
    this.state.tool = tool;
    localStorage.setItem('state', JSON.stringify(this.state));
    return true;
  }


  loadState() {
    this.state = JSON.parse(localStorage.getItem('state'));
    if (this.state) {
      this.applySavedState();
    } else {
      this.initialState();
    }
  }

  initialState() {
    this.state = {
      currСolor: 'green',
      prevСolor: '',
    };
    this.state.img = '';
    this.state.dimension = 512;
    this.state.tool = 'pencil';
    return this.state;
  }

  applySavedState() {
    const img = new Image();
    img.src = this.state.img;
    const context = this.canvas.getContext('2d');
    this.canvas.width = this.state.dimension;
    this.canvas.height = this.state.dimension;
    img.onload = () => {
      context.drawImage(img, 0, 0,
        this.state.dimension,
        this.state.dimension);
    };
  }
}
