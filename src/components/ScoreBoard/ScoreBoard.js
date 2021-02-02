import React, { useContext } from 'react';
import { AppContext } from '../../components';
import './ScoreBoard.css';

function ScoreBoard(){
    const [appData, ] = useContext(AppContext);
    const scores = appData.scores ? appData.scores : [];
    return (
        <div className="scoreBoardContainer">
            <p className="scoreBoardTitle">SCORE BOARD</p>
            {
                scores.map((score, idx) => {
                    return (
                        <p className="scores">Game { idx + 1 } : { score }</p>
                    );
                })
            }
        </div>
    );
}

export default ScoreBoard;