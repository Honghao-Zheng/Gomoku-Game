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

function rightDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let colInex;
    if (pieceColour !==" "){
        count=0
        for(colInex=pieceColCoord;colInex<pieceColCoord+5 && colInex<15;colInex++){
            if (board[pieceRowCoord][colInex]===pieceColour){
                count++;               
            } else {
                break;
            }
        }
        // console.log(count)
        if (count===5){
            // console.log(pieceColour)
            return pieceColour;
        }
    }
    return null;
}

function rightTopDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let rowInex=pieceRowCoord;
    let colInex=pieceColCoord;
    if (pieceColour !==" "){
        count=0
        while(rowInex>pieceRowCoord-5 && rowInex>=0 && colInex<pieceColCoord+5 && colInex<15){

        if (board[rowInex][colInex]===pieceColour){
            count++;               
        } else {
            break;
        }
        rowInex--;
        colInex++;
    }
        // console.log(count)
        if (count===5){
            // console.log(pieceColour)
            return pieceColour;
        }
    }
    return null;
}

function topDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let rowInex;
    if (pieceColour !==" "){
        count=0
        for(rowInex=pieceRowCoord;rowInex>pieceRowCoord-5 && rowInex>=0;rowInex--){
            if (board[rowInex][pieceColCoord]===pieceColour){
                count++;               
            } else {
                break;
            }
        }
        // console.log(count)
        if (count===5){
            // console.log(pieceColour)
            return pieceColour;
        }
    }
    return null;
}


function topLeftDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let rowInex=pieceRowCoord;
    let colIndex=pieceColCoord;
    if (pieceColour !==" "){
        count=0
        while (rowInex>pieceRowCoord-5 && rowInex>=0 && colIndex>pieceColCoord-5 && colIndex>=0){
            if (board[rowInex][colIndex]===pieceColour){
                count++;               
            } else {
                break;
            }
            rowInex--
            colIndex--
        }

        // console.log(count)
        if (count===5){
            // console.log(pieceColour)
            return pieceColour;
        }
    }
    return null;
}

function leftDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let colIndex;
    if (pieceColour !==" "){
        count=0
        for(colIndex=pieceColCoord;colIndex>pieceColCoord-5 && colIndex>=0;colIndex--){
            if (board[pieceRowCoord][colIndex]===pieceColour){
                count++;               
            } else {
                break;
            }
        }
        // console.log(count)
        if (count===5){
            // console.log(pieceColour)
            return pieceColour;
        }
    }
    return null;
}

function leftBotDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let rowInex=pieceRowCoord;
    let colIndex=pieceColCoord;
    if (pieceColour !==" "){
        count=0
        while(colIndex>pieceColCoord-5 && colIndex>=0 && rowInex<pieceRowCoord+5 && rowInex<15){
            if (board[rowInex][colIndex]===pieceColour){
                count++;               
            } else {
                break;
            }
            colIndex--
            rowInex++
        }

        // console.log(count)
        if (count===5){
            // console.log(pieceColour)
            return pieceColour;
        }
    }
    return null;
}

function botDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count;
    let rowInex;
    if (pieceColour !==" "){
        count=0
        for(rowInex=pieceRowCoord;rowInex<pieceRowCoord+5 && rowInex<15;rowInex++){
            if (board[rowInex][pieceColCoord]===pieceColour){
                count++;               
            } else {
                break;
            }
        }
        // console.log(count)
        if (count===5){
            // console.log(pieceColour)
            return pieceColour;
        }
    }
    return null;
}

function botRightDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board){
    let count=0;
    let rowInex=pieceRowCoord;
    let colIndex=pieceColCoord;
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
    if (count===5){
        // console.log(pieceColour)
        return pieceColour;
    }

    return null;
}

function checkWinning(pieceColour,pieceRowCoord,pieceColCoord,board){
    let whoWin=null;
    let top=topDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    let topLeft=topLeftDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    let left=leftDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    let leftBot=leftBotDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    let bot=botDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    let botRight=botRightDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    let right=rightDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board);
    let rightTop=rightTopDirectionCheck(pieceColour,pieceRowCoord,pieceColCoord,board);

    if (top!==null){
        whoWin=top;
    } else if(topLeft !==null){
        whoWin=topLeft;
    } else if(left !==null){
        whoWin=left;
    } else if(leftBot !==null){
        whoWin=leftBot;
    } else if(bot !==null){
        whoWin=bot;
    } else if(botRight !==null){
        whoWin=botRight;
    } else if(right !==null){
        whoWin=right;
    } else if (rightTop !==null){
        whoWin=rightTop;
    }
    return whoWin;
            }
    //     }
    // }



export { putDownPiece,checkWinning};
