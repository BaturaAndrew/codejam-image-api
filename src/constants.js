// icons for cursors
const bucketCur = 'url(assets/images/fill-drip-solid.png) 20 20, auto';
const colorPickerCur = 'url(assets/images/eye-dropper-solid.png) -20 23, auto';
const pencilCur = 'url(assets/images/pencil-alt-solid.png) -20 23, auto';

// blocks
const palleteEl = document.querySelector('.pallete');
const colorsEl = document.querySelector('.colors');
const canvasEl = document.getElementById('canvas');
const buttonLoadEl = document.querySelector('.load');
const buttonClearEl = document.querySelector('.clear');
const rangeEl = document.querySelector('.range__input');

// tools
const paintBucketEl = document.querySelector('.paintBucket');
const colorPickerEl = document.querySelector('.colorPicker');
const pencilEl = document.querySelector('.pencil');
const saveStateButtonEl = document.querySelector('.save-state');

//  colors
const currColorEl = document.querySelector('.curr-color__item');
const prevColorEl = document.querySelector('.prev-color__item');
const redColorEl = document.querySelector('.red-color__item');
const blueColorEl = document.querySelector('.blue-color__item');

// input type='color'
const colorPickerInputEl = document.querySelector('.color');

module.exports = {
  bucketCur,
  colorPickerCur,
  pencilCur,
  palleteEl,
  colorsEl,
  buttonLoadEl,
  buttonClearEl,
  canvasEl,
  rangeEl,
  paintBucketEl,
  colorPickerEl,
  pencilEl,
  saveStateButtonEl,
  currColorEl,
  prevColorEl,
  redColorEl,
  blueColorEl,
  colorPickerInputEl,
};
