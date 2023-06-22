import "./styles/StatusBar.css";
import checkMark from "./icons/check.svg";

function StatusBar({characters, time}) {
  const charactersRendered = Object.entries(characters).map(([name, val]) => {
    return (
      <li key={name} className={"StatusBar-checklist-item" + (val.found ? " StatusBar-found" : "")}>
        {val.found ? <img className="StatusBar-checkmark" src={checkMark}/> : null}
        {name}
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
  console.log(minutes, seconds);
  return minutes.toString() + ":" + seconds.toString();
}

export default StatusBar;