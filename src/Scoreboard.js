import {useState, useEffect} from "react";
import {getScoreboard} from "./Database";
import {timeToString} from "./Helpers";

function Scoreboard({show, time}) {
  const [scores, setScores] = useState("loading");

  useEffect(() => {
    if (!show) {return;}
    let ignore = false;

    getScoreboard(10).then((scoreboard) => {
      if (ignore) {return;}
      setScores(scoreboard)
    },
    (error) => {
      if (ignore) {return;}
      setScores("failed");
      console.error(error);
    });

    return () => {ignore = true;};
  }, [setScores, show]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <div>
        <h1>Scoreboard</h1>
        {renderScores(scores)}
      </div>
    </div>
  );
}

function renderScores(scores) {
  if (Array.isArray(scores)) {
    const scoresRendered = scores.map((s) => {
      return (
        <tr key={s.id}>
          <td>{s.player}</td>
          <td>{timeToString(s.time)}</td>
        </tr>
      );
    });
    console.log("Rendering scoreboard");
    return (
      <div>
        <table>{scoresRendered}</table>
      </div>
    );
  }
  else if (scores === "failed") {
    return (
      <div>
        <h2>Can't access scoreboard.</h2>
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>Downloading high scores...</h2>
      </div>
    );
  }
}

export default Scoreboard;
