import moveEvaluation from "../components/AIplayers/AILogic/MoveEvaluationNew";
import { avalibleMoves } from "../components/GameLogic";
import { swapColor } from "../components/GameLogic";
import { copyTwoDimArray } from "../components/GeneralLogic";
import { putDownPiece } from "../components/GameLogic";
import { movesSearchMinimax } from "../components/AIplayers/AILogic/MoveSearch";
import moveEvaluationNoDF from "./moveEvaluationNoDF";

function minimaxNR(turn,depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth,board,currentNodeScore=-100000,parentNodeScore=100000){

    //distance away from leaf is also the height of subtree for the child node of the current node
    let defFactor=0.9;
    let branchFactor=10;
    let opponentColor=swapColor(turn)
    let moveCollection= avalibleMoves(board)
    let moveIndex;
    let moveMade;
    let moveScore;
    let nextCurrentNodeScore;
    let bestMove;
    let boardCopy;
    // assert(minimaxPreCondition(distanceAwayFromLeaf,board),"minimaxPreCondition Failed")
    distanceAwayFromLeaf-=1;
    
    //first depth, consider different computer moves
    for (moveIndex=0;moveIndex<moveCollection.length;moveIndex++){
        // assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")
        boardCopy=copyTwoDimArray(board)
        moveMade=moveCollection[moveIndex].move
        putDownPiece(moveMade,turn,boardCopy)
        if(distanceAwayFromLeaf===0){
            //if leaf node at odd depth
            if((depthAwayFromRoot+distanceAwayFromLeaf+1)%2===1){
                moveScore=moveEvaluation(moveMade,turn,defFactor,boardCopy).score   
            //if leaf node at even depth
            } else{
                moveScore=-moveEvaluation(moveMade,turn,defFactor,boardCopy).score
            }            
        } else {
            depthAwayFromRoot+=1
            moveScore=minimaxNR(opponentColor,depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth,boardCopy,parentNodeScore,currentNodeScore)
            depthAwayFromRoot-=1
        }
        // assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")

        //odd depth maximiser
        if((depthAwayFromRoot+1)%2===1){
            if(moveScore>currentNodeScore){
                currentNodeScore=moveScore;
                bestMove=moveMade;
            }
        // even depth minimiser
        } else {
            if(moveScore<currentNodeScore){
                currentNodeScore=moveScore
                bestMove=moveMade;

                }
            }
        }
        // assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")
    
    // minimax invariant:
    // assert(minimaxPostCondition(depthAwayFromRoot,distanceAwayFromLeaf,currentNodeScore), "fail post condition")
    //return the score back to the parent node if it is not in the root node
    if(depthAwayFromRoot !== 0  ){
        return currentNodeScore;
    //if already in the first depth, return the move.
    } else {
        return bestMove;
    }
}



function minimaxML(turn,depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth,board,currentNodeScore=-100000,parentNodeScore=100000){

    //distance away from leaf is also the height of subtree for the child node of the current node
    let defFactor=0.9;
    let branchFactor=10;
    let opponentColor=swapColor(turn)
    let moveCollection= movesSearchMinimax(turn,defFactor,board,branchFactor)
    let moveIndex;
    let moveMade;
    let moveScore;
    let nextCurrentNodeScore;
    let bestMove;
    let boardCopy;
    // assert(minimaxPreCondition(distanceAwayFromLeaf,board),"minimaxPreCondition Failed")
    distanceAwayFromLeaf-=1;
    
    //first depth, consider different computer moves
    for (moveIndex=0;moveIndex<moveCollection.length;moveIndex++){
        // assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")
        boardCopy=copyTwoDimArray(board)
        moveMade=moveCollection[moveIndex].move
        putDownPiece(moveMade,turn,boardCopy)
        if(distanceAwayFromLeaf===0){
            //if leaf node at odd depth
            if((depthAwayFromRoot+distanceAwayFromLeaf+1)%2===1){
                moveScore=moveEvaluation(moveMade,turn,defFactor,boardCopy).score   
            //if leaf node at even depth
            } else{
                moveScore=-moveEvaluation(moveMade,turn,defFactor,boardCopy).score
            }            
        } else {
            depthAwayFromRoot+=1
            moveScore=minimaxNR(opponentColor,depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth,boardCopy,parentNodeScore,currentNodeScore)
            depthAwayFromRoot-=1
        }
        // assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")

        //odd depth maximiser
        if((depthAwayFromRoot+1)%2===1){
            if(moveScore>currentNodeScore){
                currentNodeScore=moveScore;
                bestMove=moveMade;
            }
        // even depth minimiser
        } else {
            if(moveScore<currentNodeScore){
                currentNodeScore=moveScore
                bestMove=moveMade;

                }
            }
        }
        // assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")
    
    // minimax invariant:
    // assert(minimaxPostCondition(depthAwayFromRoot,distanceAwayFromLeaf,currentNodeScore), "fail post condition")
    //return the score back to the parent node if it is not in the root node
    if(depthAwayFromRoot !== 0  ){
        return currentNodeScore;
    //if already in the first depth, return the move.
    } else {
        return bestMove;
    }
}

function minimaxAB(turn,depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth,board,currentNodeScore=-100000,parentNodeScore=100000){
    //distance away from leaf is also the height of subtree for the child node of the current node
    let defFactor=0.9;
    let branchFactor=10;
    let opponentColor=swapColor(turn)
    let moveCollection= movesSearchMinimax(turn,defFactor,board,branchFactor)
    let moveIndex;
    let moveMade;
    let moveScore;
    let nextCurrentNodeScore;
    let bestMove;
    let boardCopy;
    // assert(minimaxPreCondition(distanceAwayFromLeaf,board),"minimaxPreCondition Failed")
    distanceAwayFromLeaf-=1;
    
    //first depth, consider different computer moves
    for (moveIndex=0;moveIndex<moveCollection.length;moveIndex++){
        // assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")
        boardCopy=copyTwoDimArray(board)
        moveMade=moveCollection[moveIndex].move
        putDownPiece(moveMade,turn,boardCopy)
        if(distanceAwayFromLeaf===0){
            //if leaf node at odd depth
            if((depthAwayFromRoot+distanceAwayFromLeaf+1)%2===1){
                moveScore=moveEvaluation(moveMade,turn,defFactor,boardCopy).score   
            //if leaf node at even depth
            } else{
                moveScore=-moveEvaluation(moveMade,turn,defFactor,boardCopy).score
            }            
        } else {
            depthAwayFromRoot+=1
            moveScore=minimaxAB(opponentColor,depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth,boardCopy,parentNodeScore,currentNodeScore)
            depthAwayFromRoot-=1
        }
        // assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")
        //odd depth maximiser
        if((depthAwayFromRoot+1)%2===1){
            if(moveScore>currentNodeScore){
                currentNodeScore=moveScore;
                bestMove=moveMade;
                if(moveScore>=parentNodeScore){
                    break;
                }
            }
        // even depth minimiser
        } else {
            if(moveScore<currentNodeScore){
                currentNodeScore=moveScore
                bestMove=moveMade;
                if(moveScore<=parentNodeScore){
                    break;
                }
            }
        }
        // assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")
    }
    // minimax invariant:
    // assert(minimaxPostCondition(depthAwayFromRoot,distanceAwayFromLeaf,currentNodeScore), "fail post condition")
    //return the score back to the parent node if it is not in the root node
    if(depthAwayFromRoot !== 0  ){
        return currentNodeScore;
    //if already in the first depth, return the move.
    } else {
        return bestMove;
    }
}


export {minimaxNR,minimaxML,minimaxAB};