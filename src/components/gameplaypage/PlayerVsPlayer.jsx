import Board from "../Board";
import {NavButton,FunctionButton} from "../Buttons";

import { putDownPiece, checkWinning,avalibleMoves } from "../GameLogic"
import { useState } from "react";
import ShowText from "../ShowText";
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

function PlayerVsPlayer(props){
    

    const [turnState,setTurn]=useState({
    isBlackTurn:true
  });
      const [gameState,setGame]=useState({
        isEnded:false,
        winner:null
      })
      const [moveState,setMove]=useState({
        moveMade:[]
      })
    function handleMoveClick(clickedIntersectionCoord){
      
      let turn=turnState.isBlackTurn?"B":"W";
      let isMoveMade;
      let winner;

      let avaMoves;
      let numMoveLeft;

      isMoveMade = putDownPiece(clickedIntersectionCoord,turn,boardArrangement);
      if (isMoveMade){
        // console.log("move score: "+moveEvaluation(clickedIntersectionCoord,turn,0.9,boardArrangement).score)
        avaMoves=avalibleMoves(boardArrangement);
        numMoveLeft=avaMoves.length;
        winner =checkWinning(turn,clickedIntersectionCoord,boardArrangement);
        if (winner!==null){
          setGame({
            isEnded:true,
            winner:winner
          })
        } else if(numMoveLeft===0){
          setGame({
            isEnded:true,
            winner:"D"
          })
        }
        
        // console.log(moveState.moveMade)
        setMove({moveMade:clickedIntersectionCoord})
        setTurn({isBlackTurn:turnState.isBlackTurn?false:true});
      } 
    }

    function getWinningDeclaration(whowin){
        if (whowin==="B"){
            return ("Black piece win !")
        } else if(whowin==="W" ){
            return ("White piece win !")
        } else if (whowin==="D" ){
            return ("Game Draw")
        }
    }

    function resetBoard(board){
        let rowIndex,colIndex;
        for (rowIndex=0;rowIndex<board.length;rowIndex++){
          for (colIndex=0;colIndex<board[rowIndex].length;colIndex++){
            if(board[rowIndex][colIndex]!==" "){
                board[rowIndex][colIndex]=" "
            }
          }
                   
        }
    }

    function resetGame(board){
        resetBoard(board)
        setTurn({isBlackTurn:true})
        setGame({isEnded:false, winner:null})
        setMove({moveMade:[]})
    }

    function returnHome(board){
      props.onClickHome();
      resetGame(board)
    }


    // console.log(gameState.isEnded)
    // console.log(gameState.winner)
    // console.log(boardArrangement1vs1)
    return(
        <div>
        <div className="rows">
        <NavButton text="Home" onClick={()=>{
                returnHome(boardArrangement)
            }}/>

            <h1>Player 1 VS Player 2</h1>
        </div>
        

        <div className="gameScreen">

                <div className="gameboard">        
                    <Board
                        boardArrangement={boardArrangement}
                        onClick={gameState.isEnded?
                                    null:
                                    ([rowNum,colNum])=>handleMoveClick([rowNum,colNum])}
                        moveMade={moveState.moveMade}
                        />
                </div>
                <div className="des">
                
                    <FunctionButton text="reset" onClick={()=>resetGame(boardArrangement)}/>
                    {
                    gameState.isEnded?
                    <ShowText textColour="textRed"
                        condition={gameState.isEnded}
                        textIfTrue={getWinningDeclaration(gameState.winner)}
                        textIfFalse=""
                     />:
                   <ShowText textColour="textBlack"
                        condition={turnState.isBlackTurn}
                        textIfTrue="Turn: Black"
                        textIfFalse="Turn: White"
                    />
                    }
                    <ShowText textColour="textBlack"
                        condition={true}
                        textIfTrue="Black Piece: Player 1"
                        textIfFalse=""
                    />
                       <ShowText textColour="textBlack"
                        condition={true}
                        textIfTrue="white Piece: Player 2"
                        textIfFalse=""
                    />                  
                </div>

        </div>
        </div>
    )
}

export default PlayerVsPlayer;