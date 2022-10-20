/* return pixel color in hex */
export default function getColorFromCanvas(canvas, coord) {
  const context = canvas.getContext('2d');
  const imageData = context.getImageData(coord.x, coord.y, 1, 1);
  const rgbColor = imageData.data; // rgb color
  let hex = 0;

  // unpainted area on canvas (white color)
  if (!rgbColor[0] && !rgbColor[1] && !rgbColor[2] && !rgbColor[3]) {
    return '#ffffff';
  }

  hex = rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);

  return hex;

  function componentToHex(c) {
    hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  function rgbToHex(r, g, b) {
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
  }
}
