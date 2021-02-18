import React from 'react';
import './ScoreBoard.css';

function ScoreBoard() {
    const scores = localStorage.getItem('scores') != null ? JSON.parse(localStorage.getItem('scores')) : [];

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