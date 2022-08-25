import {swapColor,putDownPiece} from "../GameLogic.jsx"
import {copyTwoDimArray} from "../GeneralLogic.jsx"

import {movesSearchMinimax} from "./AILogic/MoveSearch";
// import moveEvaluation from "./AILogic/MoveEvaluation";

import moveEvaluation from "./AILogic/MoveEvaluationNew";







function minimaxMove(turn,depthAwayFromRoot,depthAwayFromLeaf,board,bestScore1=-100000,alphaBetaScore=100000){
    depthAwayFromLeaf-=1;
    // console.log("depthAwayFromLeaf: "+depthAwayFromLeaf)
    let defFactor=0.9;
    let branchFactor=10;
    let opponentColor=swapColor(turn)
    let avalibleMoves1= movesSearchMinimax(turn,defFactor,board,branchFactor)
    let moveIndex1;
    let moveMade1;
    let B1Score;
    let bestScore2;
    let bestMove;
    let B1;
 
    
    //first depth, consider different computer moves
    for (moveIndex1=0;moveIndex1<avalibleMoves1.length;moveIndex1++){
        B1=copyTwoDimArray(board)
        moveMade1=avalibleMoves1[moveIndex1].move
        // console.log("moveMade1: "+moveMade1)
        putDownPiece(moveMade1,turn,B1)
        //alphabeta score is the default score for 

        //bestScore1 is the default score of current parent node

        //bestScore2 is the default score of parent node for next branching out
        bestScore2=-bestScore1;

        if(depthAwayFromLeaf===0){
            if((depthAwayFromRoot+1)%2===1){
                B1Score=moveEvaluation(moveMade1,turn,defFactor,B1).score   
            } else{
                B1Score=-moveEvaluation(moveMade1,turn,defFactor,B1).score  
            }
            // console.log("B1Score: "+B1Score)
            
        } else {
            depthAwayFromRoot+=1
            B1Score=minimaxMove(opponentColor,depthAwayFromRoot,depthAwayFromLeaf,B1,bestScore2,bestScore1)
            depthAwayFromRoot-=1
        }
        if(avalibleMoves1[moveIndex1].atkThreats.includes(5)){
            bestScore1=avalibleMoves1[moveIndex1].score;
            bestMove=moveMade1
            break;
        }
        //odd depth maximiser
        if((depthAwayFromRoot+1)%2===1){
            if(B1Score>=bestScore1){
                bestScore1=B1Score;
                bestMove=moveMade1;
                if(B1Score>=alphaBetaScore){
                    break;
                }
            }
        // even depth minimiser
        } else {
            if(B1Score<=bestScore1){
                bestScore1=B1Score
                bestMove=moveMade1;
                if(B1Score<=alphaBetaScore){
                    break;
                }
            }
        }
    }
    //return the score back to the parent node if it is not in the root node
    if(depthAwayFromRoot !== 0  ){
        // console.log("------------------------")
        // console.log("depthAwayFromRoot: "+depthAwayFromRoot)
        // console.log("bestScore1: "+bestScore1)
        return bestScore1;
    //if already in the first depth, return the move.
    } else {
        // console.log("------------------------")
        // console.log("depthAwayFromRoot: "+depthAwayFromRoot)
        // console.log("bestMove: "+bestMove)
        return bestMove;
    }
    
}

export default minimaxMove;