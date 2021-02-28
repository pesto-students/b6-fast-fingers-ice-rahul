import React, { useReducer } from 'react';
import { handleSelectInput } from '../../utils/reducers';
import './SelectText.css';

function SelectText({ placeholder, list, onChange }) {

  const [{ visible, label }, dispatch] = useReducer(handleSelectInput, { visible: "none", label: placeholder });
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
      onChange(selectedVal === placeholder ? 'EASY' : selectedVal);
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