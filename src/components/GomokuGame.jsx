// jshint esversion:6
import React, { useState } from "react";
import Board from "./Board";
import {putDownPiece,checkWinning} from "./GameLogic";
import HomePage from "./HomePage";
import PlayerVsPlayer from "./gameplaypage/PlayerVsPlayer";
import PlayerVsAIChoice from "./ChoicePage/PlayerVsAIChoice"
import AIVsAIChoice from "./ChoicePage/AIVsAIChoice"
import SimulationChoice from "./ChoicePage/SimulationChoice"

function GomokuGame (){

  const [homePageState,setHomeState]=useState({
    showPage:true,
    modeClicked:null
  })
  function handleModeClick(mode){
    // console.log(mode)
      setHomeState({showPage:homePageState.showPage?false:null,
                     modeClicked:mode      
                    })
  }

  function handleHomeButtonClick(){
        setHomeState({showPage:homePageState.showPage?null:true})
  }



if(homePageState.showPage===false){
  // console.log(homePageState.showPage)
  // console.log(homePageState.modeClicked)

    //playerVSplayer game page
  if(homePageState.modeClicked==="PvsP"){    
    return (
      <div>
        <PlayerVsPlayer onClickHome={()=>handleHomeButtonClick()} />
      </div>
    )
  }

  //playerVScomputer game setting page
   else if(homePageState.modeClicked==="PvsAI"){
    return (
    <div>
    <PlayerVsAIChoice onClickHome={()=>handleHomeButtonClick()} />
  </div>
    )

      //computerVScomputer game setting page
   } else if (homePageState.modeClicked==="AIvsAI"){
    return (
    <div>
    <AIVsAIChoice onClickHome={()=>handleHomeButtonClick()} />
  </div>
    )

      //simulation setting page
   } else if (homePageState.modeClicked==="Simulation"){
    return (
    <div>
    <SimulationChoice onClickHome={()=>handleHomeButtonClick()} />
  </div>
    )
   }

   //Home page
} else{
  return (
    <HomePage onClick={(mode)=>handleModeClick(mode)}/>
  )
}



}

export default GomokuGame;
