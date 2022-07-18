import {copyTwoDimArray,random} from "../../GeneralAlgorithms.jsx"
import {chooseRandomMoveInit} from "../RandomPlayer.jsx";
import {putDownPiece} from "../../GameLogic.jsx"
import {moveEvaluation} from "./MoveEvaluation"
//!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!
//for the last few moves the depth should start decrease
function initIndMoves(turn,depth,board){
    let boardCopy=copyTwoDimArray(board)
    let move;
    let possibleMoves;
    let numOfMoves;
    let d;
    let moveIndex;
    let individualMoves=[];
    possibleMoves=movesSearch(boardCopy)
    numOfMoves=possibleMoves.length;
    moveIndex=random(numOfMoves);
    if (numOfMoves!==0){
        move=possibleMoves[moveIndex];
    } else{
        move=chooseRandomMoveInit(boardCopy)
    }
    individualMoves.push(move)
    
    
    for(d=1;d<=depth-1;d++){
        putDownPiece(move,turn,boardCopy)
        possibleMoves=movesSearch(boardCopy);
        // console.log(possibleMoves)
        numOfMoves=possibleMoves.length;
        moveIndex=random(numOfMoves);
        move=possibleMoves[moveIndex];
        individualMoves.push(move)
    }
    //    console.log(individualMoves)
    return individualMoves

}

function movesSearch(board){
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
export   {initIndMoves,movesSearch};