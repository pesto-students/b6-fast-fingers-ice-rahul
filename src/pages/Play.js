import React, { useReducer } from 'react'
import { Header, Game, Footer, ScoreBoard } from '../components';

function handleState(state, action){
  if (action.type === 'updateLevel') {
    return {
      ...state,
      level: action.value
    }
  }
  if (action.type === 'updateScore') {
    return {
      ...state,
      score: action.value
    }
  }
  return {...state}
}

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
    </div>
  )
}

export default Play;