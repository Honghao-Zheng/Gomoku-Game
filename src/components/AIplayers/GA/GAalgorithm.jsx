import moveEvaluation from "./MoveEvaluation";
import initIndMoves from "./InitIndMoves";
import {individual} from "./Objects";
import {swapColor,putDownPiece} from "../../GameLogic.jsx"
import {copyTwoDimArray,random,shuffle} from "../../GeneralAlgorithms.jsx"
//fitness function

function fitness(moveComb,pieceColor,defFactor,board){
    let index;
    let turn=pieceColor;
    let totalFitnessScore=0;
    let moveMade;
    let boardCopy=copyTwoDimArray(board);
    for(index=0;index<moveComb.length;index++){
        moveMade=moveComb[index];
        //discard illegal moveComb
        if(boardCopy[moveMade[0]][moveMade[1]] ===" " 
            && moveMade[0]<15 && moveMade[0]>=0 && moveMade[1]<15 && moveMade[1]>=0){
                putDownPiece(moveMade,turn,boardCopy)
                if(turn===pieceColor){
                    totalFitnessScore+=moveEvaluation(moveMade,turn,defFactor,boardCopy)
                } else{
                    totalFitnessScore-=moveEvaluation(moveMade,turn,defFactor,boardCopy)
                }
        
                turn=swapColor(turn)
        } else{
            return -10000;
        }

        return totalFitnessScore

    }
}

// function createUniformRandomArr(size){
//     let arr=[]
//     for(var i=0;i<size;i++){
//         arr.push(random(2))
//     }
// }

function uniformCrossover(mom,dad){
    let child1=new individual();
    let child2=new individual();
    let child1Moves=[];
    let child2Moves=[]
    let momCopy=copyTwoDimArray(mom.moveComb);
    let dadCopy=copyTwoDimArray(dad.moveComb);
    let randomBit;
    for(var moveIndex=0;moveIndex<momCopy.length;moveIndex++){
        randomBit=random(2);
        if (randomBit===1){
            child1Moves.push(momCopy.moveComb[moveIndex])
            child2Moves.push(dadCopy.moveComb[moveIndex])
        }
        if (randomBit===0){
            child1Moves.push(dadCopy.moveComb[moveIndex])
            child2Moves.push(momCopy.moveComb[moveIndex])
        }

    }
    child1.moveComb=child1Moves
    child2.moveComb=child2Moves
    return [child1,child2]
}


function mutate(ind,prop){
    let randomNum;
    let moveIndex;
    let mutationChange=[-1,1]
    let rowMuation,colMutation;
    let moveMutated;
    for (moveIndex=0;moveIndex<ind.moveComb.length;moveIndex++){
        randomNum=Math.random();
        if (randomNum<prop){
            rowMuation=mutationChange[random(2)]
            colMutation=mutationChange[random(2)]
            moveMutated=ind.moveComb[moveIndex]
            ind.moveComb[moveIndex]=[moveMutated[0]+rowMuation,moveMutated[1]+colMutation]  
        }
    }

}

function sortPopulation(population){
    population.sort((ind1,ind2)=>ind2.score-ind1.score)
}

function createDumyIterationArray(numOfIteration){
    let array=[]
    for (var i=0;i<numOfIteration;i++){
        array.push(i)
    }
    return array
}

function GAmove(pieceColor,board){
let numOfPopulation=500;
let numOfIteration=100;
let numOfChildren=500;
let population=[]
let depth=5;
let mutateProp=0.1
let defFactor=0.6;
let ind;
let it;
let childIndex;
let bestInd;
let bestScore=0
let produceChildIt=Math.floor(numOfChildren/2)
let mom,momIndex;
let dad,dadIndex;
let dumyIterationArray;
let child1,child2;



//initialise population
for (var i=0;i<numOfPopulation;i++){
    ind=new individual();
    ind.moveComb=initIndMoves(pieceColor,depth,board)
    ind.score=fitness(ind.moveComb,pieceColor,defFactor,board)
    population.push(ind)
    if (ind.score>bestScore){
        bestInd=new individual();
        bestInd.moveComb=ind.moveComb;
        bestInd.score=ind.score;
    }
}

//iterations
for (it=0;it<=numOfIteration;it++){
    for (childIndex=0;childIndex<produceChildIt;childIndex++){
        //choose random parents in the population
        dumyIterationArray=createDumyIterationArray(numOfIteration);
        shuffle(dumyIterationArray);
        momIndex=dumyIterationArray[0]
        dadIndex=dumyIterationArray[1]
        mom=population[momIndex];
        dad=population[dadIndex];
        //produce two childen
        [child1,child2]=uniformCrossover(mom,dad)
        //mutate two childen
        mutate(child1,mutateProp)
        mutate(child2,mutateProp)
        //evaluate the child performance
        child1.score=fitness(child1.moveComb,pieceColor,defFactor,board)
        if(child1.score>bestScore){
            bestInd=new individual();
            bestInd.moveComb=child1.moveComb;
            bestInd.score=child1.score;
        }
        child2.score=fitness(child2.moveComb,pieceColor,defFactor,board)
        if(child2.score>bestScore){
            bestInd=new individual();
            bestInd.moveComb=child2.moveComb;
            bestInd.score=child2.score;
        }
        //add the child to population
        population.push(child1)
        population.push(child2)
        //sort population in descending order
    }
    sortPopulation(population)
    population=population.slice(0, numOfPopulation-1)
    

}
return bestInd.moveComb[0]
}

export default GAmove;