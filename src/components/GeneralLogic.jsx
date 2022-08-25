//jshint esversion:6
//the functions, "areTwoMovesEqual" and "MoveListContainMove" are
//from my previous personal project, can be found on github.com/Honghao-Zheng
function areTwoMovesEqual(move1,move2){
  if(move1[0]===move2[0] && move1[1]===move2[1]){
    return true;
} else {
  return false 
}
}
  function MoveListContainMove(moveList,move){
    let moveIndex;
    for (moveIndex=0;moveIndex<moveList.length;moveIndex++){
      if (areTwoMovesEqual(moveList[moveIndex],move)){
        return true;
      }
    }
    return false;
  }

//above functions are not done during this project period
  function copyTwoDimArray(array){
    let twoDimArray=[];
    let rowArray=[];
    let rowIndex,colIndex;
    for (rowIndex=0;rowIndex<array.length;rowIndex++){
      for (colIndex=0;colIndex<array[rowIndex].length;colIndex++){
        rowArray.push(array[rowIndex][colIndex])
      }
      twoDimArray.push(rowArray)
      rowArray=[]
    }
    return twoDimArray;
  }
  
  //choose a uniform random number between 0 and max-1
  function random(max) {
    const num = Math.floor(Math.random() * max);
    return num;
  }



    


export {areTwoMovesEqual,MoveListContainMove,copyTwoDimArray,random};
