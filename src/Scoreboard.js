import {useState, useEffect} from "react";
import {getScoreboard, postScore} from "./Database";
import {timeToString} from "./Helpers";
import "./styles/Scoreboard.css";

const scoreboardLength = 10;

function Scoreboard({show, time, handleReset}) {
  const [scores, setScores] = useState("loading");
  const [yourScore, setYourScore] = useState(null);

  useEffect(() => {
    if (!show) {return;}
    let ignore = false;

    getScoreboard(scoreboardLength).then((scoreboard) => {
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

  const {place, isHighscore} = getPlace(time, scores, scoreboardLength);

  function handleNewScore(e) {
    e.preventDefault();
    const playerName = e.target.elements.playername.value;
    postScore(playerName, time)
    .then(() => getScoreboard(10))
    .then((scoreboard) => {
      setScores(scoreboard);
      setYourScore(place);
    })
    .catch((error) => {
      setScores("failed");
      console.error(error);
    });
  }

  function handlePlayAgain(e) {
    setYourScore(null);
    handleReset();
  }

  return (
    <div className="Scoreboard">
      <div className="Scoreboard-box">
        <h1>Scoreboard</h1>
        <ScoreTable scores={scores} yourScore={yourScore}/>
        <ScoreForm show={yourScore === null} place={place} isHighscore={isHighscore} handleNewScore={handleNewScore}/>
        <button className="Scoreboard-button" onClick={handlePlayAgain}>Play again</button>
      </div>
    </div>
  );
}

function getPlace(time, scores, maxPlace) {
  let place = 1;
  let isHighscore = false;
  if (!Array.isArray(scores)) {return {place: null, isHighscore};}

  for (const s of scores) {
    if (time < s.time) {
      isHighscore = true;
      break;
    }
    place++;
  }

  if (place <= maxPlace) {
    isHighscore = true;
  }

  return {place, isHighscore};
}

function ScoreTable({scores, yourScore}) {
  if (Array.isArray(scores)) {
    const scoresRendered = scores.map((s, i) => {
      let rowClass = "";
      if (yourScore !== null && yourScore === i + 1) {
        rowClass += "Scoreboard-yourscore";
      }
      return (
        <tr className={rowClass} key={s.id}>
          <td>{s.player}</td>
          <td>{timeToString(s.time)}</td>
        </tr>
      );
    });

    return (
      <div className="Scoreboard-tablebox">
        <table className="Scoreboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {scoresRendered}
          </tbody>
        </table>
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

function ScoreForm({show, place, isHighscore, handleNewScore}) {
  if (!show || !isHighscore) {
    return null;
  }

  return (
    <div>
      <h3>Congratulations! You got {addSuffix(place)} place.</h3>
      <form onSubmit={handleNewScore}>
        <label htmlFor="playername">Enter your name here to post your time:</label>
        <div class="Scoreboard-namefield">
          <input type="text" id="playername" name="playername" maxLength="30"/>
          <button className="Scoreboard-button Scoreboard-formbutton">Submit</button>
        </div>
      </form>
    </div>
  );
}

function addSuffix(num) {
  switch (num) {
    case 1:
      return parseInt(num) + "st";
    case 2:
      return parseInt(num) + "nd";
    case 3:
      return parseInt(num) + "rd";
    default:
      return parseInt(num) + "th";
  }
}

export default Scoreboard;
