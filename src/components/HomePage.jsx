import React, { useState } from "react";
import {NavButton}  from "./Buttons";


function HomePage(props){

    return(
        <div>

            <div>
                <NavButton 
                        text="Human VS Human "
                        onClick={()=>props.onClick("PvsP")}
                />
            </div>

            <div>
                <NavButton 
                        text="Human VS Computer"
                        onClick={()=>props.onClick("PvsAI")}
                />
            </div>

            <div>
                <NavButton 
                text="Computer VS Computer"
                onClick={()=>props.onClick("AIvsAI")}
                />
            </div>

            <div>
                <NavButton 
                    text="Simulation"
                    onClick={()=>props.onClick("Simulation")}
                />
            </div>

        </div>
    )
}

export default HomePage;