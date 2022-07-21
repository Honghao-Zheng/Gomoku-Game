// function fitness2(moveComb,pieceColor,defFactor,board){
//     let index;
//     let turn=pieceColor;
//     let totalFitnessScore=0;
//     let moveMade;
//     let boardCopy=copyTwoDimArray(board);
//     // console.log("moveComb1: "+moveComb)
//     for(index=0;index<moveComb.length;index++){
//         moveMade=moveComb[index];
//         //discard illegal moveComb
//         if(
//             moveMade[0]<15 && moveMade[0]>=0 && moveMade[1]<15 && moveMade[1]>=0){
//                 if(boardCopy[moveMade[0]][moveMade[1]] ===" "){
//                     putDownPiece(moveMade,turn,boardCopy)
//                     if(turn===pieceColor){
//                         totalFitnessScore+=moveEvaluation(moveMade,turn,defFactor,boardCopy)
//                     } else{
//                         totalFitnessScore-=moveEvaluation(moveMade,turn,defFactor,boardCopy)
//                     }
                    
//                 } else {
//                     return -10000;
//                 }
//         } else{
//             return -10000;
            
//         }
//         turn=swapColor(turn)
//         return totalFitnessScore
//     }
    
    
// }