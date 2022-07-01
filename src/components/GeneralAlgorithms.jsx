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
      for (colIndex=0;colIndex<array.length;colIndex++){
        rowArray.push(array[rowIndex][colIndex])
      }
      twoDimArray.push(rowArray)
      rowArray=[]
    }
    return twoDimArray;
  }
  



export {arraysHasArray,isArrayEqualArray,copyTwoDimArray};
