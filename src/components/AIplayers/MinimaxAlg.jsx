import {swapColor,putDownPiece} from "../GameLogic.jsx"
import {copyTwoDimArray,random,shuffle} from "../GeneralAlgorithms.jsx"

import movesSearch from "./AILogic/MoveSearch";
import moveEvaluation from "./AILogic/MoveEvaluationMinimax";
// import {movesSearch} from "./AILogic/InitIndMoves";
// import moveEvaluation from "./AILogic/MoveEvaluation";



function minimaxMove(turn,board){
    let defFactor=0.9;
    let branchFactor=5;
    let opponentColor=swapColor(turn)
    let avalibleMoves0;
    let avalibleMoves1;
    let avalibleMoves2;
    let avalibleMoves3;
    let avalibleMoves4;
    let moveIndex1;
    let moveIndex2;
    let moveIndex3;
    let moveIndex4;
    let moveMade1;
    let moveMade2;
    let moveMade3;
    let moveMade4;
    let B1Score;
    let B2Score;
    let B3Score;
    let B4Score;
    let bestScore1;
    let bestScore2;
    let bestScore3;
    let bestScore4;
    let bestMove;
    let B1;
    let B2;
    let B3;
    let B4;
    bestScore1=-100000;
    avalibleMoves0= movesSearch(turn,defFactor,board,branchFactor)
    //first depth, consider different computer moves
    for (moveIndex1=0;moveIndex1<avalibleMoves0.length;moveIndex1++){
        B1=copyTwoDimArray(board)
        moveMade1=avalibleMoves0[moveIndex1]
        putDownPiece(moveMade1,turn,B1)
        avalibleMoves1=movesSearch(opponentColor,defFactor,B1,branchFactor)
        bestScore2=100000;
        //second depth, consider different opponent moves
        for (moveIndex2=0;moveIndex2<avalibleMoves1.length;moveIndex2++){
            B2=copyTwoDimArray(B1)
            moveMade2=avalibleMoves1[moveIndex2]
            putDownPiece(moveMade2,opponentColor,B2)
            avalibleMoves2=movesSearch(turn,defFactor,B2,branchFactor)
            bestScore3=-100000;
            //evaluate score for move once it reached the leaf node
            for (moveIndex3=0;moveIndex3<avalibleMoves2.length;moveIndex3++){
                B3=copyTwoDimArray(B2)
                moveMade3=avalibleMoves2[moveIndex3]
                putDownPiece(moveMade3,turn,B3)
                avalibleMoves3=movesSearch(opponentColor,defFactor,B3,branchFactor)
                bestScore4=100000;
                for (moveIndex4=0;moveIndex4<avalibleMoves3.length;moveIndex4++){
                    B4=copyTwoDimArray(B3)
                    moveMade4=avalibleMoves3[moveIndex4]
                    putDownPiece(moveMade4,opponentColor,B4)
                    B4Score=-moveEvaluation(moveMade4,opponentColor,defFactor,B4).score  
            }
            if(B4Score<=bestScore4){
                bestScore4=B4Score
            }
        }
        B3Score=bestScore4
        if(B3Score>=bestScore3){
            bestScore3=B3Score
        }
    }
    B2Score=bestScore3
    if(B2Score<=bestScore2){
        bestScore2=B2Score
    }
}
B1Score=bestScore2;
if(B1Score>=bestScore1){
    bestScore1=B1Score;
    bestMove=moveMade1;
} 
return bestMove;
}
// function minimaxMove(turn,board){
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
//         moveMade1=avalibleMoves1[moveIndex1]
//         putDownPiece(moveMade1,turn,B1)
//         avalibleMoves2=movesSearch(opponentColor,defFactor,B1,branchFactor)
//         bestScore2=100000;
//         //second depth, consider different opponent moves
//         for (moveIndex2=0;moveIndex2<avalibleMoves2.length;moveIndex2++){
//             B2=copyTwoDimArray(board)
//             moveMade2=avalibleMoves2[moveIndex2]
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



export default minimaxMove;