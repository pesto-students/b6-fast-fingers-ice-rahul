import React from "react";
import { Logo, InputText, SelectText, DropDownList } from "../components";

function Home({ name, difficulty, appData, setAppData }) {
  const startGame = () => {
    if (appData[name] && appData[difficulty]) {
      setAppData((prevValue) => {
        return {
          ...prevValue,
          pageIndex: 1,
          nameError: "",
          selectError: "",
          gameInput: "",
        };
      });
    } else if (!appData[name]) {
      setAppData((prevValue) => {
        return {
          ...prevValue,
          nameError: "Please Enter Your Name To Start The Game",
          selectError: "",
        };
      });
    } else if (!appData[difficulty]) {
      setAppData((prevValue) => {
        return {
          ...prevValue,
          nameError: "",
          selectError: "Please Select A Difficulty Level To Start The Game",
        };
      });
    }
  };

  return (
    <div
      className="App"
      style={{ display: appData.pageIndex === 0 ? "block" : "none" }}
    >
      <Logo />
      <InputText name={name} placeholder="Type Your Name" />
      <SelectText
        name={difficulty}
        placeholder="Difficulty Level"
        list={DropDownList}
      />
      <div className="startGame" onClick={startGame}>
        START GAME
      </div>
    </div>
  );
}

export default Home;
