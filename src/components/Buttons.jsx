//jshint esversion:6
import React, { Component } from "react";


function Intersection(props) {
  let selectedPiece=props.piece;
  let cellColour=props.colour;
  return (
    <button className={"square "+cellColour+" "+selectedPiece} onClick={props.onClick}>

    </button>
  );
}

function StartAIvsAI(props) {
  let selectedPiece=props.piece;
  let cellColour=props.colour;

  return (
    <button className={"square "+cellColour+" "+selectedPiece} onClick={props.onClick}>

    </button>
  );
}

function NavButton(props){
  return (
    <button className={"navigation"} onClick={props.onClick}>{props.text}</button>
  )
}

function FunctionButton(props){
  return (
    <button className={"function"} onClick={props.onClick}>{props.text}</button>
    )
  
}


function RadioButtons(props) {
  let values = props.values;
  let groupName = props.groupName;
  let defaultValue=props.defaultValue;

  return (
    <div onChange={(event)=>{
      props.changeSetting(event.target.value)
    }} className="radioDis">
    <div className="cols">
        {groupName}
    </div>
      {values.map((lable, index) => {
        return (
          <div className="cols">
            <p1> {lable}</p1>
            <input type="radio" value={lable} name={groupName} checked={lable===defaultValue}/>
          </div>
        );
      })}
    </div>
  );
}

{/* <div onChange={onChangeValue} className="rows">

<div className="cols">
<p1> Male</p1>
<input type="radio" value="Male" name="gender" />
</div>
<div className="cols">
<p1>Female </p1>
<input type="radio" value="Female" name="gender" /> 
</div>
<div className="cols">
<p1>Other </p1>
<input type="radio" value="Other" name="gender" />

</div> */}

export {StartAIvsAI,Intersection,FunctionButton,NavButton,RadioButtons} 


