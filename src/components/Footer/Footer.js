import React, { useContext } from 'react';
import { CrossIcon, HomeIcon, AppContext } from '../../components';
import './Footer.css';

function Footer() {

    const [, setAppData] = useContext(AppContext);

    const goToHome = () => {
        setAppData((prevValue) => {
            return {
                ...prevValue,
                pageIndex:0
            }
        });
    }

    return (
        <div className="footerRow">
            <div className="footerSections">
                <CrossIcon className="crossIcon"/>
                <p className="closeGame">STOP GAME</p>
            </div>
            <div className="footerSections footerAlignRight">
                <HomeIcon className="crossIcon" onClick={goToHome}/>
            </div>
        </div>
    );
}

export default Footer;