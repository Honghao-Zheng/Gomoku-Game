

import Board from "../Board";
import {NavButton,FunctionButton} from "../Buttons";
import chooseRandomMove from "../AIplayers/RandomPlayer"
import { putDownPiece, checkWinning } from "../GameLogic"
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

function PlayerVsComputer(props){
    let whoPlaysFirst=props.settings.whoGoFirst;
    let AIalgorithm=props.settings.computer;    

    const [turnState,setTurn]=useState({
    isBlackTurn:true
  });
      const [gameState,setGame]=useState({
        isStarted:false,
        isEnded:false,
        winner:null
      })
      const [moveState,setMove]=useState({
        moveMade:[]
      })



    function AImakeMove(AI,turn,board){
        let computerMove;
        if(AI==="Random"){
            computerMove=chooseRandomMove(board)
        } else if(AI==="Minimax") {
        } else if(AI==="Greedy"){
        }
        putDownPiece(computerMove,turn,board)
        return computerMove
    } 
    function handleMoveClick(clickedIntersectionCoord){
      
      let turn=turnState.isBlackTurn?"B":"W";
      let isMoveMade;
      let whoWin;

      isMoveMade = putDownPiece(clickedIntersectionCoord,turn,boardArrangement);
      if (isMoveMade){
        whoWin =checkWinning(turn,clickedIntersectionCoord,boardArrangement);
        if (whoWin!==null){
          setGame({
            isStarted:gameState.isStarted,
            isEnded:true,
            winner:whoWin
          })
        }; 
        // console.log(moveState.moveMade)
        // setTurn({isBlackTurn:turnState.isBlackTurn?false:true});
        if(turn==="B"){
            turn="W"
        }else{
            turn="B"
        }
      let moveMade=AImakeMove(AIalgorithm,turn,boardArrangement)
      whoWin =checkWinning(turn,moveMade,boardArrangement);
      if (whoWin!==null){
        setGame({
            isStarted:gameState.isStarted,
          isEnded:true,
          winner:whoWin
        })
      }; 
      setMove({moveMade:moveMade})
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
        setGame({isStarted:false, isEnded:false, winner:null})
        setMove({moveMade:[]})
    }

    function returnHome(board){
      props.onClickHome();
      resetGame(board)
    }

    function startGame(whoPlaysFirst){
        if(whoPlaysFirst!=="Player 1"){          
            let moveMade=AImakeMove(AIalgorithm,"B",boardArrangement)
            // console.log(moveMade)
            setMove({moveMade:moveMade});
            setTurn({isBlackTurn:turnState.isBlackTurn?false:true});    

        }
        setGame({
            isStarted:true,isEnded:false,winner:null
        })
    }

    function isGamePlayEnabled(){
        if(!gameState.isEnded && gameState.isStarted){
            return true
        } else {
            return false
        }
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

            <h1>Player 1 VS Computer</h1>
        </div>
        

        <div className="gameScreen">

                <div className="gameboard">        
                    <Board
                        boardArrangement={boardArrangement}
                        onClick={isGamePlayEnabled()?
                            ([rowNum,colNum])=>handleMoveClick([rowNum,colNum]):
                                    null}
                        moveMade={moveState.moveMade}
                        />
                </div>
                <div className="des">
                
                    {gameState.isStarted?
                    <FunctionButton text="reset" onClick={()=>resetGame(boardArrangement)}/>:
                    <FunctionButton text="start" onClick={()=>{
                        startGame(whoPlaysFirst)
                    }} />
                    }
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
                        condition={whoPlaysFirst==="Player 1"}
                        textIfTrue="Black Piece: Player 1"
                        textIfFalse="Black Piece: Computer"
                    />
                       <ShowText textColour="textBlack"
                        condition={whoPlaysFirst!=="Player 1"}
                        textIfTrue="White Piece: Player 1"
                        textIfFalse="White Piece: Computer"
                    />                  
                </div>

        </div>
        </div>
    )
}

export default PlayerVsComputer;