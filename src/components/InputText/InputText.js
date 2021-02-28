import React, { useReducer, useEffect } from 'react';
import { handleTextInput } from '../../utils/reducers';
import './InputText.css';

function InputText({ reset, type, placeholder, onChange, error: inputError, disabled }) {
  const [{ data, error }, dispatch] = useReducer(handleTextInput, '');

  useEffect(() => {
    if (reset && reset === true) {
      dispatch('');
    }
  }, [reset])

  const handleChange = (value) => {
    dispatch(value);
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <>
      <div className="inputText">
        <input
          type={type ? type : 'text'}
          value={data ? data : ''}
          onChange={(val) => handleChange(val.target.value)}
          placeholder={placeholder ? placeholder : "Enter Text"}
          disabled={disabled ? disabled : false}
        />
      </div>
      {
        reset ? '' : <p className="error">{inputError ? inputError : error ? `${error}` : ''}</p>
      }
    </>
  );

}

export default InputText;