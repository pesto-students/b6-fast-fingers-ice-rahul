import React, { useContext } from 'react';
import { AppContext } from '../../components';
import './InputText.css';

function InputText({ placeholder, name }) {
    const [appData, setAppData] = useContext(AppContext);

    const setText = (event) => {
        let value = event.target.value;
        setAppData((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }
    return (
        <div className="inputText">
            <input type="text" value={appData[name] ? appData[name] : ''} onChange={setText} placeholder={placeholder ? placeholder : "Enter Text"} />
            <p className="error">{appData.nameError ? `Error: ${appData.nameError}` : ''}</p>
        </div>
    );

}

export default InputText;