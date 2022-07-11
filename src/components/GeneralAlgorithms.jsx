//jshint esversion:6
function isArrayEqualArray(array1,array2){
  if (array1.length===array2.length){

    let index;
    for(index=0;index<array1.length;index++){
      if (array1[index] !==array2[index]){
        return (false);
      }
    }
    
    return (true);
}

}

  function arraysHasArray(collectionOfArrays,singleArray){
    let index;
    for (index=0;index<collectionOfArrays.length;index++){
      if (isArrayEqualArray(collectionOfArrays[index],singleArray)){
        return (true);
      }
    }
    return (false);
  }


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
    const num = Math.floor(Math.random() * (max));
    return num;
  }

  function shuffle(arr) {
    let arrIndex;
    let randomNum;
    let temp;
    for (arrIndex = arr.length - 1; arrIndex > 0; arrIndex--) {
    
      randomNum = random(arrIndex+1)
            
      temp = arr[arrIndex];
      arr[arrIndex] = arr[randomNum];
      arr[randomNum] = temp;
    }
      
    return arr;
    }
    


export {arraysHasArray,isArrayEqualArray,copyTwoDimArray,random,shuffle};
