

import Board from "../Board";
import {NavButton,FunctionButton} from "../Buttons";
import {chooseRandomMove} from "../AIplayers/RandomPlayer"
import { putDownPiece, checkWinning,avalibleMoves } from "../GameLogic"
import { useState } from "react";
import ShowText from "../ShowText";
import {GAmove} from "../AIplayers/GAalgorithm"
import minimaxMove from "../AIplayers/MinimaxAlg"
import {initdrawCheckBoard,drawCheckBoard} from "../SharedData";
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
  let defaultMinimaxDepth=4;
  let defaultMinimaxBadDepth=2;
  let defaultGeneticDepth=4
  let defaultGeneticBadDepth=2
let minimaxDepth=defaultMinimaxDepth;
let minimaxBadDepth=defaultMinimaxBadDepth;
let geneticDepth=defaultGeneticDepth;
let geneticBadDepth=defaultGeneticBadDepth;
  // boardArrangement=drawCheckBoard();
function ComputerVsComputer(props){
    let whoPlaysFirst="Computer 1";
    let AI1=props.settings.computer1;    
    let AI2=props.settings.computer2;  
    let AI1PieceColour;
    let textBlackC1,textBlackC2,textWhiteC1,textWhiteC2;
    // if (whoPlaysFirst==="Computer 1"){
      AI1PieceColour="B";
      textBlackC1="Black Piece: Computer 1 ("+AI1+")";
      textWhiteC2="White Piece: Computer 2 ("+AI2+")";
    // } else {AI1PieceColour="W"}
    textBlackC2="Black Piece: Computer 2 ("+AI2+")";
    textWhiteC1="White Piece: Computer 1 ("+AI1+")";
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
          computerMove=minimaxMove(turn,0,minimaxDepth,minimaxDepth,board)
        } else if(AI==="MinimaxBad") {
          computerMove=minimaxMove(turn,0,minimaxBadDepth,minimaxBadDepth,board)
        }else if(AI==="Genetic"){
            computerMove=GAmove(geneticDepth,turn,board)
        }else if(AI==="GeneticBad"){
          computerMove=GAmove(1,turn,board)
      }
        putDownPiece(computerMove,turn,board)
        return computerMove
    } 
    function handleMoveClick(clickedIntersectionCoord){
        let AIalgorithm;
      let turn=turnState.isBlackTurn?"B":"W";
      let whoWin;
      let avaMoves;
      let numMoveLeft

//if it is AI1's turn, then use AI1's algorithm
      if(AI1PieceColour===turn){
        AIalgorithm=AI1;
        } else{
        AIalgorithm=AI2;
        } 
      

        // console.log(moveState.moveMade)
        // setTurn({isBlackTurn:turnState.isBlackTurn?false:true});

      let moveMade=AImakeMove(AIalgorithm,turn,boardArrangement)
      // console.log("turn: "+turn)
      // console.log("atkThreats: "+moveEvaluation(moveMade,turn,0.9,boardArrangement).atkThreats)
      // console.log("defThreats: "+moveEvaluation(moveMade,turn,0.9,boardArrangement).defThreats)
      avaMoves=avalibleMoves(boardArrangement);
      numMoveLeft=avaMoves.length;
      whoWin =checkWinning(turn,moveMade,boardArrangement);
      if (whoWin!==null){
        setGame({
            isStarted:gameState.isStarted,
          isEnded:true,
          winner:whoWin
        })
      }else if(numMoveLeft===0){
        setGame({
          isStarted:gameState.isStarted,
          isEnded:true,
          winner:"D"
        })
      };
      setMove({moveMade:moveMade})
      setTurn({isBlackTurn:turnState.isBlackTurn?false:true})
      if(numMoveLeft<geneticDepth+1){

        geneticDepth=numMoveLeft
        // console.log("depth: "+depth)
    }
    // console.log("numMoveLeft: "+numMoveLeft)
    // console.log("minimaxDepth: "+minimaxDepth)
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
    }
    function returnHome(board){
      props.onClickHome();
      resetGame(board)
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
        minimaxDepth=defaultMinimaxDepth;
        geneticDepth=defaultGeneticDepth;
    }

    function resetAndStart(board, whoPlaysFirst){
      resetGame(board);
      startGame(whoPlaysFirst)
    }

    function startGame(whoPlaysFirst){
        // console.log(whoPlaysFirst)
        // console.log(AI1)
        // console.log(AI2)
        

        if(whoPlaysFirst==="Computer 1"){          
            let moveMade=AImakeMove(AI1,"B",boardArrangement)
            // console.log(moveMade)
            setMove({moveMade:moveMade});
            setTurn({isBlackTurn:turnState.isBlackTurn?false:true});    

        } else if(whoPlaysFirst==="Computer 2"){
            let moveMade=AImakeMove(AI2,"B",boardArrangement)
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

            <h1>Computer VS Computer</h1>
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
                        condition={whoPlaysFirst==="Computer 1"}
                        textIfTrue={textBlackC1}
                        textIfFalse={textBlackC2}
                    />
                       <ShowText textColour="textBlack"
                        condition={whoPlaysFirst!=="Computer 1"}
                        textIfTrue={textWhiteC1}
                        textIfFalse={textWhiteC2}
                    />        
                                        <FunctionButton text="make a move" 
                     onClick={isGamePlayEnabled()?
                            ()=>handleMoveClick([0,0]):
                                    null}/>:                
                </div>

        </div>
        </div>
    )
}

export default ComputerVsComputer;