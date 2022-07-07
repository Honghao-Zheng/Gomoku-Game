import {copyTwoDimArray,random} from "../../GeneralAlgorithms.jsx"
import chooseRandomMove from "../RandomPlayer.jsx";
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
        move=chooseRandomMove(boardCopy)
    }
    individualMoves.push(move)
    
    
    for(d=1;d<=depth-1;d++){
        putDownPiece(move,turn,boardCopy)
        possibleMoves=movesSearch(boardCopy);
        numOfMoves=possibleMoves.length;
        moveIndex=random(numOfMoves);
        move=possibleMoves[moveIndex];
        individualMoves.push(move)
    }

}


function movesSearch(board){
    let rowCoord;
    let colCoord;
    let moveCollection=[];
    let searchRange=[-1,1]
    let i,j
    let rowIndex,colIndex;
    let moveRow,moveCol;
    for (rowCoord=0;rowCoord<15;rowCoord++){
        for (colCoord=0;colCoord<15;colCoord++){
            if (board[rowCoord][colCoord]!==" "){
                for(i=0;i<searchRange.length;i++){
                    for(j=0;j<searchRange.length;j++){
                        rowIndex=searchRange[i];
                        colIndex=searchRange[j];
                        moveRow=rowCoord+rowIndex;
                        moveCol=colCoord+colIndex
                        if(
                            moveRow>=0 &&
                            moveRow<=14 &&
                            moveCol>=0 &&
                            moveCol <=14 
                            
                        ){
                            if(board[moveRow][moveCol]===" "){
                                moveCollection.push([moveRow,moveCol])
                            }

                        }
                    }
                }
            }

        }
    }
    return moveCollection;
}

export default initIndMoves;