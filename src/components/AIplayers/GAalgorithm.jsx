// import moveEvaluation from "./AILogic/MoveEvaluation";
// import moveEvaluation from "./AILogic/MoveEvaluationGenetic";
import moveEvaluation from "./AILogic/MoveEvaluationNew";
import {individual} from "./AILogic/Objects";
import {swapColor,putDownPiece} from "../GameLogic.jsx"
import {copyTwoDimArray,random,shuffle} from "../GeneralLogic.jsx"
import {movesSearchGA} from "./AILogic/MoveSearch";
import {chooseRandomMoveInit} from "./RandomPlayer";
import assert from "unit.js/src/assert";
import { avalibleMoves } from "../GameLogic.jsx";
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
        numOfMoves=possibleMoves.length;
        moveIndex=random(numOfMoves);
        move=possibleMoves[moveIndex];
        individualMoves.push(move)
    }
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
                        indScore=moveEvaluation(moveMade,turn,defFactor,boardCopy).score
 
                        totalFitnessScore+=indScore/(index+1)**3
                        turn=swapColor(turn)
                } else {
                    return 0;
                }
        } else{
            return 0;
        }
    }
    return totalFitnessScore
}


function polpuationScore(population){
    let score=0
    for (let p=0; p<population.length;p++){
        score+=population[p].score
    }
    return score

}

function geneticPreCondition(depth,board){
    let numberOfMoves=avalibleMoves(board).length;
    let isPassed= depth<=numberOfMoves;
    assert(isPassed, "not enough depth: "+{depth: depth, numberOfMoves:numberOfMoves})
    return isPassed
}
function geneticInvariant(currentPopulationScore,previousPopulationScore){
    let isPassed= previousPopulationScore<=currentPopulationScore;
    assert(isPassed, "population quality goes backwards"
    +[previousPopulationScore, currentPopulationScore])
    return isPassed
}
function geneticPostCondition(turn,population,numOfPopulation,bestInd,board){
    let isPassed=population.length===numOfPopulation;
    let move;
    let boardCopy=copyTwoDimArray(board)
    assert(isPassed, "different polpulation: "+[population.length,numOfPopulation]);
    for(let moveIndex=0; moveIndex<bestInd.moveComb.length;moveIndex++){
        move=bestInd.moveComb[moveIndex]
        isPassed=isPassed && board[move[0]][move[1]]===" "
        putDownPiece(move,turn,boardCopy)
        turn=swapColor(turn)

    }
    assert(isPassed, "there is invalid move")
    return isPassed
}

function bestInd(depth,pieceColor,board){
    assert(geneticPreCondition(depth,board),"genetic precondotion failed")
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
let previousPopulationScore=0;
let currentPopulationScore=0
//get population
for (var i=0;i<numOfPopulation;i++){
    moveComb=initIndMoves(pieceColor,depth,board)
    score=fitness(moveComb,pieceColor,defFactor,board)
    ind=new individual(moveComb,score);
    population.push(ind)
    currentPopulationScore+=score
}
previousPopulationScore=currentPopulationScore
// interation process
for (itIndex=0;itIndex<=numOfIteration;itIndex++){
    assert(geneticInvariant(currentPopulationScore,previousPopulationScore),"genetic invariant failed loop start")
    for (childIndex=0;childIndex<Math.floor(numOfChildren/2);childIndex++){
        [momIndex,dadIndex]=pickTwoRandomIndex(population.length)
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
        currentPopulationScore+=child1Score
        currentPopulationScore+=child2Score
        //sort population in descending order
    }
    assert(geneticInvariant(currentPopulationScore,previousPopulationScore),"genetic invariant failed after children")
    sortPopulation(population)
    population=population.slice(0, numOfPopulation);
    currentPopulationScore=polpuationScore(population);
    assert(geneticInvariant(currentPopulationScore,previousPopulationScore),"genetic invariant failed end of loop")
    previousPopulationScore=currentPopulationScore;

}

bestInd=population[0]
assert(geneticPostCondition(pieceColor,population,numOfPopulation,bestInd,board),"genetic post condition failed")
//postCondition make sure all moves are valid
// console.log(bestInd.moveComb)
return bestInd
}

function GAmove(bestInd){
    return bestInd.moveComb[0]
}







export {GAmove,bestInd};