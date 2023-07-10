import "./styles/StatusBar.css";
import checkMark from "./images/check.svg";

function StatusBar({characters, time}) {
  const charactersRendered = characters.map((c) => {
    return (
      <li key={c.name} className={"StatusBar-checklist-item" + (c.found ? " StatusBar-found" : "")}>
        {c.found ? <img className="StatusBar-checkmark" src={checkMark}/> : null}
        {c.name}
      </li>
    )
  });

  return (
    <div className="StatusBar">
      <ul className="StatusBar-checklist">
        Checklist:
        {charactersRendered}
      </ul>
      <div className="StatusBar-right">
        Time:
        <span className="StatusBar-time">{timeToString(time)}</span>
        <button>Restart game</button>
      </div>
    </div>
  );
}

function timeToString(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const secondsStr = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
  return minutes.toString() + ":" + secondsStr;
}

export default StatusBar;