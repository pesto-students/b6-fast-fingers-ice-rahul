import React, { useReducer } from "react";
import { Logo, InputText, SelectText, DropDownList } from "../components";
import { navigate } from 'hookrouter';

function updateState(state, action) {
  switch (action.type) {
    case 'name': return {
      ...state,
      name: action.value,
      error: action.value !== '' ? '' : state.error
    }
    case 'difficulty': return {
      ...state,
      'difficulty': action.value
    }
    case 'error': return {
      ...state,
      error: action.value
    }
    default: return {
      name: '',
      difficulty: '',
      error: ''
    }
  }
}

function Home() {
  const [{ name, difficulty, error }, dispatch] = useReducer(updateState, { difficulty: 'EASY' });
  const startGame = () => {
    if (name && difficulty) {
      navigate(`/play/${name}/${difficulty}`);
    } else {
      dispatch({ type: 'error', value: 'Name cannot be left blank' });
    }
  };

  return (
    <div className="App" >
      <Logo />

      <InputText
        placeholder="Type Your Name"
        onChange={(playerName) => dispatch({ type: 'name', value: playerName })}
        error={error}
      />

      <SelectText
        placeholder="Difficulty Level"
        list={DropDownList}
        onChange={(gameDifficulty) => dispatch({ type: 'difficulty', value: gameDifficulty })}
      />

      <div className="startGame" onClick={startGame}>
        START GAME
      </div>

    </div>
  );
}

export default Home;
