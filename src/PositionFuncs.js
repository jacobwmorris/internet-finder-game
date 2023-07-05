
function numToCss(num) {
  return num.toString() + "px";
}
  
function clickToPosition(clickEvent) {
  const elementX = clickEvent.target.offsetLeft;
  const elementY = clickEvent.target.offsetTop;
  return {
    x: clickEvent.pageX - elementX,
    y: clickEvent.pageY - elementY
  };
}

export {numToCss, clickToPosition};
