// function atkMoveEvaluation(move,pieceColor,board){
//     let rowCoord=move[0];
//     let colCoord=move[1];
//     let score=0;

//     let threeCount=0;
//     let fourCount=0;
//     let fourOneCount=0;
//     let fiveCount=0;
//     let vThreat=threatRecognise(verticalCheck(rowCoord,colCoord,pieceColor,board));
//     // console.log("vThreat: "+vThreat)
//     let hThreat=threatRecognise(horizontalCheck(rowCoord,colCoord,pieceColor,board));
//     // console.log("hThreat: "+hThreat)
//     let d1Threat=threatRecognise(leftBotToRightTopCheck(rowCoord,colCoord,pieceColor,board));
//     // console.log("d1Threat: "+d1Threat)
//     let d2Threat=threatRecognise(leftTopToRightBotCheck(rowCoord,colCoord,pieceColor,board));
//     // console.log("d2Threat: "+d2Threat)

//     let threats=[vThreat,hThreat,d1Threat,d2Threat];
//     // let threats=[hThreat];
//     let threatIndex;
//     let threat;
//     for (threatIndex=0;threatIndex<threats.length;threatIndex++){
//         threat=threats[threatIndex]
//         if (threat===2){
//             score+=2;
//         } else if(threat===21){
//             score +=1;
//         } else if(threat===31){
//             score+=4;
//         } else if(threat===3){
//             threeCount++;
//             if (fourOneCount===0 && threeCount===1){
//                 score+=10
//             } else if(fourOneCount===1 && threeCount===1){
//                 score+=25
//             } else if (fourOneCount===0 && threeCount===2){
//                 score+=30
//             }   
//         } else if(threat===4){
//             fourCount++;
//             if (fourCount===1 ){
//                 score+=50;
//             } 
//         } else if(threat===41){
//             fourOneCount++;
//             if (fourOneCount===1 && threeCount===0){
//                 score+=20
//             } else if(fourOneCount===1 && threeCount===1){
//                 score+=35
//             } else  if (fourOneCount===1 && threeCount>=2){
//                 score+=5
//             }else if (fourOneCount===2 && threeCount===0){
//                 score+=30
//             }  else if (fourOneCount===2 && threeCount===1){
//                 score+=5
//             } 
           
//     }   else if(threat===5){
//         fiveCount++;
//         if (fiveCount===1){
//             score+=250;
//         } 
//     }
// }
//     // console.log("attack move evaluation:"+score)
//     return {score:score, threats:threats}

}