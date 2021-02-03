import React from 'react';
import { KeyboardIcon } from '../../components';
import './Logo.css';

function Logo() {
    return (
        <>
            <KeyboardIcon className="logo" />
            <p className="logoTitle">fast fingers</p>
            <p className="strikedText">the ultimate typing game</p>
        </>
    );
}

export default Logo;