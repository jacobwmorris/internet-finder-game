
export function timeToString(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const secondsStr = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
  return minutes.toString() + ":" + secondsStr;
}
