import {swapColor,putDownPiece} from "../GameLogic.jsx"
import {copyTwoDimArray,random,shuffle} from "../GeneralAlgorithms.jsx"

import movesSearch from "./AILogic/MoveSearch";
import moveEvaluation from "./AILogic/MoveEvaluationMinimax";
// import {movesSearch} from "./AILogic/InitIndMoves";
// import moveEvaluation from "./AILogic/MoveEvaluation";






function minimaxMoveBad(turn,depthAwayFromRoot=0,depthAwayFromLeaf=4,board,alphaScore){
    depthAwayFromLeaf-=2;
    let defFactor=0.8;
    let branchFactor=5
    let opponentColor=swapColor(turn)
    let avalibleMoves1= movesSearch(turn,defFactor,board,branchFactor)
    let moveIndex1;
    let moveIndex2;
    let moveMade1;
    let moveMade2;
    let B1Score;
    let B2Score;
    let bestScore1;
    let bestScore2;
    let avalibleMoves2;
    let bestMove;
    let B1;
    let B2;
    
    bestScore1=-100000;
    //first depth, consider different computer moves
    for (moveIndex1=0;moveIndex1<avalibleMoves1.length;moveIndex1++){
        B1=copyTwoDimArray(board)
        moveMade1=avalibleMoves1[moveIndex1].move
        putDownPiece(moveMade1,turn,B1)
        avalibleMoves2=movesSearch(turn,defFactor,B1,branchFactor)
        bestScore2=100000;
        //second depth, consider different opponent moves
        for (moveIndex2=0;moveIndex2<avalibleMoves2.length;moveIndex2++){
            B2=copyTwoDimArray(B1)
            moveMade2=avalibleMoves2[moveIndex2].move
            putDownPiece(moveMade2,opponentColor,B2)
            //evaluate score for move once it reached the leaf node
            if(depthAwayFromLeaf===0){
                B2Score=-moveEvaluation(moveMade2,opponentColor,defFactor,B2).score          
            } else {
                depthAwayFromRoot+=2
                B2Score=minimaxMove(turn,depthAwayFromRoot,depthAwayFromLeaf,B2,bestScore2)
                depthAwayFromRoot-=2
            }

            if(B2Score<=bestScore2){
                bestScore2=B2Score
                if(B2Score<=bestScore1){
                    break;
                }
            }

        }


        B1Score=bestScore2;
        if(B1Score>=bestScore1){
            bestScore1=B1Score;
            bestMove=moveMade1;
            if(depthAwayFromRoot !==0  ){
                if(B1Score>=alphaScore){
                    break;
                }
            }
        }    
    }
    //return the score back to the parent node
    if(depthAwayFromRoot !==0  ){
        return bestScore1;
    //if already in the first two depth, return the move.
    } else {
        console.log("bestMove: "+bestMove)
        return bestMove;
    }
    
}
function minimaxMove(turn,depthAwayFromRoot,depthAwayFromLeaf,board,bestScore1=-100000,alphaBetaScore=100000){
    depthAwayFromLeaf-=1;
    depthAwayFromRoot+=1
    let defFactor=0.8;
    let branchFactor=5
    let opponentColor=swapColor(turn)
    let avalibleMoves1= movesSearch(turn,defFactor,board,branchFactor)
    let moveIndex1;
    let moveIndex2;
    let moveMade1;
    let moveMade2;
    let B1Score;
    let B2Score;
    let bestScore2;
    let avalibleMoves2;
    let bestMove;
    let B1;
    let B2;
    
    //first depth, consider different computer moves
    for (moveIndex1=0;moveIndex1<avalibleMoves1.length;moveIndex1++){
        B1=copyTwoDimArray(board)
        moveMade1=avalibleMoves1[moveIndex1].move
        putDownPiece(moveMade1,turn,B1)
        //alphabeta score is the default score for 

        //bestScore1 is the default score of current parent node

        //bestScore2 is the default score of parent node for next branching out
        bestScore2=-bestScore1;

        if(depthAwayFromLeaf===0){
            if(depthAwayFromRoot%2===1){
                B1Score=moveEvaluation(moveMade1,turn,defFactor,B1).score   
            } else{
                B1Score=-moveEvaluation(moveMade1,turn,defFactor,B1).score  
            }
            
        } else {
            B1Score=minimaxMove(opponentColor,depthAwayFromRoot,depthAwayFromLeaf,B1,bestScore2,bestScore1)
            depthAwayFromRoot-=1
        }
        //odd depth maximiser
        if(depthAwayFromRoot%2===1){
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
    //return the score back to the parent node if it is not in the first depth
    if(depthAwayFromRoot !==1  ){
        return bestScore1;
    //if already in the first depth, return the move.
    } else {
        console.log("bestMove: "+bestMove)
        return bestMove;
    }
    
}

export {minimaxMove,minimaxMoveBad};