

import Board from "../Board";
import {NavButton,FunctionButton} from "../Buttons";
import {chooseRandomMove} from "../AIplayers/RandomPlayer"
import { putDownPiece, checkWinning,avalibleMoves } from "../GameLogic"
import { useState } from "react";
import ShowText from "../ShowText";
import GAmove from "../AIplayers/GAalgorithm"
import { copyTwoDimArray } from "../GeneralAlgorithms";
import minimaxMove from "../AIplayers/MinimaxAlg"
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
let defaultGeneticDepth=4
let gameRound=100;

function Simulation(props){
    let whoPlaysFirst="Computer 1";
    let AI1=props.settings.computer1;    
    let AI2=props.settings.computer2; 
    let minimaxDepth=defaultMinimaxDepth;
    let geneticDepth=defaultGeneticDepth

    function AImakeMove(AI,turn,board){
        let computerMove;
        if(AI==="Random"){
            computerMove=chooseRandomMove(board)
        } else if(AI==="Minimax") {
            computerMove=minimaxMove(turn,0,minimaxDepth,board)
        } else if(AI==="MinimaxBad") {
            computerMove=minimaxMove(turn,0,1,board)
        }else if(AI==="Genetic"){
            computerMove=GAmove(geneticDepth,turn,board)
        } else if(AI==="GeneticBad"){
            computerMove=GAmove(1,turn,board)
        }
        putDownPiece(computerMove,turn,board)
        return computerMove
    } 

    function runSimulation(numOfRound,board){
        let gameRound;
        // let result={
        //     computer1Win:0
        // }
        let computer1Win=0;
        let computer2Win=0;
        let draw=0
        let gameBoard;
        let isGameEnded;
        let AIalgorithm;
        let turn;
        let moveMade;
        let whoWin;
        for (gameRound=0;gameRound<numOfRound;gameRound++){
            //initialise the game
            gameBoard=copyTwoDimArray(board);
            
            minimaxDepth=defaultMinimaxDepth
            geneticDepth=defaultGeneticDepth
            isGameEnded=false;
            let avaMoves;
            let numMoveLeft;
            //AI1 alway play black and play first
            turn="B";
            AIalgorithm=AI1;
            console.log("gameRound:"+gameRound)
            // const start=performance.now()
            while (!isGameEnded){
                // console.log("gameBoard: "+gameBoard)
                // console.log("turn: "+turn)
                moveMade=AImakeMove(AIalgorithm,turn,gameBoard)
                // console.log("moveMade: "+moveMade)
                avaMoves=avalibleMoves(gameBoard);
                numMoveLeft=avaMoves.length;
                whoWin =checkWinning(turn,moveMade,gameBoard);
                //if there is winner,game ended. if there isn't, check draw.
                if (whoWin!==null){
                    console.log("whoWin: "+whoWin+" ("+AIalgorithm+")")
                    // console.log("numMoveLeft: "+numMoveLeft)
                    isGameEnded=true;
                } else if(numMoveLeft===0){
                    whoWin="draw"
                    console.log("whoWin: "+whoWin)
                    isGameEnded=true;
                }
                //change turn and AI algorithm for next turn
                if(turn==="B"){
                    AIalgorithm=AI2;
                    turn="W"
                }else{
                    AIalgorithm=AI1;
                    turn="B"
                }
                // for the last few moves the thinking depth decrease when number of 
                //avalible move decrease
                if(numMoveLeft<geneticDepth+1){

                    geneticDepth=numMoveLeft
                    // console.log("depth: "+depth)
                }
                // console.log("numMoveLeft: "+numMoveLeft)
                // console.log("minimaxDepth: "+minimaxDepth)
                if(numMoveLeft<minimaxDepth+1){
                  minimaxDepth=numMoveLeft
            
                  // console.log("depth: "+depth)
              }
               
            }
            // const timetaken=performance.now() - start
            // console.log("timetaken: "+timetaken+"For round "+gameRound)
            //end of while loop, end of one game
            if(whoWin==="B"){
                computer1Win++
            } else if(whoWin==="W"){
                computer2Win++
            } else {
                draw++
            }
            // console.log("whoWin: "+whoWin)
        }
        //end of N games
        console.log(AI1+" computer1 black Win: "+computer1Win)
        console.log(AI2+" computer2 white Win: "+computer2Win)
        console.log("draw: "+draw)
        
    }
    
    runSimulation(gameRound,boardArrangement)
    

    return(
        <div>


        </div>
    )
}

export default Simulation;