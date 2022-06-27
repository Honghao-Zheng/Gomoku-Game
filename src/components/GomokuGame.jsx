// jshint esversion:6
import React, { useState } from "react";
import Board from "./Board";
import {putDownPiece,checkWinning} from "./GameLogic";


let boardArrangement=[
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]

];




function GomokuGame (){

  const [gameState,setSate]=useState({
    isBlackTurn:true
  });

    function handleMoveClick(clickedIntersectionCoord){
      
      let turn=gameState.isBlackTurn?"B":"W";
      let rowCoord, colCoord;
      let moveMade;
      let whoWin;
      [rowCoord,colCoord]=clickedIntersectionCoord;
      moveMade = putDownPiece(clickedIntersectionCoord,turn,boardArrangement);
      if (moveMade){
        whoWin =checkWinning(turn,rowCoord,colCoord,boardArrangement);
        if (whoWin==="B"){
          alert("black piece win")
        } else if(whoWin==="W"){
          alert("white piece win")
        }
        setSate({isBlackTurn:gameState.isBlackTurn?false:true});
      } 

    }
    return (
      <div >
        <div className="game row">
   
            <Board
            boardArrangement={boardArrangement}
            onClick={([rowNum,colNum])=>handleMoveClick([rowNum,colNum])}
            
            />
        </div>
        

      </div>

    );

}

export default GomokuGame;
