// import moveEvaluation from "./AILogic/MoveEvaluation";
// import moveEvaluation from "./AILogic/MoveEvaluationGenetic";
import moveEvaluation from "./AILogic/MoveEvaluationNew";
import {individual} from "./AILogic/Objects";
import {swapColor,putDownPiece} from "../GameLogic.jsx"
import {copyTwoDimArray,random,shuffle} from "../GeneralAlgorithms.jsx"
import {movesSearchGA} from "./AILogic/MoveSearch";
import {chooseRandomMoveInit} from "./RandomPlayer";
function initIndMoves(turn,depth,board){
    let boardCopy=copyTwoDimArray(board)
    let move;
    let possibleMoves;
    let numOfMoves;
    let d;
    let moveIndex;
    let individualMoves=[];
    possibleMoves=movesSearchGA(boardCopy)
    numOfMoves=possibleMoves.length;
    moveIndex=random(numOfMoves);
    if (numOfMoves!==0){
        move=possibleMoves[moveIndex];
    } else{
        move=chooseRandomMoveInit(boardCopy)
    }
    individualMoves.push(move)
    
    
    for(d=1;d<=depth-1;d++){
        putDownPiece(move,turn,boardCopy)
        possibleMoves=movesSearchGA(boardCopy);
        // console.log(possibleMoves)
        numOfMoves=possibleMoves.length;
        moveIndex=random(numOfMoves);
        move=possibleMoves[moveIndex];
        individualMoves.push(move)
    }
    //    console.log(individualMoves)
    return individualMoves

}

function uniformCrossover(momMoveComb,dadMoveComb){

    let child1Moves=[];
    let child2Moves=[];
    let randomBit;
    // console.log("mom.moveComb:"+mom.moveComb)
    // console.log("dad:"+dad)
    let momCopy=copyTwoDimArray(momMoveComb);
    let dadCopy=copyTwoDimArray(dadMoveComb);
    // console.log(mom.moveComb)
    // console.log(dad.moveComb)
    
    for(var moveIndex=0;moveIndex<momCopy.length;moveIndex++){
        randomBit=random(2);
        if (randomBit===1){
            child1Moves.push(momCopy[moveIndex])
            child2Moves.push(dadCopy[moveIndex])
        }
        if (randomBit===0){
            child1Moves.push(dadCopy[moveIndex])
            child2Moves.push(momCopy[moveIndex])
        }
    }
    return [child1Moves,child2Moves]
}


function mutate(moves,prop){
    let randomNum;
    let moveIndex;
    let mutationChange=[-1,0,1]
    let rowMuation,colMutation;
    let moveMutated;
    for (moveIndex=0;moveIndex<moves.length;moveIndex++){
        randomNum=Math.random();
        if (randomNum<prop){
            rowMuation=mutationChange[random(3)]
            colMutation=mutationChange[random(3)]
            moveMutated=moves[moveIndex]
            moves[moveIndex]=[moveMutated[0]+rowMuation,moveMutated[1]+colMutation]  
        }
    }

}

function sortPopulation(population){
    
    population.sort((ind1,ind2)=>ind2.score-ind1.score)

}


function pickTwoRandomIndex(len){
    let array=[]
    // console.log("len pick: "+len)
    for (var i=0;i<len;i++){
        array.push(i)
    }
    // console.log("array: "+array)
    let index1=random(len)
    array.splice(index1,1)
    let index2=array[random(len-1)]
    return [index1,index2]
  }


function fitness(moveComb,pieceColor,defFactor,board){
    let index;
    let turn=pieceColor;
    let totalFitnessScore=0;
    let moveMade;
    let boardCopy=copyTwoDimArray(board);
    let indScore;
    // console.log("moveComb1: "+moveComb)
    for(index=0;index<moveComb.length;index++){
        moveMade=moveComb[index];
        //discard illegal moveComb
        if( moveMade[0]<15 && moveMade[0]>=0 && moveMade[1]<15 && moveMade[1]>=0){
                if(boardCopy[moveMade[0]][moveMade[1]] ===" "){
                    putDownPiece(moveMade,turn,boardCopy)
                    if(turn===pieceColor){
                        indScore=moveEvaluation(moveMade,turn,defFactor,boardCopy).score
                        // totalFitnessScore+=indScore/Math.pow(index+1,3)
                        totalFitnessScore+=indScore/(index+1)**3
                    } 
                } else {
                    return -10000;
                }
        } else{
            return -10000;
        }
    }
    return totalFitnessScore
}

function GAmove(depth,pieceColor,board){
    // console.log(pieceColor)
    let numOfPopulation=300;
    let numOfIteration=100;
    let numOfChildren=300;
let population=[]
let mutateProp=0.1
let defFactor=0.9;
let ind;
let itIndex;
let childIndex;
let bestInd;

let child1Score;
let child2Score;
let mom,momIndex;
let dad,dadIndex;

let child1,child2;
let child1MoveComb;
let child2MoveComb;
let moveComb;
let score;
//initialise population
for (var i=0;i<numOfPopulation;i++){
    moveComb=initIndMoves(pieceColor,depth,board)
    // console.log("initial indivisual "+i)
    score=fitness(moveComb,pieceColor,defFactor,board)
    ind=new individual(moveComb,score);
    // console.log("score "+ind.score)
    population.push(ind)
    // if (ind.score>=bestScore){
    //     moveComb=ind.moveComb;
    //     score=ind.score;
    //     bestInd=new individual(moveComb,score);
    // }
    // console.log("bestInd moveComb: "+bestInd.moveComb)
}
// console.log(population[0].moveComb)
// console.log("forst ind in population: "+population[0].moveComb)
//iterations
for (itIndex=0;itIndex<=numOfIteration;itIndex++){
    for (childIndex=0;childIndex<Math.floor(numOfChildren/2);childIndex++){
        //choose random parents in the population
        [momIndex,dadIndex]=pickTwoRandomIndex(population.length)
        // console.log("momIndex: "+momIndex)
        // console.log("dadIndex: "+dadIndex)
        // console.log("population lenth: "+population.length)
        mom=population[momIndex];
        dad=population[dadIndex];

        //produce two childen
        [child1MoveComb,child2MoveComb]=uniformCrossover(mom.moveComb,dad.moveComb)
        //mutate two childen
        mutate(child1MoveComb,mutateProp)
        mutate(child2MoveComb,mutateProp)
        //evaluate the child performance
        child1Score=fitness(child1MoveComb,pieceColor,defFactor,board)
        child2Score=fitness(child2MoveComb,pieceColor,defFactor,board)
        child1=new individual(child1MoveComb,child1Score)
        child2=new individual(child2MoveComb,child2Score)
        //add the child to population
        population.push(child1)
        population.push(child2)
        //sort population in descending order
    }
    sortPopulation(population)
    population=population.slice(0, numOfPopulation-1)
    
}
// for (let i=0;i<population.length;i++){
//     console.log("population[i].score:"+population[i].score)

// }
bestInd=population[0]
// console.log(bestInd.moveComb)
return bestInd.moveComb[0]
}








export  default GAmove;