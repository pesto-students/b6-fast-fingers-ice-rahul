import React, { useContext, useRef } from 'react';
import { Timer, InputText, AppContext, DropDownList } from '../../components';
import './Game.css'

function Game() {
    const [appData, setAppData] = useContext(AppContext);
    const difficultyConfig = DropDownList.filter((val) => val.level === appData.difficulty )[0];
    let wordChallenge = useRef(appData[difficultyConfig.level][0]);

    const getRandomValue = () => {
        const randomNumber = Math.random() * appData[difficultyConfig.level].length;
        const index = Math.floor(randomNumber);
        wordChallenge.current.innerHTML = (appData[difficultyConfig.level][index]);
    }

    return (
        <div className="gameContainer">
            <Timer />
            <div className="wordChallenge" ref={wordChallenge}>
                { appData[difficultyConfig.level][0] }
            </div>
            <InputText name="gameInput" placeholder="Type The Word Here"/>
        </div>
    );

}

export default Game;