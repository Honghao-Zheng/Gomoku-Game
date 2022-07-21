import React, { useState } from "react";
import { RadioButtons, NavButton } from "../Buttons";
import PlayerVsComputer from "../gameplaypage/PlayerVsComputer";

function PlayerVsAIChoice(props) {
  let players = ["Player", "Computer"];
  let AIalgorithms = ["Random", "Minimax", "MinimaxBad","Genetic","GeneticBad"];
  let defaultBlack = players[0];
  let defaultAlgorithms = AIalgorithms[0];
  const [gameSetting, changeSetting] = useState({
    whoGoFirst: defaultBlack,
    computer: defaultAlgorithms,
  });

  const [gameState, setState] = useState({
    isStarted: false,
  });

//   console.log(gameSetting.whoGoFirst)
// console.log(gameState.isStarted)
  if (gameState.isStarted) {
    return (
        <PlayerVsComputer onClickHome={()=>{
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

        <RadioButtons 
        groupName="Who Plays First" 
        values={players}
        defaultValue={gameSetting.whoGoFirst} 
        changeSetting={(who)=>{
            changeSetting({
                whoGoFirst:who,
                computer:gameSetting.computer
            })
        }}
        />
        <RadioButtons
          groupName="Choose the AI algorithms"
          values={AIalgorithms}
          defaultValue={gameSetting.computer}
          changeSetting={(AI)=>{
            changeSetting({
                whoGoFirst:gameSetting.whoGoFirst,
                computer:AI
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

export default PlayerVsAIChoice;
