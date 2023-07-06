
function numToCss(num) {
  return Math.floor(num).toString() + "px";
}
  
function clickToPosition(clickEvent) {
  const elementX = clickEvent.target.offsetLeft;
  const elementY = clickEvent.target.offsetTop;
  return {
    x: clickEvent.pageX - elementX,
    y: clickEvent.pageY - elementY
  };
}

function positionToPercent(pos, width, height) {
  return {
    x: pos.x / width,
    y: pos.y / height
  };
}

function distance(pos1, pos2) {
  const a = pos1.x - pos2.x;
  const b = pos1.y - pos2.y;
  return Math.sqrt(a * a + b * b);
}

export {numToCss, clickToPosition, positionToPercent, distance};
