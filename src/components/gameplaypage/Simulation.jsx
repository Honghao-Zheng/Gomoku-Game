

import Board from "../Board";
import {NavButton,FunctionButton} from "../Buttons";
import chooseRandomMove from "../AIplayers/RandomPlayer"
import { putDownPiece, checkWinning,avalibleMoves } from "../GameLogic"
import { useState } from "react";
import ShowText from "../ShowText";
import GAmove from "../AIplayers/GA/GAalgorithm"
import { copyTwoDimArray } from "../GeneralAlgorithms";

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
let depth=6;
function Simulation(props){
    let whoPlaysFirst="Computer 1";
    let AI1=props.settings.computer1;    
    let AI2=props.settings.computer2; 
    
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
            

            isGameEnded=false;
            let avaMoves;
            let numMoveLeft;
            //AI1 alway play black and play first
            turn="B";
            AIalgorithm=AI1;
            console.log("gameRound:"+gameRound)
            const start=performance.now()
            while (!isGameEnded){
                moveMade=AImakeMove(AIalgorithm,turn,gameBoard)
                avaMoves=avalibleMoves(gameBoard);
                numMoveLeft=avaMoves.length;
                whoWin =checkWinning(turn,moveMade,gameBoard);
                //if there is winner,game ended. if there isn't, check draw.
                if (whoWin!==null||numMoveLeft===0){
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
                if(numMoveLeft<=depth.num){
                    depth=numMoveLeft
                  //   console.log("depth: "+depth)
                }
            }
            const timetaken=performance.now() - start
            console.log("timetaken: "+timetaken+"For round "+gameRound)
            //end of while loop, end of one game
            if(whoWin==="B"){
                computer1Win++
            } else if(whoWin==="W"){
                computer2Win++
            } else {
                draw++
            }
        }
        //end of N games
        console.log("computer1Win: "+computer1Win)
        console.log("computer2Win: "+computer2Win)
        console.log("draw: "+draw)
        
    }
    
    runSimulation(1000,boardArrangement)
    
   
  



    function AImakeMove(AI,turn,board){
        let computerMove;
        if(AI==="Random"){
            computerMove=chooseRandomMove(board)
        } else if(AI==="Minimax") {
        } else if(AI==="Genetic"){
            computerMove=GAmove(depth,turn,board)
        }
        putDownPiece(computerMove,turn,board)
        return computerMove
    } 





    return(
        <div>


        </div>
    )
}

export default Simulation;