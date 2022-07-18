import moveEvaluation from "./MoveEvaluationMinimax";
import {chooseRandomMoveInit} from "../RandomPlayer.jsx";
import {moveObject} from "./Objects";



function movesSearch(turn,defFactor,board,branchFactor){
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
                //search for neib sqaure
                for (rowIndex=-1;rowIndex<=1;rowIndex++){
                    for (colIndex=-1;colIndex<=1;colIndex++){
                      if (rowIndex !==0 || colIndex !==0){
                        moveRow=rowCoord+rowIndex;
                        moveCol=colCoord+colIndex;
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
                                moveValue=moveEntity.score
                                atkThreats=moveEntity.atkThreats;
                                defThreats=moveEntity.defThreats;
                                //check offence threats, if there is move to form five in-a-row threat, only consider such threat
                                for(atkThreatIndex=0;atkThreatIndex<4;atkThreatIndex++){
                                    if (atkThreats[atkThreatIndex]===5){
                                        moveCollection=[moveEntity]
                                        return moveCollection
                                    }
                                }
                                //check offence threats, if there is move to prevent five in-a-row threat, only consider such threat
                                for(defThreatsIndex=0;defThreatsIndex<4;defThreatsIndex++){
                                    if (defThreats[defThreatsIndex]===5){
                                        moveCollection=[moveEntity]
                                        return moveCollection
                                    }
                                }
                                
                                //second priority moves
                                if(moveValue>=30*defFactor){

                                    movePriorities.push(moveEntity)

                                //third priority moves
                                } else {
                                    // console.log("moveWithScore.move: "+moveWithScore.move)
                                    // console.log("moveWithScore.score: "+moveWithScore.score)
                                    moveNormals.push(moveEntity)
                                }
                                //reverse the move to make the board unchanged
                                board[moveRow][moveCol]=" ";
                            }
                        }
                      }
                    }
                  }
            }
        }
    }
    if (movePriorities.length!==0){
        movePriorities.sort((move1,move2)=>move1.score-move2.score)
        for (moveIndex=0;moveIndex<movePriorities.length;moveIndex++){
            moveCollection.push(movePriorities[moveIndex])

        }
        return moveCollection
        
    } else if (moveNormals.length!==0){
        moveNormals.sort((move1,move2)=>move1.score-move2.score)
        // console.log("moveNormals: "+moveNormals)
        if(moveNormals.length<branchFactor){
            loopNums=moveNormals.length
        } else{
            loopNums=branchFactor
        }
        for (moveIndex=0;moveIndex<loopNums;moveIndex++){
            // console.log("move: "+moveNormals[moveIndex].move)
            move=moveNormals[moveIndex]
            moveCollection.push(move)
        }
        return moveCollection;
    } 
    else {
        move =chooseRandomMoveInit(board)
        console.log("init move: "+move)
        let emptyThreats=[null,null,null,null]
        let randomMoveEntity=new moveObject(move,emptyThreats,emptyThreats,0)
        moveCollection.push(randomMoveEntity)
        return moveCollection
    }

   
}

export default movesSearch;