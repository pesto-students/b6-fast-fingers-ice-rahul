import React, { useReducer } from 'react'
import { Header, Game, Footer, ScoreBoard, Logout } from '../components';
import { handleState } from '../utils/reducers';

function Play({ playerName, difficulty }) {
  const [{level, score}, dispatch] = useReducer(handleState, {level: difficulty, score:0})
  return (
    <div className="Game">
      <Header playerName={decodeURIComponent(playerName)} difficulty={level} score={score}/>
      <div className="gameBody">
        <ScoreBoard />
        <Game 
          level={level} 
          onLevelChange={(changedLevel) => dispatch({type: 'updateLevel', value: changedLevel})} 
          onScoreChange={(currentScore) => dispatch({type: 'updateScore', value: currentScore})}
        />
      </div>
      <Footer leftButton="stop" />    
      <Logout type="logout-center" />
    </div>
  )
}

export default Play;