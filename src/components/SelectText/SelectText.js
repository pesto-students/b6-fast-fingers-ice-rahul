import React, { useState, useContext } from 'react';
import { AppContext, DropDownList, Dictionary } from '../../components';
import './SelectText.css';

function SelectText(props) {

    const [appData, setAppData] = useContext(AppContext);
    const [visible, setVisibility] = useState("none");
    const [placeholder, setPlaceholder] = useState(props.placeholder);

    const dropDownList = props.list ? props.list : [];

    const clickSelect = (event) => {
        let dropDownState = visible === "none" ? "block" : "none";
        setVisibility(dropDownState);
        const isParent = event.target.innerHTML.includes("selectChild");
        const isAnyTags = event.target.innerHTML.includes("<");
        let selectedVal = isParent || isAnyTags ? "" : event.target.innerHTML;
        if (selectedVal !== "" && selectedVal !== placeholder) {
            setPlaceholder(selectedVal);
            const difficultyConfig = DropDownList.filter((val) => val.level === selectedVal)[0];
            let filteredList = [];
            if (appData[difficultyConfig.level]) {
                filteredList = appData[difficultyConfig.level];
            } else {
                filteredList = Dictionary.filter((val) => val.length >= difficultyConfig.minWord && val.length <= difficultyConfig.maxWord);
            }
            setAppData((prevValue) => {
                return {
                    ...prevValue,
                    [props.name]: selectedVal,
                    [difficultyConfig.level]: filteredList,
                    currentDifficultyFactor: difficultyConfig.difficultyFactor
                }
            });
        }
    }

    return (
        <div className="selectText" onClick={clickSelect}>
            <div className="selectBox">
                <span>{placeholder}</span>
                <div className="selectChild" style={{ display: visible }}>
                    {
                        dropDownList.map((val, idx) => {
                            return (<p key={idx}>{val.level}</p>);
                        })
                    }
                </div>
            </div>
            <p className="error">{appData.selectError ? `Error: ${appData.selectError}` : ''}</p>
        </div>
    );
}

export default SelectText;