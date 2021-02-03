import React from 'react';
import { Header, Footer } from '../components';

function Retry({ appData, name, difficulty, setAppData }) {

  const playAgain = () => {
    setAppData((prevValue) => {
      return {
        ...prevValue,
        pageIndex: 1,
        nameError: '',
        selectError: '',
        gameInput: '',
      }
    });
  }

  const showScore = () => {
    if (appData.score) {
      const secondsElapsed = Number(appData.score).toFixed(2);
      const secondsToConvert = Math.floor(secondsElapsed);
      const milliSeconds = Math.floor((secondsElapsed - secondsToConvert) * 100);
      const minutes = Math.floor(secondsToConvert / 60);
      const seconds = secondsToConvert % 60;
      return `${minutes} : ${seconds}.${milliSeconds}`;
    }
    return `00 : 00.00`;
  }

  return (
    <div className="Thanks" style={{ display: appData.pageIndex === 2 ? "block" : "none" }}>
      <Header userName={name} difficulty={difficulty} />
      <div className="thanksBody">
        <h1 className="finalGame">Score : Game {appData.gameScores ? appData.gameScores.length : 0}</h1>
        <p className="finalScore">{appData.score ? showScore() : 0}</p>
        <p className="highScore">{"New High Score"}</p>
        <p className="playAgain" onClick={playAgain}>Play Again</p>
      </div>
      <Footer leftButton="quit" />
    </div>
  )
}

export default Retry;