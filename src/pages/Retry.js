import { navigate } from 'hookrouter';
import React ,{ useState, useEffect } from 'react';
import { Header, Footer, Logout } from '../components';
import { addScoreURL } from '../utils/constants';
import { callApiWithAuth } from '../utils/functions';

function useAddScores(score) {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    callApiWithAuth(addScoreURL, {score: score})
    .then((res) => {
      setScores(res.result);
      localStorage.setItem('accessToken',JSON.stringify(res.accessToken));
    })
    .catch((err) => {
      console.log(err)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    });
  },[score]);

  return {
      scores: scores
  }
}

function Retry({ playerName, difficulty }) {
  const score = localStorage.getItem("gamescore");
  const { scores:scoreBoard } = useAddScores(score);

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

  function isHighest() {
    const scoreList = scoreBoard.map((val) => val.score);
    if(Math.max(...scoreList).toFixed(2) === Number(score).toFixed(2)) {
      return true;
    }
    return false
  }

  return (
    <div className="Thanks">
      <Header playerName={decodeURIComponent(playerName)} difficulty={difficulty} />
      <div className="thanksBody">
        <h1 className="finalGame">Score : Game {scoreBoard ? scoreBoard.length : 0}</h1>
        <p className="finalScore">{score ? showScore() : 0}</p>
        <p className="highScore">{ isHighest() ? "New High Score" : ''}</p>
        <p className="playAgain" onClick={playAgain}>Play Again</p>
      </div>
      <Footer leftButton="quit" />
      <Logout type="logout-center" />
    </div>
  )
}

export default Retry;