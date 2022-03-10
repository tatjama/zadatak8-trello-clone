class Task{
    constructor(name,id , column){
    this.name = name;
    this.id = "drag-" + id;
    this.draggable = true; 
    this.column = column;
    }
}

export default Task