

// function minimaxMove(turn,depthAwayFromRoot,depthAwayFromLeaf,board){
//     depthAwayFromLeaf-=2;
//     let defFactor=0.9;
//     let branchFactor=5
//     let opponentColor=swapColor(turn)
//     let avalibleMoves1= movesSearch(turn,defFactor,board,branchFactor)
//     let moveIndex1;
//     let moveIndex2;
//     let moveMade1;
//     let moveMade2;
//     let B1Score;
//     let B2Score;
//     let bestScore1;
//     let bestScore2;
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
//         avalibleMoves2=movesSearch(turn,defFactor,board,branchFactor)
//         bestScore2=100000;
//         //second depth, consider different opponent moves
//         for (moveIndex2=0;moveIndex2<avalibleMoves2.length;moveIndex2++){
//             B2=copyTwoDimArray(B1)
//             moveMade2=avalibleMoves2[moveIndex2].move
//             putDownPiece(moveMade2,opponentColor,B2)
//             //evaluate score for move once it reached the leaf node
//             if(depthAwayFromLeaf===0){
//                 B2Score=-moveEvaluation(moveMade2,opponentColor,defFactor,B2).score          
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
//     //return the score back to the parent node
//     if(depthAwayFromRoot !==0  ){
//         return bestScore1;
//     //if already in the first two depth, return the move.
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


//two depth with early stoping
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
//             if(avalibleMoves1[moveIndex1].atkThreats.includes(5)){
//             bestScore1=avalibleMoves1[moveIndex1].score;
//             bestMove=moveMade1
//             break;
//         } else{
//             B1Score=bestScore2;
//             if(B1Score>=bestScore1){
//                 bestScore1=B1Score;
//                 bestMove=moveMade1;
//             }
//         }
//         //compute the minimum score picked by the opponent, the minimum score will be the score of B1
//         // B1Score=bestScore2;
//         // if(B1Score>=bestScore1){
//         //     bestScore1=B1Score;
//         //     bestMove=moveMade1;
//         // }    
//     }
//     return bestMove;
// }


// 4 depth Minimax
// function minimaxMoveBad(turn,board){
//     let defFactor=0.8;
//     let branchFactor=5;
//     let opponentColor=swapColor(turn)

//     let avalibleMoves1;
//     let avalibleMoves2;
//     let avalibleMoves3;
//     let avalibleMoves4;
//     let moveIndex1;
//     let moveIndex2;
//     let moveIndex3;
//     let moveIndex4;
//     let moveMade1;
//     let moveMade2;
//     let moveMade3;
//     let moveMade4;
//     let B1Score;
//     let B2Score;
//     let B3Score;
//     let B4Score;
//     let bestScore1;
//     let bestScore2;
//     let bestScore3;
//     let bestScore4;
//     let bestMove;
//     let B1;
//     let B2;
//     let B3;
//     let B4;
//     //beta1 initial value
//     bestScore1=-100000;
//     avalibleMoves1= movesSearch(turn,defFactor,board,branchFactor)
//     //first depth, consider different computer moves
//     for (moveIndex1=0;moveIndex1<avalibleMoves1.length;moveIndex1++){
//         B1=copyTwoDimArray(board)
//         moveMade1=avalibleMoves1[moveIndex1].move
//         putDownPiece(moveMade1,turn,B1)
//         avalibleMoves2=movesSearch(opponentColor,defFactor,B1,branchFactor)
//         //alpha2 initial value
//         bestScore2=100000;
//         //second depth, consider different opponent moves
//         for (moveIndex2=0;moveIndex2<avalibleMoves2.length;moveIndex2++){
//             B2=copyTwoDimArray(B1)
//             moveMade2=avalibleMoves2[moveIndex2].move
//             putDownPiece(moveMade2,opponentColor,B2)
//             avalibleMoves3=movesSearch(turn,defFactor,B2,branchFactor)
//             //beta3 initial value
//             bestScore3=-100000;
//             //evaluate score for move once it reached the leaf node
//             for (moveIndex3=0;moveIndex3<avalibleMoves3.length;moveIndex3++){
//                 B3=copyTwoDimArray(B2)
//                 moveMade3=avalibleMoves3[moveIndex3].move
//                 putDownPiece(moveMade3,turn,B3)
//                 avalibleMoves4=movesSearch(opponentColor,defFactor,B3,branchFactor)
                
//                 bestScore4=100000;
//                 for (moveIndex4=0;moveIndex4<avalibleMoves4.length;moveIndex4++){
//                     B4=copyTwoDimArray(B3)
//                     moveMade4=avalibleMoves4[moveIndex4].move
//                     putDownPiece(moveMade4,opponentColor,B4)
//                     B4Score=-moveEvaluation(moveMade4,opponentColor,defFactor,B4).score  

//                     if(B4Score<=bestScore4){
//                         bestScore4=B4Score
//                         if(B4Score<=bestScore3){
//                             break;
//                         }
//                     }
//             }
// //             console.log("--------------------")
// //             console.log("moveIndex3: "+moveIndex3)
// //             console.log("avalibleMoves3: "+avalibleMoves3)
// //             console.log("avalibleMoves3.length: "+avalibleMoves3.length)
// //             console.log("avalibleMoves3[moveIndex3]: "+avalibleMoves3[moveIndex3])
// // console.log("avalibleMoves3[moveIndex3].atkThreats: "+avalibleMoves3[moveIndex3].atkThreats)
//             // if(avalibleMoves3[moveIndex3].atkThreats.includes(5)){
//             //     bestScore3=avalibleMoves3[moveIndex3].score;
//             //     break;
//             // } 
//             B3Score=bestScore4
//             if(B3Score>=bestScore3){
//                 //beta3 score update
//                 bestScore3=B3Score
//                 if(B3Score>=bestScore2){
//                     break;
//                 }
//             }
//         }

//         // if(avalibleMoves2[moveIndex2].atkThreats.includes(5)){
//         //     bestScore2=avalibleMoves2[moveIndex2].score;
//         //     break;
//         // } 
//         B2Score=bestScore3
//         if(B2Score<=bestScore2){
//             //alpha2 score update
//             bestScore2=B2Score
//             if(B2Score<=bestScore1){
//                 break;
//             }
//         }
//     }

//     // if(avalibleMoves1[moveIndex1].atkThreats.includes(5)){
//     //     bestScore1=avalibleMoves1[moveIndex1].score;
//     //     bestMove=moveMade1
//     //     break;
//     // } 
//         B1Score=bestScore2;
//         if(B1Score>=bestScore1){
//             //beta1 score update
//             bestScore1=B1Score;
//             bestMove=moveMade1;

//         }
// }


// return bestMove;
// }