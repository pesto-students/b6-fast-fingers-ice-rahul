import React, { useEffect, useState } from 'react';
import { navigate } from 'hookrouter';
import { CONFIG } from '../../utils/constants';
import { callApiWithAuth } from '../../utils/functions';
import './ScoreBoard.css';

function useScores() {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    callApiWithAuth(CONFIG.SCOREBOARD)
      .then((res) => {
        setScores(res.result);
        localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
      })
      .catch((err) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      });
  }, []);

  return {
    scores: scores
  }
}

function ScoreBoard() {
  const { scores } = useScores();
  const showScore = (score) => {
    const secondsElapsed = Number(score).toFixed(2);
    const secondsToConvert = Math.floor(secondsElapsed);
    const milliSeconds = Math.floor((secondsElapsed - secondsToConvert) * 100);
    const minutes = Math.floor(secondsToConvert / 60);
    const seconds = secondsToConvert % 60;
    return `${minutes} : ${seconds}.${milliSeconds}`;
  }

  function isBest(score) {
    const scoreList = scores.map((val) => val.score);
    if (Math.max(...scoreList).toFixed(2) === Number(score).toFixed(2)) {
      return true;
    }
    return false
  }

  return (
    <div className="scoreBoardContainer">
      <p className="scoreBoardTitle">SCORE BOARD</p>
      {
        scores.map((gameScore, idx) => {
          return (
            <>
              <p className="scores" key={`G-${idx}`}>
                Game {idx + 1} : {showScore(gameScore.score)}
                <br />
                {isBest(gameScore.score) ? <span style={{color: 'red', fontWeight: 'bold'}}>Personal Best</span> : ''}
              </p>
            </>
          );
        })
      }
    </div>
  );
}

export default ScoreBoard;