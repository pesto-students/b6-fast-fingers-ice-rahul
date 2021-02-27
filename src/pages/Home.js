import React, { useReducer, useEffect, useState } from "react";
import { Logo, InputText, SelectText, DropDownList, PlayIcon, Logout } from "../components";
import { navigate } from 'hookrouter';
import { userDetailsUrl } from '../utils/constants';

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

function useAuthentication(dispatch) {
  const [placeholder, setPlaceholder] = useState('Searching your name ...');
  useEffect(() => {
    const url = userDetailsUrl.url;
    fetch(url, {
      method: userDetailsUrl.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'token': localStorage.getItem('refreshToken')
      }
    })
    .then((res) => res.json())
    .then((res) => {
      setPlaceholder(res.name);
      localStorage.setItem('accessToken',JSON.stringify(res.accessToken));
      dispatch({ type: 'name', value: res.name })
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    });
  },[dispatch]);

  return {
    placeholder: placeholder
  }
}

function Home() {
  const [{ name, difficulty, error }, dispatch] = useReducer(updateState, { difficulty: 'EASY' });
  const { placeholder } = useAuthentication(dispatch);
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
        placeholder={placeholder}
        onChange={(playerName) => dispatch({ type: 'name', value: playerName })}
        error={error}
        disabled
      />

      <SelectText
        placeholder="Difficulty Level"
        list={DropDownList}
        onChange={(gameDifficulty) => dispatch({ type: 'difficulty', value: gameDifficulty })}
      />

      <div className="startGame" onClick={startGame}>
        <PlayIcon /> START GAME
      </div>
      <Logout type="logout" />

    </div>
  );
}

export default Home;
