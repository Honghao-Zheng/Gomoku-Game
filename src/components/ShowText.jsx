function ShowText(props){
    if(props.condition){
        return(<h1 className={props.textColour}>{props.textIfTrue}</h1>)
    } else {
        return(<h1 className={props.textColour}>{props.textIfFalse}</h1>)
    }

}

export default ShowText;