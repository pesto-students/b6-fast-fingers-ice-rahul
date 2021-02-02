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
    </>
  );
}

export default App;
