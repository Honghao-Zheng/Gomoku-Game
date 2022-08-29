import moveEvaluation from "../components/AIplayers/AILogic/MoveEvaluationNew";
import { avalibleMoves } from "../components/GameLogic";
import { swapColor } from "../components/GameLogic";
import { copyTwoDimArray } from "../components/GeneralLogic";
import { putDownPiece } from "../components/GameLogic";
import { movesSearchMinimax } from "../components/AIplayers/AILogic/MoveSearch";
import moveEvaluationNoDF from "./moveEvaluationNoDF";
import assert from "unit.js/src/assert";
function minimaxPreCondition(distanceAwayFromLeaf,board){
    let isPassed=distanceAwayFromLeaf>=1;
    assert(isPassed, 
        "current node distance away from leaf is less than 1, it is "+distanceAwayFromLeaf)
    // isPassed=isPassed&&Math.abs(currentNodeScore)===100000
    // assert(isPassed,
    // "The absolute initial score of the current node is not 10000, instead it is "
    //  +currentNodeScore)
     let numberOfMoves=avalibleMoves(board).length;
     isPassed=isPassed && distanceAwayFromLeaf<=numberOfMoves;

    assert(isPassed, 
        "The search depth is greater than the number of avalible moves searched, the avalible moves are: "
        +avalibleMoves+" ,and the current distance away form leaf is: "+distanceAwayFromLeaf)
    return isPassed;

}


function minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth){
    let isPassed=limitedDepth===depthAwayFromRoot+distanceAwayFromLeaf+1
    assert(isPassed, "total limited depth changed")
    return isPassed
    
}

function minimaxPostCondition(depthAwayFromRoot,distanceAwayFromLeaf,currentNodeScore){
    //the computed score must be updated. it is updated, its absolute value must not equal to 100000 
    //all node score must be either and nagative or positive depending on the number of limit depth.
    let limitedDepth=depthAwayFromRoot+distanceAwayFromLeaf+1
    let isPassed=Math.abs(currentNodeScore)!==100000;
    assert(isPassed, "The current node score is not updated")
    if (limitedDepth%2===1){
        isPassed=isPassed && currentNodeScore>=0
    } else {
        isPassed=isPassed && currentNodeScore<=0
    }
    assert(isPassed, "Wrong sign asssigned to evaluated score: "+currentNodeScore)
    return isPassed
}

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
    assert(minimaxPreCondition(distanceAwayFromLeaf,board),"minimaxPreCondition Failed")
    distanceAwayFromLeaf-=1;
    
    //first depth, consider different computer moves
    for (moveIndex=0;moveIndex<moveCollection.length;moveIndex++){
        assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")
        boardCopy=copyTwoDimArray(board)
        moveMade=moveCollection[moveIndex]
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
        assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")

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
        assert(minimaxInvariant(depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth), "invariant failed")
    
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
            moveScore=minimaxML(opponentColor,depthAwayFromRoot,distanceAwayFromLeaf,limitedDepth,boardCopy,parentNodeScore,currentNodeScore)
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