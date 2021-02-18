import React from 'react';
import { PlayerIcon, GamePadIcon } from '../../components';
import './Header.css';

function Header({ playerName, difficulty, score }) {
    const gameScore = score ? score : localStorage.getItem("gamescore");
    return (
        <>
            <div className="headerRow">
                <div className="sectionHalf">
                    <div className="sectionRow">
                        <PlayerIcon className="playerIcon" />
                        <p className="iconTitle">{playerName ? playerName : ''}</p>
                    </div>
                    <div className="sectionRow">
                        <GamePadIcon className="playerIcon" />
                        <p className="iconTitle">{difficulty ? `LEVEL : ${difficulty}` : ''}</p>
                    </div>
                </div>
                <div className="sectionHalf alignRight">
                    <div className="sectionRow">
                        <span className="titleHeader">fast fingers</span>
                    </div>
                    <div className="sectionRow">
                        <p className="scoreTitle">SCORE : {  Number(gameScore).toFixed(2)  }</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;