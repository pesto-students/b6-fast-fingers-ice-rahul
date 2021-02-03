import React, { useState, createContext } from 'react';
import { DropDownList as DifficultyList, Dictionary } from '../../components';

export const AppContext = createContext();

export const StateProvider = (props) => {

    const defaultDifficulty = "EASY";
    const difficultyConfig = DifficultyList.filter((config) => config.level === defaultDifficulty)[0];
    let filteredList = [];
    filteredList = Dictionary.filter((word) => word.length >= difficultyConfig.minWord && word.length <= difficultyConfig.maxWord);

    const [appData, setAppData] = useState({
        pageIndex: 0,
        difficulty: defaultDifficulty,
        [difficultyConfig.level]: filteredList,
        currentDifficultyFactor: difficultyConfig.difficultyFactor
    });

    return (
        <AppContext.Provider value={[appData, setAppData]}>
            { props.children}
        </AppContext.Provider>
    );
}
