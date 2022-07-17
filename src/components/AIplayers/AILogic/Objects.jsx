
class individual{
    constructor(){
        this.moveComb=null;
        this.score=null;
    }
}


class moveObject{
    constructor(move,atkThreats,defThreats,score){
        this.move=move;
        this.atkThreats=atkThreats;
        this.defThreats=defThreats;
        this.score=score;
    }
}

export {individual,moveObject}