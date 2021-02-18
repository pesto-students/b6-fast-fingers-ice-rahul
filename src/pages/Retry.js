import { navigate } from 'hookrouter';
import React from 'react';
import { Header, Footer } from '../components';

function Retry({ playerName, difficulty }) {

  const score = localStorage.getItem("gamescore");
  const scoreBoard = localStorage.getItem("scores") != null ? JSON.parse(localStorage.getItem("scores")) : [];

  const playAgain = () => {
    navigate(`/play/${playerName}/${difficulty}`);
  }

  const showScore = () => {
    if (score) {
      const secondsElapsed = Number(score).toFixed(2);
      const secondsToConvert = Math.floor(secondsElapsed);
      const milliSeconds = Math.floor((secondsElapsed - secondsToConvert) * 100);
      const minutes = Math.floor(secondsToConvert / 60);
      const seconds = secondsToConvert % 60;
      return `${minutes} : ${seconds}.${milliSeconds}`;
    }
    return `00 : 00.00`;
  }

  return (
    <div className="Thanks">
      <Header playerName={playerName} difficulty={difficulty} />
      <div className="thanksBody">
        <h1 className="finalGame">Score : Game {scoreBoard ? scoreBoard.length : 0}</h1>
        <p className="finalScore">{score ? showScore() : 0}</p>
        <p className="highScore">{"New High Score"}</p>
        <p className="playAgain" onClick={playAgain}>Play Again</p>
      </div>
      <Footer leftButton="quit" />
    </div>
  )
}

export default Retry;