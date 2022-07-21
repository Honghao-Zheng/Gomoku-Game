
class individual{
    constructor(moves,value){
        this.moveComb=moves;
        this.score=value;
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