class parameters{
    constructor(it,pop){
        this.iteration=it
        this.population=pop
    }
}

class individual{
    constructor(){
        this.moveComb=null;
        this.score=null;
    }
}


export {parameters,individual}