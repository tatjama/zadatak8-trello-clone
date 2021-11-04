/**Classes */
class Task{
    constructor(name,id , column){
    this.name = name;
    this.id = "drag-" + id;
    this.draggable = true; 
    this.column = column;
    }
}
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
         board.map(el => {
            return `
            <section class="${el.className}">
                <header class="backlog">
                    <h3>${el.name}</h3>
                </header>
                <main class="items" id = "${el.id}">
                ${(el.tasks.length > 0)? el.tasks.map(task => {
                    return `<p  class="item" draggable = "${task.draggable}" id = "${task.id}">
                        ${task.name}
                    </p>
                    `
                }).join(''): ""}
                </main>
                <form action="#" preventDefault="true" autocomplete="off">
                    <input type="" autocomplete="false" hidden>
                    <label for="task">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <input type="text" autocomplete="off" ondrop="return false;" name="task" placeholder="+ Add item">                    
                    </label>
                    <input type="submit" id="btn-${el.id}" value="save">
                </form>
            </section>
            `
        }).join('') 
    }
}

class EventHandler {
    /**START DRAG & DROP */
    static handleDragOver(e) {
        e.preventDefault();  
    }
    static handleDragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
    }

    static handleDrop(e, tasks, board) {
        e.preventDefault();          
        let sourceIdEl=document.getElementById(e.dataTransfer.getData("text/plain"));
        /**Remove task from container */
        for(let i = 0; i < board.length; i++){
            if(board[i].tasks.filter(t=>t.id === sourceIdEl.id).length == 1){
                let newBoardTasks = board[i].tasks.filter(t=>t.id !== sourceIdEl.id);
                board[i].tasks = newBoardTasks;
            }        
        }

        /**Move Task from previous container to new container into DOM structure*/
        let targetEl=document.getElementById(e.target.id);
        let targetParentEl =  targetEl.parentElement;

        (targetEl.className === sourceIdEl.className)
                ? targetParentEl.insertBefore(sourceIdEl, targetEl):targetEl.appendChild(sourceIdEl);
        
        /*Add task to new container*/        
        let droppedEl = (e.target.className === "item")? e.target.parentElement: e.target;
        let tasksOrder = [];
        for(let i = 0; i < droppedEl.children.length; i++){
            let droppedTask = tasks.filter(t=> t.id === droppedEl.children[i].id)[0];
                droppedTask.column = droppedEl.id;            
                tasks[tasks.indexOf(droppedTask.id)] = droppedTask;
                tasksOrder.push(droppedTask);            
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        board[droppedEl.id].tasks = tasksOrder;
        localStorage.setItem("board", JSON.stringify(board));
    }
    /**END DRAG & DROP */

/**START ADD TASK - FORM HANDLER */

    static handleSubmit(e, tasks, board) {    
        e.preventDefault();
        
        /** Find which button is clicked*/
        let boardIndex = e.target.id.split("-")[1];

        if(e.path[1][1].value !== ""){
            /**Create new Task and add it to list Tasks and locale Storage */
            let task = new Task(e.path[1][1].value, tasks.length, boardIndex*1); 
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));        
            /**Add Task into Board */
            for(let i = 0; i < board.length; i++){
                if(i == boardIndex){
                board[i].addTask(task);
                let childTask = document.createElement("p");
                childTask.innerText = task.name;
                childTask.classList.add("item");
                childTask.setAttribute("draggable", "true");
                childTask.setAttribute("id", task.id)
                document.getElementById(i).appendChild(childTask);
                }
            }
            localStorage.setItem("board", JSON.stringify(board));
            document.getElementById(task.id).addEventListener("dragstart",EventHandler.handleDragStart);
            e.path[1][1].value = '';
        }    
    }
/**END ADD TASK - FORM HANDLER */
}

/**OnLoad Function */

let myBoard =  function (){   
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let board = JSON.parse( localStorage.getItem('board')) || [];
    /**Initial Values for Empty Columns*/
    let columns = [["Backlog", "backlog"], ["In Progress", "in-progress"], ["Complete", "complete"], ["On Hold", "on-hold"]];
    
    if(board.length !== 0){
        board.forEach(column => {
            column.addTask = function(task){
                this.tasks.push(task)
            }
        })
    }else{
        columns.forEach((el, index)=> board.push(new Board(el[0], el[1] , index))); 
        localStorage.setItem("board",JSON.stringify(board));
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
       
    Board.displayBoard(board);
 //Add Event Listeners   
    const draggableItems = document.querySelectorAll(".item");
    draggableItems.forEach((item) => {
        item.addEventListener("dragstart", EventHandler.handleDragStart);
    })
    const droppableContainers = document.querySelectorAll(".items");
    droppableContainers.forEach((container) => {
        container.addEventListener("drop",(e) => EventHandler.handleDrop(e, tasks, board));
        container.addEventListener("dragover", EventHandler.handleDragOver );
    })
    const submitButtons = document.querySelectorAll("input[type=submit]");
    submitButtons.forEach(button =>{
        button.addEventListener("click", (e)=> EventHandler.handleSubmit(e, tasks, board));
    })
}

