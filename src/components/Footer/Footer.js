import { navigate, usePath } from 'hookrouter';
import React from 'react';
import { CrossIcon, HomeIcon } from '../../components';
import { CONFIG } from '../../utils/constants';
import { callApiWithAuth } from '../../utils/functions';
import './Footer.css';

function Footer({ leftButton }) {
  const path = usePath();
  const goToHome = () => {
    navigate('/');
  }

  const stopGame = () => {
    navigate(`/retry/${path.split('/')[2]}/${path.split('/')[3]}`);
  }

  const quitGame = () => {
    callApiWithAuth(CONFIG.QUIT)
    .then((res) => {
      localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
      navigate('/');
    })
    .catch((err) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    });
  }

  return (
    <div className="footerRow">
      <div className="footerSections" style={{ display: leftButton && leftButton === "quit" ? "none" : "inline-block" }}>
        <CrossIcon className="crossIcon" />
        <p className="closeGame" onClick={stopGame}>STOP GAME</p>
      </div>
      <div className="footerSections" style={{ display: leftButton && leftButton === "quit" ? "inline-block" : "none", "lineHeight": "3.4em" }}>
        <p className="closeGame" onClick={quitGame}>Quit</p>
      </div>
      <div className="footerSections footerAlignRight">
        <HomeIcon className="crossIcon" onClick={goToHome} />
      </div>
    </div>
  );
}

export default Footer;