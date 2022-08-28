

import Board from "../Board";
import {NavButton,FunctionButton} from "../Buttons";
import {chooseRandomMove} from "../AIplayers/RandomPlayer"
import { putDownPiece, checkWinning,avalibleMoves } from "../GameLogic";
import { useState } from "react";
import ShowText from "../ShowText";
import GAmove from "../AIplayers/GAalgorithm";
import {initdrawCheckBoard,drawCheckBoard} from "../SharedData";
import minimaxMove from "../AIplayers/MinimaxAlg";
import moveEvaluation from "../AIplayers/AILogic/MoveEvaluation";

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
  // boardArrangement=drawCheckBoard();
  let defaultMinimaxDepth=4;
  let defaultMinimaxBadDepth=2;
  let defaultGeneticDepth=4
  let defaultGeneticBadDepth=2
let minimaxDepth=defaultMinimaxDepth;
let minimaxBadDepth=defaultMinimaxBadDepth;
let geneticDepth=defaultGeneticDepth;
let geneticBadDepth=defaultGeneticBadDepth;
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
          computerMove=minimaxMove(turn,0,minimaxDepth,minimaxDepth,board)
        } else if(AI==="MinimaxBad") {
          computerMove=minimaxMove(turn,0,minimaxBadDepth,minimaxBadDepth,board)
        }
        else if(AI==="Genetic"){
            computerMove=GAmove(geneticDepth,turn,board)
        }
        else if(AI==="GeneticBad"){
            computerMove=GAmove(1,turn,board)
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
        
        if(numMoveLeft<geneticDepth+1){
          geneticDepth=numMoveLeft
          // console.log("depth: "+depth)
      }
      if(numMoveLeft<geneticBadDepth+1){
          geneticBadDepth=numMoveLeft
          // console.log("depth: "+depth)
      }
      // console.log("numMoveLeft: "+numMoveLeft)
      // console.log("minimaxDepth: "+minimaxDepth)
      if(numMoveLeft<minimaxDepth+1){
        minimaxDepth=numMoveLeft
  
        // console.log("depth: "+depth)
    }
    if(numMoveLeft<minimaxBadDepth+1){
      minimaxBadDepth=numMoveLeft

      // console.log("depth: "+depth)
  }
      // console.log("numMoveLeft: "+numMoveLeft)
      // console.log("minimaxDepth: "+minimaxDepth)
      // numMoveLeft-=1;
        if(!isGameEnded){
            moveMade=AImakeMove(AIalgorithm,turn,boardArrangement)
            whoWin =checkWinning(turn,moveMade,boardArrangement);
            avaMoves=avalibleMoves(boardArrangement);
            numMoveLeft=avaMoves.length;
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
    function resetAndStart(board, whoPlaysFirst){
      resetGame(board);
      startGame(whoPlaysFirst)
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
        minimaxDepth=defaultMinimaxDepth;
        geneticDepth=defaultGeneticDepth;
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
                    <FunctionButton text="reset" onClick={()=>resetAndStart(boardArrangement,whoPlaysFirst)}/>:
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