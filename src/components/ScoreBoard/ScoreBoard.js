import React, { useContext } from 'react';
import { AppContext } from '../../components';
import './ScoreBoard.css';

function ScoreBoard(){
    const [appData, ] = useContext(AppContext);
    const scores = appData.gameScores ? appData.gameScores : [];
    return (
        <div className="scoreBoardContainer">
            <p className="scoreBoardTitle">SCORE BOARD</p>
            {
                scores.map((gameScore, idx) => {
                    return (
                        <p className="scores" key={`G-${idx}`}>Game { idx + 1 } : { Number(gameScore.score).toFixed(2) }</p>
                    );
                })
            }
        </div>
    );
}

export default ScoreBoard;