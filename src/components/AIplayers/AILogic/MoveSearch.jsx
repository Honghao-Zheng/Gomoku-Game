import moveEvaluation from "./MoveEvaluationMinimax";
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
    let moveObject;
    let atkThreats;
    let defThreats;
    let moveValue;
    let atkThreatIndex;
    let defThreatsIndex;
    let moveWithScore;
    
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
                                moveObject=moveEvaluation([moveRow,moveCol],turn,defFactor,board)
                                moveValue=moveObject.score
                                atkThreats=moveObject.atkThreats;
                                defThreats=moveObject.defThreats;
                                //check offence threats, if there is move to form five in-a-row threat, only consider such threat
                                for(atkThreatIndex=0;atkThreatIndex<4;atkThreatIndex++){
                                    if (atkThreats[atkThreatIndex]===5){
                                        moveCollection=[[moveRow,moveCol]]
                                        return moveCollection
                                    }
                                }
                                //check offence threats, if there is move to prevent five in-a-row threat, only consider such threat
                                for(defThreatsIndex=0;defThreatsIndex<4;defThreatsIndex++){
                                    if (defThreats[defThreatsIndex]===5){
                                        moveCollection=[[moveRow,moveCol]]
                                        return moveCollection
                                    }
                                }
                                moveWithScore={move:[moveRow,moveCol],score:moveValue}
                                //second priority moves
                                if(moveValue>=30*defFactor){

                                    movePriorities.push(moveWithScore)

                                //third priority moves
                                } else {
                                    // console.log("moveWithScore.move: "+moveWithScore.move)
                                    // console.log("moveWithScore.score: "+moveWithScore.score)
                                    moveNormals.push(moveWithScore)
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
            moveCollection.push(movePriorities[moveIndex].move)

        }
        return moveCollection
        
    } else {
        moveNormals.sort((move1,move2)=>move1.score-move2.score)
        // console.log("moveNormals: "+moveNormals)
        for (moveIndex=0;moveIndex<branchFactor;moveIndex++){
            // console.log("move: "+moveNormals[moveIndex].move)
            move=moveNormals[moveIndex].move
            moveCollection.push(move)
        }
        return moveCollection;
    }

   
}

export default movesSearch;