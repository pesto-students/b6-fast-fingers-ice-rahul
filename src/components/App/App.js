import React, { useContext } from 'react';
import { InputText, SelectText, Header, AppContext, DropDownList, Footer } from '../../components';
import Game from '../Game/Game';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import './App.css';
 const Logo = React.lazy(()=> import ('../Logo/Logo'));

function App() {

  const [appData, setAppData] = useContext(AppContext);
  const name = "userName";
  const difficulty = "difficulty";
  const startGame = () => {
    if(appData[name] && appData[difficulty]) {
      setAppData((prevValue) => {
        return {
            ...prevValue,
            pageIndex:1,
            nameError: '',
            selectError: ''
        }
      });
    } else if (!appData[name]) {
      setAppData((prevValue) => {
        return {
            ...prevValue,
            nameError: 'Please Enter Your Name To Start The Game',
            selectError : ''
        }
      });
    } else if (!appData[difficulty]) {
      setAppData((prevValue) => {
        return {
            ...prevValue,
            nameError: '',
            selectError: 'Please Select A Difficulty Level To Start The Game'
        }
      });
    }
  }

  const showScore = () => {
    const secondsElapsed =  Number(appData.gameScores[appData.gameScores.length-1].score).toFixed(2);
    const secondsToConvert = Math.floor(secondsElapsed);
    const milliSeconds = Math.floor((secondsElapsed - secondsToConvert) * 100);
    const minutes = Math.floor(secondsToConvert/60);
    const seconds = secondsToConvert%60;
    return `${minutes} : ${seconds}.${milliSeconds}`;
  }

  return (
    <>
      <div className="App" style={{ display:appData.pageIndex===0 ? "block" : "none" }}>
        <Logo/>
        <InputText name={name} placeholder="Type Your Name"/>
        <SelectText name={difficulty} placeholder="Difficulty Level" list={DropDownList} />
        <div className="startGame" onClick={startGame}>
            START GAME
        </div>
      </div>
      
      <div className="Game" style={{ display:appData.pageIndex===1 ? "block" : "none" }}>
        <Header userName={name} difficulty={difficulty}/>
        <div className="gameBody">
          <ScoreBoard />
          <Game />
        </div>
        <Footer />
      </div>

      <div className="Thanks" style={{ display:appData.pageIndex===2 ? "block" : "none" }}>
        <Header userName={name} difficulty={difficulty}/>
        <div className="thanksBody">
          <h1 className="finalGame">Score : Game { appData.gameScores ? appData.gameScores.length : 0 }</h1>
          <p className="finalScore">{ appData.gameScores ? showScore() : 0 }</p>
        </div>
        <Footer />
      </div>

    </>
  );
}

export default App;
