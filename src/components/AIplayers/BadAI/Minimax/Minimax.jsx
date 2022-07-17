// function minimaxMove(turn,depthAwayFromRoot,depthAwayFromLeaf,board){
//     depthAwayFromLeaf-=2;
//     let opponentColor=swapColor(turn)
//     let avalibleMoves1= movesSearch(board)
//     let moveIndex1;
//     let moveIndex2;
//     let moveMade1;
//     let moveMade2;
//     let B1Score;
//     let B2Score;
//     let bestScore1;
//     let bestScore2
//     let avalibleMoves2;
//     let bestMove;
//     let B1;
//     let B2;
//     let defFactor=0.9;
//     bestScore1=-100000;
//     //first depth, consider different computer moves
//     for (moveIndex1=0;moveIndex1<avalibleMoves1.length;moveIndex1++){
//         B1=copyTwoDimArray(board)
//         moveMade1=avalibleMoves1[moveIndex1]
//         putDownPiece(moveMade1,turn,B1)
//         avalibleMoves2=movesSearch(B1)
//         bestScore2=100000;
//         //second depth, consider different opponent moves
//         for (moveIndex2=0;moveIndex2<avalibleMoves2.length;moveIndex2++){
//             B2=copyTwoDimArray(B1)
//             moveMade2=avalibleMoves2[moveIndex2]
//             putDownPiece(moveMade2,opponentColor,B2)
//             //evaluate score for move once it reached the leaf node
//             if(depthAwayFromLeaf===0){
//                 B2Score=-moveEvaluation(moveMade2,opponentColor,defFactor,B2)          
//             } else {
//                 depthAwayFromRoot+=2
//                 B2Score=minimaxMove(turn,depthAwayFromRoot,depthAwayFromLeaf,board)
//                 depthAwayFromRoot-=2
//             }
//             if(B2Score<=bestScore2){
//                 bestScore2=B2Score
//             }
//             //assume there is at least one B2 board, selecting the minimum B2 score.
//         }
//         //compute the minimum score picked by the opponent, the minimum score will be the score of B1
//         B1Score=bestScore2;
//         if(B1Score>=bestScore1){
//             bestScore1=B1Score;
//             bestMove=moveMade1;
//         }    
//     }
//     if(depthAwayFromRoot !==0  ){
//         return bestScore1;
//     } else {
//         return bestMove;
//     }
    
// }



//two depth without early ending

// function minimaxMoveTwoD(turn,board){
//     let opponentColor=swapColor(turn)

//     let defFactor=0.9;
//     let branchFactor=5
//     // let avalibleMoves1= movesSearch(turn,defFactor,board,branchFactor)
//     let avalibleMoves1= movesSearch(turn,defFactor,board,branchFactor)
//     let moveIndex1;
//     let moveIndex2;
//     let moveMade1;
//     let moveMade2;
//     let B1Score;
//     let B2Score;
//     let bestScore1;
//     let bestScore2
//     let avalibleMoves2;
//     let bestMove;
//     let B1;
//     let B2;

//     bestScore1=-100000;
//     //first depth, consider different computer moves
//     for (moveIndex1=0;moveIndex1<avalibleMoves1.length;moveIndex1++){
//         B1=copyTwoDimArray(board)
//         moveMade1=avalibleMoves1[moveIndex1].move
//         putDownPiece(moveMade1,turn,B1)
//         avalibleMoves2=movesSearch(opponentColor,defFactor,B1,branchFactor)
//         bestScore2=100000;
//         //second depth, consider different opponent moves
//         for (moveIndex2=0;moveIndex2<avalibleMoves2.length;moveIndex2++){
//             B2=copyTwoDimArray(board)
//             moveMade2=avalibleMoves2[moveIndex2].move
//             // console.log("moveMade2: "+moveMade2)
//             putDownPiece(moveMade2,opponentColor,B2)
//             //compute score for move
//             B2Score=-moveEvaluation(moveMade2,opponentColor,defFactor,B2).score
//             //assume there is at least one B2 board, selecting the minimum B2 score.
//             if(B2Score<=bestScore2){
//                 bestScore2=B2Score
//             }
//         }
//         //compute the minimum score picked by the opponent, the minimum score will be the score of B1
//         B1Score=bestScore2;
//         if(B1Score>=bestScore1){
//             bestScore1=B1Score;
//             bestMove=moveMade1;
//         }    
//     }
//     return bestMove;
// }
