import moveEvaluation from "./MoveEvaluationNew";
import {chooseRandomMoveInit} from "../RandomPlayer.jsx";
import {moveObject} from "./Objects";
import assert from "unit.js/src/assert";


// function checkIntersectionEmpty(moveCollection, board){
//     for (let i=0; i<moveCollection.length;i++){
//         let moveMade=moveCollection[i].move;
//         if (board[moveMade[0]][moveMade[1]]!==" "){
//             return false
//         } else {
//             return true
//         }
//     }
// }

function movesSearchMinimax(turn,defFactor,board,branchFactor){
    let rowCoord;
    let colCoord;
    let movePriorities=[];
    let moveNormals=[];
    let moveCollection=[];
    // let searchRange=[-1,1]
    // let i,j
    let rowIndex,colIndex;
    let moveRow,moveCol;
    let moveEntity;
    let atkThreats;
    let defThreats;
    let moveValue;
    let atkThreatIndex;
    let defThreatsIndex;
    let moveWithScore;
    let loopNums;
    let moveIndex;
    let move;
    //two for loop to scan every sqaure in the board.
    for (rowCoord=0;rowCoord<15;rowCoord++){
        for (colCoord=0;colCoord<15;colCoord++){
            //check if the sqaure has stone
            // console.log("rowCoord: "+rowCoord)
            // console.log("colCoord: "+colCoord)
            // console.log("board[rowCoord][colCoord]: "+board[rowCoord][colCoord])
            if (board[rowCoord][colCoord]!==" "){
                // console.log(board[rowCoord][colCoord])
                //search for neib imtersections
                for (rowIndex=-2;rowIndex<=2;rowIndex++){
                    for (colIndex=-2;colIndex<=2;colIndex++){
                        // console.log("[rowIndex,colIndex]: "+[rowIndex,colIndex])
                      if (rowIndex !==0 || colIndex !==0){
                        moveRow=rowCoord+rowIndex;
                        moveCol=colCoord+colIndex;
                        // console.log("[moveRow,moveCol]: "+[moveRow,moveCol])
                        //sqaure within the board range
                        if (
                            moveRow>=0 &&
                            moveRow<=14 &&
                            moveCol>=0 &&
                            moveCol <=14 
                        ){
                            //if sqaure empty,make imaginary move to see its value.
                            if(board[moveRow][moveCol]===" "){
                                board[moveRow][moveCol]=turn;
                                moveEntity=moveEvaluation([moveRow,moveCol],turn,defFactor,board)
                                board[moveRow][moveCol]=" ";
                                moveValue=moveEntity.score
                                atkThreats=moveEntity.atkThreats;
                                defThreats=moveEntity.defThreats;
                                // console.log("moveEntity: "+moveEntity.move)
                                //check offence threats, if there is move to form five in-a-row threat, only consider such threat
                                for(atkThreatIndex=0;atkThreatIndex<4;atkThreatIndex++){
                                    if (atkThreats[atkThreatIndex]===5){
                                        moveCollection=[moveEntity]
                                        // assert(checkIntersectionEmpty(moveCollection,board),"75")
                                        return moveCollection
                                    }
                                }
                                //check offence threats, if there is move to prevent five in-a-row threat, only consider such threat
                                for(defThreatsIndex=0;defThreatsIndex<4;defThreatsIndex++){
                                    if (defThreats[defThreatsIndex]===5){
                                        moveCollection=[moveEntity]
                                        // assert(checkIntersectionEmpty(moveCollection,board),"83")
                                        return moveCollection
                                    }
                                }
                                
                                //second priority moves
                                if(moveValue>=29){

                                    movePriorities.push(moveEntity)

                                //third priority moves
                                } else {
                                    // console.log("moveWithScore.move: "+moveWithScore.move)
                                    // console.log("moveWithScore.score: "+moveWithScore.score)
                                    moveNormals.push(moveEntity)
                                }
                                //reverse the move to make the board unchanged
                                
                            }
                        }
                      }
                    }
                  }
            }
        }
    }
    if (movePriorities.length!==0){
        movePriorities.sort((move1,move2)=>move2.score-move1.score)
        for (moveIndex=0;moveIndex<movePriorities.length;moveIndex++){
            moveCollection.push(movePriorities[moveIndex])

        }
        // assert(checkIntersectionEmpty(moveCollection,board),"115")
        return moveCollection
        
    } else if (moveNormals.length!==0){
        moveNormals.sort((move1,move2)=>move2.score-move1.score)
        // console.log("moveNormals: "+moveNormals)
        if(moveNormals.length<branchFactor){
            loopNums=moveNormals.length
        } else{
            loopNums=branchFactor
        }
        for (moveIndex=0;moveIndex<loopNums;moveIndex++){
            // console.log("move: "+moveNormals[moveIndex].move)
            // console.log("score: "+moveNormals[moveIndex].score)
            move=moveNormals[moveIndex]
            moveCollection.push(move)
        }
        // assert(checkIntersectionEmpty(moveCollection,board),"132")
        return moveCollection;
    } 
    else {
        move =chooseRandomMoveInit(board)
        // console.log("init move: "+move)
        let emptyThreats=[null,null,null,null]
        let randomMoveEntity=new moveObject(move,emptyThreats,emptyThreats,0)
        moveCollection.push(randomMoveEntity)
        // assert(checkIntersectionEmpty(moveCollection,board),"141")
        return moveCollection
    }

   
}


function movesSearchGA(board){
    let rowCoord;
    let colCoord;
    let moveCollection=[];
    // let searchRange=[-1,1]
    // let i,j
    let rowIndex,colIndex;
    let moveRow,moveCol;
    // console.log(board)
    for (rowCoord=0;rowCoord<15;rowCoord++){
        for (colCoord=0;colCoord<15;colCoord++){
            // console.log("rowCoord: "+rowCoord)
            // console.log("colCoord: "+colCoord)
            if (board[rowCoord][colCoord]!==" "){
                // console.log(board[rowCoord][colCoord])
                for (rowIndex=-1;rowIndex<=1;rowIndex++){
                    for (colIndex=-1;colIndex<=1;colIndex++){
                      if (rowIndex !==0 || colIndex !==0){
                        moveRow=rowCoord+rowIndex;
                        moveCol=colCoord+colIndex

                        if (
                            moveRow>=0 &&
                            moveRow<=14 &&
                            moveCol>=0 &&
                            moveCol <=14 
                        ){
                            if(board[moveRow][moveCol]===" "){
                                moveCollection.push([moveRow,moveCol]);
                            }
 
                        }
                      }
                    }
                  }

            }

        }
    }
    return moveCollection;
}

export {movesSearchMinimax,movesSearchGA};