import BoardModule from './Board.module';

class Board{
    constructor(name, className,id ){
        this.name = name;
        this.className = className;
        this.tasks = [];
        this.id =  id;
    }

    addTask(task){
        this.tasks.push(task);
    }

    static displayBoard(board){
        document.querySelector(".board__wrapper").innerHTML = 
         board.map(column => {
            return BoardModule(column)
        }).join('') 
    }
}

export default Board;