//jshint esversion:6


/*change the board arrangement by modifying the two diementional arrays
if it is a legal move such that the piece is placed in an unoccupied intersection,
output true
*/
function putDownPiece(coord,whoTurn,board){
    var rowCoord=coord[0];
    var colCoord=coord[1];
    if (board[rowCoord][colCoord] ===" "){
        board[rowCoord][colCoord]=whoTurn;
        return true
    } else {
        return false
    }
}

function avalibleMoves(board){
    let avalibleMoves=[];
    let row,col;
    for (row=0;row<board.length;row++){
        for (col=0;col<board[row].length;col++){
        if (board[row][col]===" "){
            avalibleMoves.push([row,col])
        }
        }
    }
    return avalibleMoves;
}

function checkDraw(board){
    let possibleMoves=avalibleMoves(board);
    if(possibleMoves.length===0){
        return true;
    } else{
        return false;
    }
}

function leftToRightCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let colIndex;

        count=-1
        //since it will count itself twice and it will outside of range if we set 
        //colIndex=pieceColCoord-1 for pieceColCoord=0
        colIndex=pieceColCoord;
        for(colIndex=pieceColCoord;colIndex<pieceColCoord+5 && colIndex<15;colIndex++){
            if (board[pieceRowCoord][colIndex]===pieceColour){
                count++;               
            } else {
                break;
            }
        }
        colIndex=pieceColCoord;
        for(colIndex=pieceColCoord;colIndex>pieceColCoord-5 && colIndex>=0;colIndex--){
            if (board[pieceRowCoord][colIndex]===pieceColour){
                count++;               
            } else {
                break;
            }   
    }
        // console.log(count)
        if (count>=5){
            // console.log(pieceColour)
            return pieceColour;
        }
    
    return null;
}



function leftBottoRightTopCheck (pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let rowInex=pieceRowCoord;
    let colIndex=pieceColCoord;

        count=-1
        while(rowInex>pieceRowCoord-5 && rowInex>=0 && colIndex<pieceColCoord+5 && colIndex<15){
        if (board[rowInex][colIndex]===pieceColour){
            count++;       
            // console.log(count)        
        } else {
            break;
        }
        rowInex--;
        colIndex++;
    }
    rowInex=pieceRowCoord;
    colIndex=pieceColCoord
    while(colIndex>pieceColCoord-5 && colIndex>=0 && rowInex<pieceRowCoord+5 && rowInex<15){
        if (board[rowInex][colIndex]===pieceColour){
            count++;        
            // console.log(count)       
        } else {
            break;
        }
        colIndex--
        rowInex++
    }



        // console.log(count)
        if (count>=5){
            // console.log(pieceColour)
            return pieceColour;
        }
    
    return null;
}

function topToBotCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let rowIndex=pieceRowCoord;

        count=-1
        for(rowIndex=pieceRowCoord;rowIndex>pieceRowCoord-5 && rowIndex>=0;rowIndex--){
            if (board[rowIndex][pieceColCoord]===pieceColour){
                count++;               
            } else {
                break;
            }
        }
        rowIndex=pieceRowCoord
        for(rowIndex=pieceRowCoord;rowIndex<pieceRowCoord+5 && rowIndex<15;rowIndex++){
            if (board[rowIndex][pieceColCoord]===pieceColour){
                count++;               
            } else {
                break;
            }
        }
        // console.log(count)
        if (count>=5){
            // console.log(pieceColour)
            return pieceColour;
        }
    
    return null;
}


function topLeftToBotRightCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let rowInex=pieceRowCoord;
    let colIndex=pieceColCoord;

        count=-1
        while (rowInex>pieceRowCoord-5 && rowInex>=0 && colIndex>pieceColCoord-5 && colIndex>=0){
            if (board[rowInex][colIndex]===pieceColour){
                count++;               
            } else {
                break;
            }
            rowInex-- 
            colIndex--
        }
        rowInex=pieceRowCoord;
        colIndex=pieceColCoord;
        while(rowInex<pieceRowCoord+5 && rowInex<15 && colIndex<pieceColCoord+5 && colIndex<15){
            if (board[rowInex][colIndex]===pieceColour){
                count++;               
            } else {
                break;
            }
            // console.log([rowInex,colIndex])
            // console.log(board[rowInex][colIndex])
            rowInex++
            colIndex++
        }
        // console.log(count)
        if (count>=5){
            // console.log(pieceColour)
            return pieceColour;
        }
    
    return null;
}



function checkWinning(pieceColour,coord,board){
    let whoWin=null;
    let [pieceRowCoord,pieceColCoord]=coord;
    let topBot=topToBotCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    // console.log(topBot!==null)
    let leftBottoRightTop=leftBottoRightTopCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    // console.log(leftBottoRightTop!==null)
    let leftright=leftToRightCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    // console.log(leftright!==null)
    let topLeftToBotRight=topLeftToBotRightCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    // console.log(topLeftToBotRight!==null)
    if (checkDraw(board)===true){
        whoWin="D"
    }
//if after draw no one wins then it is a draw
    if (topBot!==null){
        whoWin=topBot;
    } else if(leftBottoRightTop !==null){
        whoWin=leftBottoRightTop;
    } else if(leftright !==null){
        whoWin=leftright;
    } else if(topLeftToBotRight !==null){
        whoWin=topLeftToBotRight;
    } 
    if(whoWin!==null){
        // console.log("found")
    }
    return whoWin;
            }


function swapColor(color){
    if (color==="B"){
        return "W"
    } else{
        return "B"
    }
}

export { putDownPiece,checkWinning, avalibleMoves,checkDraw,swapColor};
