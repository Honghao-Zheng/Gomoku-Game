//jshint esversion:6
import React from "react";
import {Intersection} from "./Buttons";
import { isArrayEqualArray } from "./GeneralAlgorithms";

function Board (props) {
// console.log(props.boardArrangement)
  function renderRow(row,rowNum){
    let cellColour;

    return (
      <div>
      {row.map((pieceColour,colNum)=>{
        cellColour="yellow"
        
        if(isArrayEqualArray(props.moveMade,[rowNum,colNum])){

      cellColour="red"
    }     
        return (
        <Intersection
        colour={cellColour}
        piece={pieceColour}
        onClick={()=>props.onClick([rowNum,colNum])}
        />
      );
    })}
      </div>
    )
  }
  return(
    <div>
    {props.boardArrangement.map((row,rowIndex)=>{
      let rowNum=rowIndex
      return (
        renderRow(row,rowNum)
      )
    }
  )}



</div>
  )
}


export default Board;
