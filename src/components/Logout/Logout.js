import React from 'react';
import { CONFIG } from '../../utils/constants';
import { navigate } from 'hookrouter';
import { callApiWithAuth } from '../../utils/functions';

function Logout({ type }){

  function handleLogout(){
    callApiWithAuth(CONFIG.LOGOUT)
    .then((res) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    })
    .catch((err) => {
      console.log(err)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    });
  }

  return (
    <div className={type} onClick={handleLogout}>
      Logout
    </div>
  );
}

export default Logout;