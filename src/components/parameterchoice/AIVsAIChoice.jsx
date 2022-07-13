import React, { useState } from "react";
import { RadioButtons, NavButton } from "../Buttons";
import ComputerVsComputer from "../gameplaypage/ComputerVsComputer";

function AIVsAIChoice(props) {
  let players = ["Computer 1", "Computer 2"];
  let AIalgorithms = ["Random", "Minimax", "Genetic"];
  let defaultBlack = players[0];
  let defaultAlgorithms = AIalgorithms[0];
  const [gameSetting, changeSetting] = useState({
    whoGoFirst: defaultBlack,
    computer1: defaultAlgorithms,
    computer2: defaultAlgorithms,
  });

  const [gameState, setState] = useState({
    isStarted: false,
  });

//   console.log(gameSetting.whoGoFirst)
// console.log(gameState.isStarted)
  if (gameState.isStarted) {
    return (
        <ComputerVsComputer onClickHome={()=>{
             props.onClickHome();
             
        }}
        settings={gameSetting}
        />
    )
    
  } else {
    return (
      <div>
        <NavButton
          text="Home"
          onClick={() => {
            props.onClickHome();
          }}
        />

{/* <RadioButtons 
        groupName="Who Plays First" 
        values={players}
        defaultValue={gameSetting.whoGoFirst} 
        changeSetting={(who)=>{
            changeSetting({
                whoGoFirst:who,
                computer1:gameSetting.computer1,
                computer2:gameSetting.computer2
            })
        }}
        /> */}
        <RadioButtons
          groupName="Computer 1"
          values={AIalgorithms}
          defaultValue={gameSetting.computer1}
          changeSetting={(AI)=>{
            changeSetting({
                whoGoFirst:gameSetting.whoGoFirst,
                computer1:AI,
                computer2:gameSetting.computer2
            })
        }}
        />
            <RadioButtons
          groupName="Computer 2"
          values={AIalgorithms}
          defaultValue={gameSetting.computer2}
          changeSetting={(AI)=>{
            changeSetting({
                whoGoFirst:gameSetting.whoGoFirst,
                computer1:gameSetting.computer1,
                computer2:AI,
            })
        }}
        />
        
        <NavButton
          text="Next"
          onClick={() => {
            setState({
              isStarted: true,
            });
          }}
          
        />
      </div>
    );
  }
}

export default AIVsAIChoice;
