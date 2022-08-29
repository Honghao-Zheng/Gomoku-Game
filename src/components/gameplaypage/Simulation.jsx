

import Board from "../Board";
import {NavButton,FunctionButton} from "../Buttons";
import {chooseRandomMove} from "../AIplayers/RandomPlayer"
import { putDownPiece, checkWinning,avalibleMoves } from "../GameLogic"
import { useState } from "react";
import ShowText from "../ShowText";
import {GAmove} from "../AIplayers/GAalgorithm"
import { copyTwoDimArray } from "../GeneralLogic";
import minimaxMove from "../AIplayers/MinimaxAlg";
import {minimaxNR,minimaxML,minimaxAB} from "../../Experiment/minimax.jsx"
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


let totalRound=200;

function Simulation(props){
//AI1 is the AI that plays the first
      let computer1Win=0;
    let computer2Win=0;
    let draw=0;
    let computer1TotalWin=0;
    let computer2TotalWin=0;
    let totalDraw=0;    
    let moveTimeList=[];
    let movePair=[null,null];
    let gamePerformanceList=[];
    let isPairFull=false;
    let player1=props.settings.computer1;
    let player2=props.settings.computer2;
    let AI1;
    let AI2;
    let minimaxDepth;
    let geneticDepth;
    let minimaxBadDepth;
    let geneticBadDepth;
    let totalMoveTimeC1=0;
    let totalMoveTimeC2=0
    let MoveNumC1=0
    let MoveNumC2=0

   
    function AImakeMove(AI,turn,board){
        let computerMove;
        if(AI==="Random"){
            // computerMove=chooseRandomMove(board)
            // computerMove=minimaxNR(turn,0,1,board)
            computerMove=GAmove(1,turn,board)
            // computerMove=GAmove(1,turn,board)
            // computerMove=minimaxMove(turn,0,1,1,board)
        } 
        else if(AI==="MinimaxNR2") {
            computerMove=minimaxNR(turn,0,minimaxBadDepth,minimaxBadDepth,board)
        }
        else if(AI==="MinimaxML2") {
            computerMove=minimaxML(turn,0,minimaxBadDepth,minimaxBadDepth,board)
        }
        else if(AI==="MinimaxML4") {

            computerMove=minimaxML(turn,0,minimaxDepth,minimaxDepth,board)
        }
        else if(AI==="MinimaxAB4") {
            computerMove=minimaxAB(turn,0,minimaxDepth,minimaxDepth,board)
        }
        else if(AI==="MinimaxDepth4") {
            computerMove=minimaxMove(turn,0,minimaxDepth,minimaxDepth,board)
        } 
        
        else if(AI==="MinimaxDepth2") {
            computerMove=minimaxMove(turn,0,minimaxBadDepth,minimaxBadDepth,board)
        }
        else if(AI==="MinimaxDepth1") {
            computerMove=minimaxMove(turn,0,1,1,board)
        }
        else if(AI==="GeneticDepth4"){
            computerMove=GAmove(geneticDepth,turn,board)
        } 
        else if(AI==="GeneticDepth2"){
            computerMove=GAmove(geneticBadDepth,turn,board)
        }
        else if(AI==="GeneticDepth1"){
            computerMove=GAmove(1,turn,board)
        }
        putDownPiece(computerMove,turn,board)
        return computerMove
    } 
    function runSimulation(numOfRound,board,playerNumber){
        let gameRound;
        let maxRound;
        let gameBoard;
        let isGameEnded;
        let AIalgorithm;
        let turn;
        let moveMade;
        let whoWin;
        let startTime;
        let finishTime;
        let moveTimeTaken;

        if(playerNumber===1){
            gameRound=1;
            maxRound=numOfRound;
        } else{
            gameRound=numOfRound+1;
            maxRound=numOfRound*2;
        }
        for (gameRound;gameRound<=maxRound;gameRound++){
            //initialise the game
            gameBoard=copyTwoDimArray(board);
            minimaxDepth=defaultMinimaxDepth
            geneticDepth=defaultGeneticDepth
            minimaxBadDepth=defaultMinimaxBadDepth
            geneticBadDepth=defaultGeneticBadDepth
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
                startTime=performance.now();
                moveMade=AImakeMove(AIalgorithm,turn,gameBoard)
                finishTime=performance.now();
                moveTimeTaken=finishTime-startTime;

                
                if (playerNumber===1){
                    if (turn==="B"){
                        movePair[0]=moveTimeTaken
                        totalMoveTimeC1+=moveTimeTaken
                        MoveNumC1+=1
                    } else{
                        movePair[1]=moveTimeTaken
                        totalMoveTimeC2+=moveTimeTaken
                        MoveNumC2+=1
                    }
                    
                } else{
                    if (turn==="W"){
                        movePair[0]=moveTimeTaken
                        totalMoveTimeC1+=moveTimeTaken
                        MoveNumC1+=1
                    } else{
                        movePair[1]=moveTimeTaken
                        totalMoveTimeC2+=moveTimeTaken
                        MoveNumC2+=1
                    }
                }
                isPairFull=movePair[0]!==null && movePair[1]!==null;
                if(isPairFull===true){
                    moveTimeList.push(movePair);
                    movePair=[null,null]
                }

                avaMoves=avalibleMoves(gameBoard);
                numMoveLeft=avaMoves.length;
                whoWin =checkWinning(turn,moveMade,gameBoard);
                //if there is winner,game ended. if there isn't, check draw.



                if (whoWin!==null){
                    console.log("whoWin: "+whoWin+" ("+AIalgorithm+")")
                    isGameEnded=true;
                    if(movePair[0]!==null || movePair[1]!==null){
                        moveTimeList.push(movePair);
                        movePair=[null,null]
                    }
                } else if(numMoveLeft===0){
                    whoWin="draw"
                    console.log("whoWin: "+whoWin)
                    isGameEnded=true;
                    if(movePair[0]!==null || movePair[1]!==null){
                        moveTimeList.push(movePair);
                        movePair=[null,null]
                    }
                }

            //change turn and AI algorithm for next turn
                if(turn==="B"){
                    AIalgorithm=AI2;
                    turn="W"
                }else{
                     //when player 1 plays white
                    AIalgorithm=AI1;
                    turn="B";
                }
                // for the last few moves the thinking depth decrease when number of 
                //avalible move decrease
                if(numMoveLeft<geneticDepth+1){
                    geneticDepth=numMoveLeft
 
                }
                if(numMoveLeft<geneticBadDepth+1){
                    geneticBadDepth=numMoveLeft

                }

                if(numMoveLeft<minimaxDepth+1){
                  minimaxDepth=numMoveLeft

              }
              if(numMoveLeft<minimaxBadDepth+1){
                minimaxBadDepth=numMoveLeft
            }
               
            }
            //end of while loop, end of one game


            if (playerNumber===1){
            if(whoWin==="B"){
                computer1Win++
            } else if(whoWin==="W"){
                computer2Win++
            } else {
                draw++
            }
        } else {
            if(whoWin==="B"){
                computer2Win++
            } else if(whoWin==="W"){
                computer1Win++
            } else {
                draw++
            }
        }
        
        }  
        // end of N games
        // console.log("average time taken per move per game for "+AI1+" : "+ totalMoveTimeB/gameRound)
        // console.log("average time taken per move per game for "+AI2+" : "+ totalMoveTimeW/gameRound)
        // console.log(AI1+" computer1 black Win: "+computer1Win)
        // console.log(AI2+" computer2 white Win: "+computer2Win)
        // console.log("draw: "+draw)
        
    }


        
        AI1=player1;    
        AI2=player2; 
        console.log("AI1: "+AI1)
        minimaxDepth=defaultMinimaxDepth;
        geneticDepth=defaultGeneticDepth;
        runSimulation(totalRound,boardArrangement,1)
        AI1=player2  
         AI2=player1; 
         minimaxDepth=defaultMinimaxDepth;
         geneticDepth=defaultGeneticDepth
         runSimulation(totalRound,boardArrangement,2)

         computer1TotalWin+=computer1Win
         computer2TotalWin+=computer2Win
         totalDraw+=draw
         let winningCountList=[[computer1Win,computer2Win,draw]]


    


    //the following function, "downloadData", is from javatpoint.com
    function downloadData(list, header,fileName) {

        let data=header;
        list.forEach(function(row) {
           data += row.join(',');
           data += "\n";
        });
        var element = document.createElement('a');
        element.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
        element.target = '_blank';
        element.download = fileName ;
        element.click();
    }
    



    let moveTimeHeader='computer 1,computer 2\n'
    let winningCountHeader='computer 1,computer 2,draw\n'
    let fileNameMove=player1+"_"+player2+"_move_time.csv"
    let fileNamePerformance=player1+"_"+player2+"_winning_count.csv"
     return(
        <div>
        <div className="des">
        <h1>{props.settings.computer1+" computer1 Win: "+computer1TotalWin}</h1>
        <h1>{props.settings.computer2+" computer2 Win: "+computer2TotalWin}</h1>
        <h1>{"number of draw: "+totalDraw}</h1>
        <h1>{props.settings.computer1+" computer1 winning rate: "+computer1TotalWin/(computer1TotalWin+computer2TotalWin)}</h1>
        <h1>{props.settings.computer2+ " computer2 winning rate: "+computer2TotalWin/(computer1TotalWin+computer2TotalWin)}</h1>
        <h1>{props.settings.computer1+" computer1 average move time: "+totalMoveTimeC1/MoveNumC1}</h1>
        <h1>{props.settings.computer2+" computer2 average move time: "+totalMoveTimeC2/MoveNumC2}</h1>

        </div>
       
       <div className="gameboard">
       <button className={"function"} onClick={()=>downloadData(moveTimeList,moveTimeHeader, fileNameMove)}> Download move time data </button>
        <button className={"function"} onClick={()=>downloadData(winningCountList, winningCountHeader, fileNamePerformance)}> Download performance data </button>
       </div>
        </div>
    )
}
export default Simulation;