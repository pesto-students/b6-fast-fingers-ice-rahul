import React, { useReducer, useEffect } from 'react';
import './InputText.css';

function handleInput(state, val) {
    if (val === '') {
        return {
            ...state,
            data: val,
            error: 'Error: Input cannot be left blank'
        }
    }
    return {
        ...state,
        data: val,
        error: ''
    }
}

function InputText({ reset, type, placeholder, onChange, error: inputError, disabled }) {
    const [{ data, error }, dispatch] = useReducer(handleInput, '');

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