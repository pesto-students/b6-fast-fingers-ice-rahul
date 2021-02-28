import React, { useReducer, useEffect, useState } from "react";
import { Logo, InputText, SelectText, DropDownList, PlayIcon, Logout } from "../components";
import { navigate } from 'hookrouter';
import { userDetailsUrl } from '../utils/constants';
import { handleState } from '../utils/reducers';
import { callApiWithAuth } from '../utils/functions';

function useAuthentication(dispatch) {
  const [placeholder, setPlaceholder] = useState('Searching your name ...');
  useEffect(() => {
    callApiWithAuth(userDetailsUrl)
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
  const [{ name, difficulty }, dispatch] = useReducer(handleState, { difficulty: 'EASY' });
  const { placeholder } = useAuthentication(dispatch);
  const startGame = () => {
    if (name && difficulty) {
      navigate(`/play/${name}/${difficulty}`);
    } else {
      alert('Name cannot be left blank');
    }
  };

  return (
    <div className="App" >
      <Logo />

      <InputText
        placeholder={placeholder}
        onChange={(playerName) => dispatch({ type: 'name', value: playerName })}
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
