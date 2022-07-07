import {swapColor} from "../../GameLogic.jsx";
import {copyTwoDimArray} from "../../GeneralAlgorithms.jsx"
function atkMoveEvaluation(move,pieceColor,board){
    let rowCoord=move[0];
    let colCoord=move[1];
    let score=0;

    let threeCount=0;
    let fourCount=0;
    let fourOneCount=0;
    let fiveCount=0;
    let vThreat=threatRecognise(verticalCheck(rowCoord,colCoord,pieceColor,board));
    let hThreat=threatRecognise(horizontalCheck(rowCoord,colCoord,pieceColor,board));
    let d1Threat=threatRecognise(leftBotToRightTopCheck(rowCoord,colCoord,pieceColor,board));
    let d2Threat=threatRecognise(leftTopToRightBotCheck(rowCoord,colCoord,pieceColor,board));
    let threats=[vThreat,hThreat,d1Threat,d2Threat];
    threats.map((threat,index)=>{
        switch(threat){
            case 2:
                score+=2;
                break;
            case 21:
                score +=1;
                break;
            case 31:
                score+=4;
                break;
            // two 3 in a row form a winning threat so high point, more than that no much point
            case 3:
                threeCount++;
                if (threeCount===2 ){
                    score+=22
                } else if (threeCount>=3){
                    score+=1;
                } else {
                    if(fourOneCount===1){
                        score+=14
                    } else{
                        score+=8
                    }                    
                }             
                break;
            //no much point for multiple 4 in a row
            case 4:
                fourCount++;
                if (fourCount>=2 ){
                    score+=1
                } else {
                    score+=32;
                }
                
                break;
            case 41:
                fourOneCount++;
                if (fourOneCount===1){
                    if(threeCount===1){
                        score+=22

                    }else{
                        score+=16
                    }
                } else{
                    score+=1
                }
                
                
                break;
            default:
                score+=0;
    }
    if(threat===5){
        fiveCount++;
        if (fiveCount===1){
            score+=128;
        } else{
            score+=1;
        }
    }
    return score

    })



}

function verticalCheck(rowCoord,colCoord,pieceColor,board){
    let sameColorCount=-1;
    let oppositeColorCount=0;
    let rowIndex=rowCoord;
    let colIndex=colCoord;
    let occupant;
    let counts;

    while(board[rowIndex][colIndex]!==" " && rowIndex>=0){
        occupant=board[rowIndex][colIndex];
        if (occupant===pieceColor){
            sameColorCount++
        } else {
            oppositeColorCount++;
            break;
        }
        rowIndex--;
    };
    rowIndex=rowCoord;
    colIndex=colCoord;
    while(board[rowIndex][colIndex]!==" " && rowIndex<15){
        occupant=board[rowIndex][colIndex];
        if (occupant===pieceColor){
            sameColorCount++
        } else {
            oppositeColorCount++;
            break;
        }
        rowIndex++;
    }
    counts={sameColor:sameColorCount, oppositeColor:oppositeColorCount}
    return counts
}


function horizontalCheck(rowCoord,colCoord,pieceColor,board){
    let sameColorCount=-1;
    let oppositeColorCount=0;
    let rowIndex=rowCoord;
    let colIndex=colCoord;
    let occupant;
    let counts;

    while(board[rowIndex][colIndex]!==" " && colIndex>=0){
        occupant=board[rowIndex][colIndex];
        if (occupant===pieceColor){
            sameColorCount++
        } else {
            oppositeColorCount++;
            break;
        }
        colIndex--;
    };
    rowIndex=rowCoord;
    colIndex=colCoord;
    while(board[rowIndex][colIndex]!==" " && colIndex<15){
        occupant=board[rowIndex][colIndex];
        if (occupant===pieceColor){
            sameColorCount++
        } else {
            oppositeColorCount++;
            break;
        }
        colIndex++;
    }
    counts={sameColor:sameColorCount, oppositeColor:oppositeColorCount}
    return counts
}


function leftBotToRightTopCheck (rowCoord,colCoord,pieceColor,board){

    let sameColorCount=-1;
    let oppositeColorCount=0;
    let rowIndex=rowCoord;
    let colIndex=colCoord;
    let occupant;
    let counts;

    //to right top
        while(board[rowIndex][colIndex]!==" " && rowIndex>=0 && colIndex<15){
        occupant=board[rowIndex][colIndex];
        if (occupant===pieceColor){
            sameColorCount++;    
            // console.log(count)        
        } else {
            oppositeColorCount++;
            break;
        }
        rowIndex--;
        colIndex++;
    }
    //to left bot
    while(board[rowIndex][colIndex]!==" " && colIndex>=0 && rowIndex<15){
        occupant=board[rowIndex][colIndex];
        if (occupant===pieceColor){
            sameColorCount++;    
            // console.log(count)        
        } else {
            oppositeColorCount++;
            break;
        }
        colIndex--;
        rowIndex++;
    }

    counts={sameColor:sameColorCount, oppositeColor:oppositeColorCount}
    return counts

}


function leftTopToRightBotCheck (rowCoord,colCoord,pieceColor,board){

    let sameColorCount=-1;
    let oppositeColorCount=0;
    let rowIndex=rowCoord;
    let colIndex=colCoord;
    let occupant;
    let counts;
    //to leftTop
        while(board[rowIndex][colIndex]!==" " && rowIndex>=0 && colIndex>=0){
        occupant=board[rowIndex][colIndex];
        if (occupant===pieceColor){
            sameColorCount++;    
            // console.log(count)        
        } else {
            oppositeColorCount++;
            break;
        }
        rowIndex--;
        colIndex--;
    }
    while(board[rowIndex][colIndex]!==" " && colIndex<15 && rowIndex<15){
        occupant=board[rowIndex][colIndex];
        if (occupant===pieceColor){
            sameColorCount++;    
            // console.log(count)        
        } else {
            oppositeColorCount++;
            break;
        }
        colIndex++;
        rowIndex++;
    }

    counts={sameColor:sameColorCount, oppositeColor:oppositeColorCount}
    return counts
}

function threatRecognise(counts){
    let sameColorCount= counts.sameColor;
    let oppositeColorCount=counts.oppositeColor;
    let threat=null;
    switch([sameColorCount,oppositeColorCount]){
        case [2,0]:
            threat=2;
            break;
        case [2,1]:
            threat=21;
            break;
        case [3,0]:
            threat=3;
            break;
        case [3,1]:
            threat=31;
            break;
        case [4,0]:
            threat=4;
            break;
        case [4,1]:
            threat=41;
            break;
        default:
            threat=null;
}
if (sameColorCount>=5){
    threat=5
}
return threat
}

function moveEvaluation(move,pieceColor,defFactor,board){
    let offenceScore=atkMoveEvaluation(move,pieceColor,board);
    let oppositeColor=swapColor(pieceColor);
    let boardCopy=copyTwoDimArray(board);
    boardCopy[move[0]][move[1]]=oppositeColor;
    let defenceScore=atkMoveEvaluation(move,oppositeColor,boardCopy)*defFactor;
    let totalScore=offenceScore+defenceScore;
    return totalScore;

}

export default moveEvaluation;