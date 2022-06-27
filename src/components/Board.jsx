//jshint esversion:6
import React from "react";
import Intersection from "./Intersection";


function Board (props) {

  function renderRow(row,rowNum){
    let cellColour;
    return (
      <div>
      {row.map((pieceColour,colNum)=>{
        cellColour="white"        
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
