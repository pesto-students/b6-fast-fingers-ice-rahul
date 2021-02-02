import React, { useState, createContext } from 'react';
import { DropDownList, Dictionary } from '../../components';

export const AppContext = createContext();

export const StateProvider = (props) => {

    const selectedVal = "EASY";
    const difficultyConfig = DropDownList.filter((val) => val.level === selectedVal )[0];
    let filteredList = [];
    filteredList = Dictionary.filter((val) => val.length >= difficultyConfig.minWord && val.length <= difficultyConfig.maxWord);

    const [appData, setAppData] = useState({
        pageIndex: 0, 
        difficulty: selectedVal,
        [difficultyConfig.level]: filteredList
    });
    
    return (
        <AppContext.Provider value={[appData, setAppData]}>
            { props.children }
        </AppContext.Provider>
    );
}
