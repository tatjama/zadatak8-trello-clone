import ColumnModule from './Column.module';

class Column{
    constructor(name, className,id ){
        this.name = name;
        this.className = className;
        this.tasks = [];
        this.id =  id;
    }

    addTask(task){
        this.tasks.push(task);
    }
    
}

export default Column;