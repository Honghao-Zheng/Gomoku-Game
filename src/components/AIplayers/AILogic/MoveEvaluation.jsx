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
    // console.log("vThreat: "+vThreat)
    let hThreat=threatRecognise(horizontalCheck(rowCoord,colCoord,pieceColor,board));
    // console.log("hThreat: "+hThreat)
    let d1Threat=threatRecognise(leftBotToRightTopCheck(rowCoord,colCoord,pieceColor,board));
    // console.log("d1Threat: "+d1Threat)
    let d2Threat=threatRecognise(leftTopToRightBotCheck(rowCoord,colCoord,pieceColor,board));
    // console.log("d2Threat: "+d2Threat)

    let threats=[vThreat,hThreat,d1Threat,d2Threat];
    // let threats=[hThreat];
    let threatIndex;
    let threat;
    for (threatIndex=0;threatIndex<threats.length;threatIndex++){
        threat=threats[threatIndex]
        if (threat===2){
            score+=2;
        } else if(threat===21){
            score +=1;
        } else if(threat===31){
            score+=4;
        } else if(threat===3){
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
        } else if(threat===4){
            fourCount++;
            if (fourCount>=2 ){
                score+=1
            } else {
                score+=32;
            }
        } else if(threat===41){
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
    }   else if(threat===5){
        fiveCount++;
        if (fiveCount===1){
            score+=128;
        } else{
            score+=1;
        }
    }
}
    // console.log("attack move evaluation:"+score)
    return score

}

function verticalCheck(rowCoord,colCoord,pieceColor,board){
    let sameColorCount=-1;
    let oppositeColorCount=0;
    let rowIndex=rowCoord;
    let colIndex=colCoord;
    let occupant;
    let counts;
    // console.log("rowIndex: "+rowIndex)
    // console.log("colIndex: "+colIndex)
    // console.log("board[rowIndex][colIndex]: "+board[rowIndex][colIndex])
    while( rowIndex>=0){
        occupant=board[rowIndex][colIndex];
        if (occupant!==" " ){
            // console.log("check top rowIndex: "+rowIndex)
            // console.log("check top colIndex: "+colIndex)
            
            if (occupant===pieceColor){
                sameColorCount++
            } else {
                oppositeColorCount++;
                break;
            }
            rowIndex--;
        } else {
            break;
        };

        }

    rowIndex=rowCoord;
    colIndex=colCoord;
    while(rowIndex<15){
        occupant=board[rowIndex][colIndex];
        if(occupant!==" "){
            // console.log("check bot rowIndex: "+rowIndex)
            // console.log("check bot colIndex: "+colIndex)
            
            if (occupant===pieceColor){
                sameColorCount++
            } else {
                oppositeColorCount++;
                break;
            }
            rowIndex++;

        } else{
            break;
        }

    }
    counts={sameColor:sameColorCount, oppositeColor:oppositeColorCount}
    // console.log("vertical same counts: "+counts.sameColor)
    // console.log("vertical opposite counts: "+counts.oppositeColor)
    return counts
}


function horizontalCheck(rowCoord,colCoord,pieceColor,board){
    let sameColorCount=-1;
    let oppositeColorCount=0;
    let rowIndex=rowCoord;
    let colIndex=colCoord;
    // console.log("rowCoord: "+rowCoord)
    // console.log("colCoord: "+colCoord)
    // console.log("pieceColor: "+pieceColor)
    let occupant;
    let counts;

    while( colIndex>=0){
        occupant=board[rowIndex][colIndex];
        if (occupant!==" "){
            
            if (occupant===pieceColor){
                sameColorCount++
            } else {
                oppositeColorCount++;
                break;
            }
            colIndex--;
        } else {
            break;
        }

    };
    rowIndex=rowCoord;
    colIndex=colCoord;
    while(colIndex<15){
        occupant=board[rowIndex][colIndex];
        if(occupant!==" " ){
            if (occupant===pieceColor){
                sameColorCount++
            } else {
                oppositeColorCount++;
                break;
            }
            colIndex++;
        } else {
            break;
        }

    }
    counts={sameColor:sameColorCount, oppositeColor:oppositeColorCount}
    // console.log("horizontal same counts: "+counts.sameColor)
    // console.log("horizontal opposite counts: "+counts.oppositeColor)
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
        while(rowIndex>=0 && colIndex<15){
            occupant=board[rowIndex][colIndex];
            if(occupant!==" "){
                
                // console.log("rowIndex: "+rowIndex) 
                // console.log("colIndex: "+colIndex) 
                // console.log("occupant: "+occupant) 
                if (occupant===pieceColor){
                    sameColorCount++;    
                    // console.log("sameColorCount: "+sameColorCount)        
                } else {
                    oppositeColorCount++;
                    break;
                }
                rowIndex--;
                colIndex++;
            } else{
                break;
            }

    }
    //to left bot
    rowIndex=rowCoord;
    colIndex=colCoord;
    while( colIndex>=0 && rowIndex<15){
        occupant=board[rowIndex][colIndex];
        if (occupant!==" "){
            if (occupant===pieceColor){
                sameColorCount++;    
                // console.log(count)        
            } else {
                oppositeColorCount++;
                break;
            }
            colIndex--;
            rowIndex++;
        } else{
            break;
        }

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
        while(rowIndex>=0 && colIndex>=0){
        occupant=board[rowIndex][colIndex];
        if(occupant!==" " ){
            if (occupant===pieceColor){
                sameColorCount++;    
                // console.log(count)        
            } else {
                oppositeColorCount++;
                break;
            }
            rowIndex--;
            colIndex--;
        } else{
            break;
        }

    }
    rowIndex=rowCoord;
    colIndex=colCoord;
    while(colIndex<15 && rowIndex<15){
        occupant=board[rowIndex][colIndex];
        if(occupant!==" " ){
            if (occupant===pieceColor){
                sameColorCount++;    
                // console.log(count)        
            } else {
                oppositeColorCount++;
                break;
            }
            colIndex++;
            rowIndex++;
        } else{
            break;
        }

    }

    counts={sameColor:sameColorCount, oppositeColor:oppositeColorCount}
    return counts
}

function threatRecognise(counts){
    let sameColorCount= counts.sameColor;
    let oppositeColorCount=counts.oppositeColor;
    // console.log("threatRecognise sameColorCount: "+sameColorCount)
    // console.log("threatRecognise oppositeColorCount: "+oppositeColorCount)
    let threat=null;
    if (sameColorCount===2 && oppositeColorCount===0){
        threat=2
    } else if (sameColorCount===2 && oppositeColorCount===1) {
        threat=21
    } else if (sameColorCount===2 && oppositeColorCount===1) {
        threat=21
    } else if (sameColorCount===3 && oppositeColorCount===0) {
        threat=3
    } else if (sameColorCount===3 && oppositeColorCount===1) {
        threat=31
    } else if (sameColorCount===4 && oppositeColorCount===0) {
        threat=4
    } else if (sameColorCount===4 && oppositeColorCount===1) {
        threat=41
    } else if ( sameColorCount>=5){
    threat=5
    }
return threat
}

function moveEvaluation(move,pieceColor,defFactor,board){
    let offenceScore=atkMoveEvaluation(move,pieceColor,board);
    let oppositeColor=swapColor(pieceColor);
    // console.log("occupied colour before change: "+board[move[0]][move[1]])
    board[move[0]][move[1]]=oppositeColor;
    // console.log("occupied colour after change: "+board[move[0]][move[1]])
    let defenceScore=atkMoveEvaluation(move,oppositeColor,board)*defFactor;
    board[move[0]][move[1]]=pieceColor;
    // console.log("occupied colour after change back: "+board[move[0]][move[1]])
    // let boardCopy=copyTwoDimArray(board);
    // boardCopy[move[0]][move[1]]=oppositeColor;
    // let defenceScore=atkMoveEvaluation(move,oppositeColor,boardCopy)*defFactor;
    let totalScore=offenceScore+defenceScore;
    // let totalScore=offenceScore;
    // console.log("moveEvaluation function score:"+totalScore)
    return totalScore;

}

export default moveEvaluation;