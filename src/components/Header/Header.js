import React, { useContext } from 'react';
import { AppContext, PlayerIcon, GamePadIcon } from '../../components';
import './Header.css';

function Header({ userName, difficulty }) {

    const [appData,] = useContext(AppContext);

    return (
        <>
            <div className="headerRow">
                <div className="sectionHalf">
                    <div className="sectionRow">
                        <PlayerIcon className="playerIcon" />
                        <p className="iconTitle">{appData[userName] ? appData[userName] : ''}</p>
                    </div>
                    <div className="sectionRow">
                        <GamePadIcon className="playerIcon" />
                        <p className="iconTitle">{appData[difficulty] ? `LEVEL : ${appData[difficulty]}` : ''}</p>
                    </div>
                </div>
                <div className="sectionHalf alignRight">
                    <div className="sectionRow">
                        <span className="titleHeader">fast fingers</span>
                    </div>
                    <div className="sectionRow">
                        <p className="scoreTitle">SCORE : {Number(appData.score).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;