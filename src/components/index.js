import App from './App/App';
import { AppContext, StateProvider } from './Context/AppContext';
import { ReactComponent as CrossIcon } from '../assets/images/icons/cross-icon.svg';
import Dictionary from '../assets/data/dictionary.json';
import DropDownList from './SelectText/SelectText.json';
import Footer from './Footer/Footer';
import Game from './Game/Game';
import { ReactComponent as GamePadIcon } from '../assets/images/icons/gamepad-icon.svg';
import Header from './Header/Header';
import { ReactComponent as HomeIcon } from '../assets/images/icons/home-icon.svg';
import InputText from './InputText/InputText';
import { ReactComponent as KeyboardIcon } from '../assets/images/icons/keyboard-icon.svg';
import Logo from './Logo/Logo';
import { ReactComponent as PlayerIcon } from '../assets/images/icons/person-icon.svg';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import SelectText from './SelectText/SelectText';
import Timer from './Timer/Timer';

export {
    App,
    AppContext,
    CrossIcon,
    Dictionary,
    DropDownList,
    Footer,
    Game,
    GamePadIcon,
    Header,
    HomeIcon,
    InputText,
    KeyboardIcon,
    Logo,
    PlayerIcon,
    ScoreBoard,
    SelectText,
    StateProvider,
    Timer
};