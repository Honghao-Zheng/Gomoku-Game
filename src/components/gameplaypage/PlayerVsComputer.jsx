

import Board from "../Board";
import {NavButton,FunctionButton} from "../Buttons";
import chooseRandomMove from "../AIplayers/RandomPlayer"
import { putDownPiece, checkWinning,avalibleMoves } from "../GameLogic";
import { useState } from "react";
import ShowText from "../ShowText";
import {GAmove,GAModifiedMove} from "../AIplayers/GA/GAalgorithm";
import {initdrawCheckBoard} from "../SharedData";
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
//   let boardArrangement=drawCheckBoard();
let depth=10;
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
    //   const [depth,setDepth]=useState({
    //     num:5
    //   })
    



    function AImakeMove(AI,turn,board){
        let computerMove;
        if(AI==="Random"){
            computerMove=chooseRandomMove(board)
        } else if(AI==="Minimax") {
        } else if(AI==="Genetic"){
            computerMove=GAmove(depth,turn,board)
        }
        else if(AI==="GeneticModified"){
            computerMove=GAModifiedMove(depth,turn,board)
        }
        putDownPiece(computerMove,turn,board)
        return computerMove
    } 
    function handleMoveClick(clickedIntersectionCoord){
      
      let turn=turnState.isBlackTurn?"B":"W";
      let isMoveMade;
      let whoWin;
    let avaMoves;
    let numMoveLeft;
    let moveMade;
    let isGameEnded=false;
      isMoveMade = putDownPiece(clickedIntersectionCoord,turn,boardArrangement);
      moveMade=clickedIntersectionCoord;
      if (isMoveMade){
        whoWin =checkWinning(turn,clickedIntersectionCoord,boardArrangement);
        avaMoves=avalibleMoves(boardArrangement);
        numMoveLeft=avaMoves.length;
        if (whoWin!==null){
          setGame({
            isStarted:gameState.isStarted,
            isEnded:true,
            winner:whoWin
          })
          isGameEnded=true;
        }else if(numMoveLeft===0){
            setGame({
              isEnded:true,
              winner:"D"
            })
            isGameEnded=true;
          };
        // console.log(moveState.moveMade)
        // setTurn({isBlackTurn:turnState.isBlackTurn?false:true});
        if(turn==="B"){
            turn="W"
        }else{
            turn="B"
        }
        // console.log("numMoveLeft: "+numMoveLeft)
        // console.log("depth: "+depth)
        if(numMoveLeft<=depth+1){
            // setDepth({
            //     num:numMoveLeft
            // })
            depth=numMoveLeft-1
            // console.log("depth: "+depth)
        }

        if(!isGameEnded){
            moveMade=AImakeMove(AIalgorithm,turn,boardArrangement)
            whoWin =checkWinning(turn,moveMade,boardArrangement);
            if (whoWin!==null){
              setGame({
                  isStarted:gameState.isStarted,
                isEnded:true,
                winner:whoWin
              })
            }  else if(numMoveLeft===0){
              setGame({
              isStarted:gameState.isStarted,
                isEnded:true,
                winner:"D"
              })

            }
        }

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
        if(whoPlaysFirst!=="Player"){          
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

            <h1>Human VS Computer</h1>
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
                        condition={whoPlaysFirst==="Player"}
                        textIfTrue="Black Piece: Player (Human)"
                        textIfFalse={"Black Piece: Computer("+AIalgorithm+")"}
                    />
                       <ShowText textColour="textBlack"
                        condition={whoPlaysFirst!=="Player"}
                        textIfTrue="White Piece: Player (Human)"
                        textIfFalse={"White Piece: Computer("+AIalgorithm+")"}
                    />                  
                </div>

        </div>
        </div>
    )
}

export default PlayerVsComputer;