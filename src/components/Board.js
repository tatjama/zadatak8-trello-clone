import ColumnModule from "./Column.module";
import Column from './Column';
import Task from './Task';
class Board{
    constructor(){
        this.tasks =JSON.parse(localStorage.getItem('tasks')) || [];
        this.board = JSON.parse( localStorage.getItem('board')) || [];
        this.columnsName = [["Backlog", "backlog"], ["In Progress", "in-progress"], ["Complete", "complete"], ["On Hold", "on-hold"]];
        this.columns = [];    
    }

    addColumn(column){
        this.columns.push(column);
    }

    createInstance(){
        if(this.board.length !== 0){
            this.board.forEach(column => {
                column.addTask = function(task){
                    this.tasks.push(task)
                }
            })
        }else{
            this.columnsName.forEach((el, index)=> this.addColumn(new Column(el[0], el[1] , index))); 
            localStorage.setItem("board",JSON.stringify(this.columns));
            localStorage.setItem("tasks", JSON.stringify(this.tasks))
        }
    }

    displayBoard(){
        document.querySelector(".board__wrapper").innerHTML = 
         this.board.map(column => {
            return ColumnModule(column)
        }).join('') 
    }

    addEventListeners(){
        document.querySelectorAll(".items p").forEach((item) => {
            item.addEventListener("dragstart", this.handleDragStart);
        })
        document.querySelectorAll(".items").forEach((container) => {
            container.addEventListener("drop",(e) => this.handleDrop(e));
            container.addEventListener("dragover", this.handleDragOver );
        })
        document.querySelectorAll("input[type=submit]").forEach(button =>{
            button.addEventListener("click", (e)=> this.handleSubmit(e));
        })
    }

    handleDragOver(e) {
        e.preventDefault();  
    }

    handleDragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
    }

    handleSubmit(e) {    
        e.preventDefault();        
        /** Find which button is clicked*/
        let boardIndex = e.target.id.split("-")[1];

        if(e.path[1][1].value !== ""){
            /**Create new Task and add it to list Tasks and locale Storage */
            let task = new Task(e.path[1][1].value, this.tasks.length, boardIndex*1); 
            this.tasks.push(task);
                    
            /**Add Task into Board */
            for(let i = 0; i < this.board.length; i++){
                if(i == boardIndex){
                this.board[i].addTask(task);
                let childTask = document.createElement("p");
                childTask.innerText = task.name;
                childTask.classList.add("item");
                childTask.setAttribute("draggable", "true");
                childTask.setAttribute("id", task.id)
                document.getElementById(i).appendChild(childTask);
                }
            }
            document.getElementById(task.id).addEventListener("dragstart",this.handleDragStart);
            e.path[1][1].value = '';

            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            localStorage.setItem("board", JSON.stringify(this.board));
            
        }    
    }

    handleDrop(e) {
        e.preventDefault();          
        let sourceIdEl=document.getElementById(e.dataTransfer.getData("text/plain"));
        /**Remove task from container */
        for(let i = 0; i < this.board.length; i++){
            if(this.board[i].tasks.filter(t=>t.id === sourceIdEl.id).length == 1){
                let newBoardTasks = this.board[i].tasks.filter(t=>t.id !== sourceIdEl.id);
                this.board[i].tasks = newBoardTasks;
            }        
        }

        /**Move Task from previous container to new container into DOM structure*/
        let targetEl=document.getElementById(e.target.id);
        let targetParentEl =  targetEl.parentElement;

        (targetEl.className === sourceIdEl.className)
                ? targetParentEl.insertBefore(sourceIdEl, targetEl):targetEl.appendChild(sourceIdEl);
        
        /*Add task to new container*/        
        let droppedEl=(e.target.className === "item")? e.target.parentElement: e.target;
        let tasksOrder = [];
        for(let i = 0; i < droppedEl.children.length; i++){
            let droppedTask = this.tasks.filter(t=> t.id === droppedEl.children[i].id)[0];
                droppedTask.column = droppedEl.id;            
                this.tasks[this.tasks.indexOf(droppedTask.id)] = droppedTask;
                tasksOrder.push(droppedTask);            
        }
        this.board[droppedEl.id].tasks = tasksOrder;

        localStorage.setItem("tasks", JSON.stringify(this.tasks));        
        localStorage.setItem("board", JSON.stringify(this.board));
    }

}

export default Board