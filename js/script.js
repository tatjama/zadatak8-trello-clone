/**START DRAG & DROP */

// default is not to allow drop
function handleDragOver(e) {
    e.preventDefault();  
}
function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
}

function handleDrop(ev) {
    ev.preventDefault();  
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let board = JSON.parse(localStorage.getItem('board'));        
    let sourceIdEl=document.getElementById(ev.dataTransfer.getData("text/plain"));
    /**Remove task from container */
    for(let i = 0; i < board.length; i++){
        if(board[i].tasks.filter(t=>t.id === sourceIdEl.id).length == 1){
            let newBoardTasks = board[i].tasks.filter(t=>t.id !== sourceIdEl.id);
            board[i].tasks = newBoardTasks;
        }        
    }

    /**Move Task from previous container to new container into DOM structure*/
    let targetEl=document.getElementById(ev.target.id);
    let targetParentEl =  targetEl.parentElement;

    (targetEl.className === sourceIdEl.className)
            ? targetParentEl.insertBefore(sourceIdEl, targetEl):targetEl.appendChild(sourceIdEl);
     
    /*Add task to new container*/        
    let droppedEl = (ev.target.className === "item")? ev.target.parentElement: ev.target;
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

function handleSubmit(e) {
    e.preventDefault();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let board = JSON.parse(localStorage.getItem('board'));

    /** Find which button is clicked*/
    let boardIndex = e.target.id.split("-")[1];
    if(e.path[1][1].value !== ""){
        /**Create new Task and add it to list Tasks and locale Storage */
        let task = new Task(e.path[1][1].value, tasks.length, boardIndex*1); 
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        /**Add Task in to Board */
        for(let i = 0; i < board.length; i++){
            if(i == boardIndex){
              board[i].tasks.push(task);
            }
        }
        localStorage.setItem("board", JSON.stringify(board));
        Board.displayBoard(JSON.parse(localStorage.getItem("board")));
        /**Add Listeners */
        const draggableItems = document.querySelectorAll(".item");
        draggableItems.forEach((item) => {
        item.addEventListener("dragstart",handleDragStart);
        })
        const droppableContainers = document.querySelectorAll(".items");
        droppableContainers.forEach((container) => {
            container.addEventListener("drop", handleDrop);
            container.addEventListener("dragover", handleDragOver );
        })
        const submitButtons = document.querySelectorAll("input[type=submit]");
        submitButtons.forEach(button =>{
            button.addEventListener("click",handleSubmit);
        })        
    }    
}
/**END ADD TASK - FORM HANDLER */




