import React, { Component } from "react";

// class Demo1 extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "React"
//     };
//     this.onChangeValue = this.onChangeValue.bind(this);
//   }

//   onChangeValue(event) {
//     console.log(event.target.value);
//   }

//   render() {
//     return (
//       <div onChange={this.onChangeValue}>
//         <input type="radio" value="Male" name="gender" /> Male
//         <input type="radio" value="Female" name="gender" /> Female
//         <input type="radio" value="Other" name="gender" /> Other
//       </div>
//     );
//   }
// }

// function RadioButton(){

// }

function Demo1(){
    
  function onChangeValue(event) {
    console.log(event.target.value);
  }
        return (
      <div onChange={onChangeValue} className="radioDis">
      <div className="cols">
      Black

      </div>

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

      </div>
     
     
     

      
        
        

      </div>
    );

}

export default Demo1;