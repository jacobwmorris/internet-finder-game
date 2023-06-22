
function StatusBar({characters, time}) {
  const charactersRendered = Object.entries(characters).map(([name, val]) => {
    return (
      <li key={name} className={"StatusBar-checklist-item" + (val.found ? " StatusBar-found" : "")}>
        {val.found ? <div className="StatusBar-checkmark"></div> : null}
        {name}
      </li>
    )
  });

  return (
    <div>
      <ul>
        {charactersRendered}
      </ul>
      <div>
        Time:
        <span>{timeToString(time)}</span>
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