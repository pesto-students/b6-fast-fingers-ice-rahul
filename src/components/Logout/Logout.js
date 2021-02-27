import React from 'react';
import { logOutURL } from '../../utils/constants';
import { navigate } from 'hookrouter';

function Logout({ type }){

  function logout(){
    const url = logOutURL.url;
    fetch(url, {
      method: logOutURL.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'token': localStorage.getItem('refreshToken')
      }
    })
    .then((res) => res.json())
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
    <div className={type} onClick={logout}>
      Logout
    </div>
  );
}

export default Logout;