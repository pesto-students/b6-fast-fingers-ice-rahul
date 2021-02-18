import React, { useReducer } from 'react';
import './SelectText.css';

function handleInput(state, selectedVal){
    if (selectedVal !== "") {
        return {
            ...state,
            visible: state.visible === "none" ? "block" : "none",
            label: selectedVal
        }
    }
    return {
        ...state,
        visible: state.visible === "none" ? "block" : "none",
    }
}

function SelectText({placeholder, list, onChange}) {

    const [{ visible, label }, dispatch] = useReducer(handleInput, {visible: "none", label: placeholder});
    const dropDownList = list ? list : [];

    const getSelectedValue = (action) => {
        const isParent = action.innerHTML.includes("selectChild");
        const isAnyTags = action.innerHTML.includes("<");
        return isParent || isAnyTags ? "" : action.innerHTML;
    }

    const handleSelect = (event) => {
        const selectedVal = getSelectedValue(event.target);
        dispatch(selectedVal);
        if (onChange) {
            onChange(selectedVal===placeholder ? 'EASY' : selectedVal);
        }
    }

    return (
        <div className="selectText" onClick={handleSelect}>
            <div className="selectBox">
                <span>{label}</span>
                <div className="selectChild" style={{ display: visible }}>
                    {
                        dropDownList.map((val, idx) => {
                            return (<p key={idx}>{val.level}</p>);
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SelectText;