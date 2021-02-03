import React, { useContext } from 'react';
import { CrossIcon, HomeIcon, AppContext } from '../../components';
import './Footer.css';

function Footer({ leftButton }) {

    const [appData, setAppData] = useContext(AppContext);

    const goToHome = () => {
        setAppData((prevValue) => {
            return {
                ...prevValue,
                pageIndex: 0
            }
        });
    }

    const stopGame = () => {
        let currentScore = {};
        let gameScores = [];
        currentScore.score = appData.score;
        if (appData.gameScores) {
            gameScores = appData.gameScores;
        }
        gameScores.push(currentScore);
        setAppData((prevValue) => {
            return {
                ...prevValue,
                "gameScores": gameScores,
                "pageIndex": 2
            }
        });
    }

    const quitGame = () => {
        let gameScores = [];
        setAppData((prevValue) => {
            return {
                ...prevValue,
                gameScores: gameScores,
                pageIndex: 0,
                userName: ""
            }
        });
    }

    return (
        <div className="footerRow">
            <div className="footerSections" style={{ display: leftButton && leftButton === "quit" ? "none" : "inline-block" }}>
                <CrossIcon className="crossIcon" />
                <p className="closeGame" onClick={stopGame}>STOP GAME</p>
            </div>
            <div className="footerSections" style={{ display: leftButton && leftButton === "quit" ? "inline-block" : "none", "lineHeight": "3.4em" }}>
                <p className="closeGame" onClick={quitGame}>Quit</p>
            </div>
            <div className="footerSections footerAlignRight">
                <HomeIcon className="crossIcon" onClick={goToHome} />
            </div>
        </div>
    );
}

export default Footer;