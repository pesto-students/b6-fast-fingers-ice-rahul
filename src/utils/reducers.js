import { DropDownList } from '../components';

function handleState(state, action) {
  switch (action.type) {
    case 'name': return {
      ...state,
      name: action.value
    }
    case 'email': return {
      ...state,
      email: action.value
    }
    case 'password': return {
      ...state,
      password: action.value
    }
    case 'loading': return {
      ...state,
      loading: action.value
    }
    case 'page': return {
      ...state,
      page: action.value
    }
    case 'error': return {
      ...state,
      msg: action.value,
      msgType: 'err'
    }
    case 'success': return {
      ...state,
      msg: action.value,
      msgType: 'success'
    }
    case 'difficulty': return {
      ...state,
      difficulty: action.value
    }
    case 'updateLevel': return {
      ...state,
      level: action.value
    }
    case 'updateScore': return {
      ...state,
      score: action.value
    }
    default: return {
      ...state,
      name: '',
      email: '',
      password: '',
      difficulty: ''
    }
  }
}

function handleTextInput(state, val) {
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

function handleSelectInput(state, selectedVal) {
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

function handleGame(state, action) {
  switch (action.type) {
    case 'difficulty':
      const difficultyConfig = DropDownList.filter((val) => val.level === action.value)[0];
      const wordBookKey = state.wordBook[action.value] ? action.value : Object.keys(state.wordBook)[0];
      const generatedWord = state.wordBook[wordBookKey][Math.floor(Math.random() * state.wordBook[wordBookKey].length)].word;
      const difficultyFactor = state.difficultyFactor ? state.difficultyFactor + 0.01 : difficultyConfig.difficultyFactor;
      const allowedTime = Number(generatedWord.length / difficultyFactor).toFixed(2);

      return {
        ...state,
        word: generatedWord,
        difficultyFactor: difficultyFactor,
        seconds: allowedTime,
        wordBook: state.wordBook
      };
    case 'inputWord':
      return {
        ...state,
        typedWord: action.value,
        reset: action.value !== '' ? false : true
      }
    case 'placeholder':
      return {
        ...state,
        placeholder: action.value,
      }  
    case 'wordBook':
      return {
        ...state,
        wordBook: { ...state.wordBook, ...action.value }
      }
    default:
      return { ...state }
  }
}

export {
  handleState,
  handleTextInput,
  handleSelectInput,
  handleGame
}