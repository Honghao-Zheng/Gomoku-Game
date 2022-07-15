


import {swapColor,putDownPiece} from "../../GameLogic.jsx"
import {copyTwoDimArray,random,shuffle} from "../../GeneralAlgorithms.jsx"
import {individual} from "../GA/Objects";


function minimaxMove(turn,depth,defFactor,board){
    let opponentColor=swapColor(turn)
    let avalibleMoves1= movesSearch(board)
    let moveIndex1;
    let moveIndex2;
    let moveMade1;
    let moveMade2;
    let B1Score;
    let B2Score;
    let bestScore1;
    let bestScore2
    let avalibleMoves2;
    let bestMove;
    let B1;
    let B2;
    bestScore1=-100000;
    //first depth, consider different computer moves
    for (moveIndex1=0;moveIndex1<avalibleMoves1.length;moveIndex1++){
        B1=copyTwoDimArray(board)
        moveMade1=avalibleMoves1[moveIndex1]
        putDownPiece(moveMade1,turn,B1)
        avalibleMoves2=movesSearch(B1)
        bestScore2=100000;
        //second depth, consider different opponent moves
        for (moveIndex2=0;moveIndex2<avalibleMoves2.length;moveIndex2++){
            B2=copyTwoDimArray(board)
            moveMade2=avalibleMoves2[moveIndex2]
            putDownPiece(moveMade2,opponentColor,B2)
            //compute score for move
            B2Score=-moveEvaluation(moveMade2,opponentColor,defFactor,B2)
            //assume there is at least one B2 board, selecting the minimum B2 score.
            if(B2Score<=bestScore2){
                bestScore2=B2Score
            }
        }
        //compute the minimum score picked by the opponent, the minimum score will be the score of B1
        B1Score=bestScore2;
        if(B1Score>=bestScore1){
            bestScore1=B1Score;
            bestMove=moveMade1;
        }    
    }
    return bestMove;
}

function moveEvaluation(move,pieceColor,defFactor,board){
    let offenceScore=atkMoveEvaluation(move,pieceColor,board);
    let oppositeColor=swapColor(pieceColor);
    let boardCopy=copyTwoDimArray(board);
    boardCopy[move[0]][move[1]]=oppositeColor;
    let defenceScore=atkMoveEvaluation(move,oppositeColor,boardCopy)*defFactor;
    let totalScore=offenceScore+defenceScore;
    // let totalScore=offenceScore;
    // console.log("moveEvaluation function score:"+totalScore)
    return totalScore;

}

function movesSearch(board){
    let rowCoord;
    let colCoord;
    let moveCollection=[];
    // let searchRange=[-1,1]
    // let i,j
    let rowIndex,colIndex;
    let moveRow,moveCol;
    for (rowCoord=0;rowCoord<15;rowCoord++){
        for (colCoord=0;colCoord<15;colCoord++){
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