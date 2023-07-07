
export function numToCss(num) {
  return Math.floor(num).toString() + "px";
}
  
export function clickToPosition(clickEvent) {
  const elementX = clickEvent.target.offsetLeft;
  const elementY = clickEvent.target.offsetTop;
  return {
    x: clickEvent.pageX - elementX,
    y: clickEvent.pageY - elementY
  };
}

export function positionToPercent(pos, width, height) {
  return {
    x: pos.x / width,
    y: pos.y / height
  };
}

export function percentToPosition(pos, width, height) {
  return {
    x: pos.x * width,
    y: pos.y * height
  };
}

export function subtract(pos1, pos2) {
  return {x: pos1.x - pos2.x, y: pos1.y - pos2.y};
}
