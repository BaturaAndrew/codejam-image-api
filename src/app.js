import './style.css';
import State from './State';
import Canvas from './Canvas';
import getColorFromCanvas from './getColor';
import {
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
} from './constants';


let currСolor = 'green';
let prevСolor = 'yellow';
let currentTool = '';

const controlState = new State(canvasEl);
controlState.loadState(); // from localStorage
rangeEl.value = controlState.state.dimension;
currentTool = controlState.state.tool;
refreshColor(controlState.state.currСolor, controlState.state.prevСolor);

const controlCanvas = new Canvas(canvasEl, currСolor);
controlCanvas.dimension = controlState.state.dimension;
controlCanvas.setScale();
controlCanvas.addListeners();

// PANEL
/**
 * events that are triggered when you click on the block of choosing TOOLS
 * */

// load saved tool
document.addEventListener('DOMContentLoaded', () => {
  switch (currentTool) {
    case 'pencil':
      setAction('pencil', pencilCur, pencilEl);
      break;
    case 'paintBucket':
      setAction('paintBucket', bucketCur, paintBucketEl);
      break;
    case 'colorPicker':
      setAction('colorPicker', colorPickerCur, colorPickerEl);
      break;
    default:
      break;
  }
});

paintBucketEl.addEventListener('click', () => {
  setAction('paintBucket', bucketCur, paintBucketEl);
  controlState.saveTool('paintBucket');
});

colorPickerEl.addEventListener('click', () => {
  setAction('colorPicker', colorPickerCur, colorPickerEl);
  controlState.saveTool('colorPicker');
});

pencilEl.addEventListener('click', () => {
  setAction('pencil', pencilCur, pencilEl);
  controlState.saveTool('pencil');
});


function setAction(tool, cursor, toolEl) {
  clearToolState(palleteEl);
  currentTool = tool;
  controlCanvas.currentTool = tool;
  document.body.style.cursor = cursor; // change cursor type
  toolEl.classList.add('active');
}


buttonLoadEl.addEventListener('click', () => {
  const town = getQuery();

  // save canvas inside async function because wait picture is loaded
  controlCanvas.drawImage(town, controlState);

  function getQuery() {
    const elem = document.querySelector('.input__search');
    return elem.value;
  }
});

buttonClearEl.addEventListener('click', () => {
  const context = controlCanvas.canvas.getContext('2d');
  context.clearRect(0, 0, 512, 512);
  controlState.saveCanvas(controlCanvas.dimension);
});

// change dimension -> scale -> refresh canvas -> save dimension
rangeEl.addEventListener('change', () => {
  if (['32', '64', '128', '256', '512'].find(item => item === rangeEl.value)) {
    controlCanvas.dimension = +rangeEl.value;
    controlCanvas.drawResizedImage(controlState.state.img);
    controlState.saveDimension(controlCanvas.dimension);
  }
});


canvasEl.addEventListener('mousedown', (e) => {
  if (currentTool === 'colorPicker') {
    const coord = Canvas.getCoord(e, controlCanvas.canvas, controlCanvas.scale);
    refreshColor(getColorFromCanvas(controlCanvas.canvas,
      coord, controlCanvas.dimension));
  }
});

// PANEL COLOR SELECTION
/**
 *  events that are triggered when you click on the block of choosing COLORS
 * */
colorsEl.addEventListener('click', (e) => {
  clearToolState(colorsEl);
  if (e.target === currColorEl) {
    refreshColor(currСolor);
  }
  if (e.target === prevColorEl) {
    refreshColor(prevСolor);
  }
  if (e.target === redColorEl) {
    refreshColor('red');
  }
  if (e.target === blueColorEl) {
    refreshColor('blue');
  }
  e.target.classList.toggle('active');
  // when you click on color palette do the standard cursor and the default action
  resetAction();

  controlCanvas.currСolor = currСolor;
});

// just reset the color choices
function resetAction() {
  if (currentTool === 'colorPicker') {
    currentTool = '';
    document.body.style.cursor = '';
  }
}


// COLOR PICKER
colorPickerInputEl.addEventListener('input', (e) => {
  refreshColor(e.target.value);
}, false);


// HOTKEYS
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 83 && e.altKey) { // save using letters Alt + S
    controlState.saveStateApp([currСolor, prevСolor]);
  }
  if (e.keyCode === 66) { // paint using a letter B
    setAction('paintBucket', bucketCur, paintBucketEl);
  }
  if (e.keyCode === 67) { // C
    setAction('colorPicker', colorPickerCur, colorPickerEl);
  }
  if (e.keyCode === 80) { // P
    setAction('pencil', pencilCur, pencilEl);
  }
  if (e.keyCode === 27) { // Esc
    currentTool = '';
    document.body.style.cursor = '';
  }
});


// SAVE IN LOCALSTORE
saveStateButtonEl.addEventListener('click', () => {
  controlState.saveStateApp([currСolor, prevСolor]);
});


function clearToolState(panelBox) {
  let childs = panelBox.children;
  childs = Array.prototype.slice.call(childs);
  childs.map((elem) => {
    elem.classList.remove('active');
  });
}

function refreshColor(crColor, prColor) {
  // change color if it is not same with current color
  if (crColor !== currСolor) {
    prevСolor = (prColor) || currСolor;
    currСolor = crColor;
    currColorEl.childNodes[1].style.backgroundColor = currСolor;
    prevColorEl.childNodes[1].style.backgroundColor = prevСolor;
  }
}
