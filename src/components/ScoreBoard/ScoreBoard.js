import React, {useEffect, useState} from 'react';
import { navigate } from 'hookrouter';
import { getScoreBoardURL } from '../../utils/constants';
import './ScoreBoard.css';

function useScores() {
    const [scores, setScores] = useState([]);
    useEffect(() => {
      const url = getScoreBoardURL.url;
      fetch(url, {
        method: getScoreBoardURL.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'token': localStorage.getItem('refreshToken')
        }
      })
      .then((res) => res.json())
      .then((res) => {
        setScores(res.result);
        localStorage.setItem('accessToken',JSON.stringify(res.accessToken));
      })
      .catch((err) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      });
    },[]);
  
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

    return (
        <div className="scoreBoardContainer">
            <p className="scoreBoardTitle">SCORE BOARD</p>
            {
                scores.map((gameScore, idx) => {
                    return (
                        <p className="scores" key={`G-${idx}`}>Game { idx + 1} : { showScore(gameScore.score)}</p>
                    );
                })
            }
        </div>
    );
}

export default ScoreBoard;