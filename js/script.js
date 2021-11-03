/**START DRAG & DROP */

// default is not to allow drop




/**END DRAG & DROP */
/**START ADD TASK - FORM HANDLER */




/*function clearInput(e){
    if(submitButtons.find(e.target)){
        console.log("submit")
}else{
    console.log(e.target)
}
}*/
//window.addEventListener("click", clearInput);
/**END ADD TASK - FORM HANDLER */


function handleDragOver(ev) {
    ev.preventDefault();  
}
function handleDragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function handleDrop(ev) {
    ev.preventDefault();  
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let board = JSON.parse(localStorage.getItem('board'));        
    let sourceIdEl=document.getElementById(ev.dataTransfer.getData("text/plain"));
    console.log(sourceIdEl.id);

    for(let i = 0; i < board.length; i++){
        if(board[i].tasks.filter(t=>t.id === sourceIdEl.id).length == 1){
            let newBoardTasks = board[i].tasks.filter(t=>t.id !== sourceIdEl.id);
            board[i].tasks = newBoardTasks;
        }        
    }
    let targetEl=document.getElementById(ev.target.id)
        let targetParentEl =  targetEl.parentElement;
            (targetEl.className === sourceIdEl.className)
            ? targetParentEl.insertBefore(sourceIdEl, targetEl):targetEl.appendChild(sourceIdEl);
            console.log(sourceIdEl);
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
        console.log(board)
}



function handleSubmit(e) {
    e.preventDefault();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let board = JSON.parse(localStorage.getItem('board'));
    let boardIndex = e.target.id.split("-")[1];
    if(e.path[1][1].value !== ""){
        let task = new Task(e.path[1][1].value, tasks.length, boardIndex*1);        
        console.log(task);

        tasks.push(task);
        //Tasks Set to LS
        //Board Set to LS
        console.log(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        for(let i = 0; i < board.length; i++){
            /*console.log(i);
            console.log(board[i].tasks);
            console.log(  tasks.filter(t => t.column == i));*/
            console.log(board[i].tasks);
            console.log(tasks.filter(t => t.column == i));
            if(i == boardIndex){
              //  board[i].tasks = tasks.filter(t => t.column == i);
              board[i].tasks.push(task)

            }
        }
        //board[boardIndex].tasks.push(task);
        localStorage.setItem("board", JSON.stringify(board));
        /**
         * 
         */
        console.log(board)
        Board.displayBoard(JSON.parse(localStorage.getItem("board")));
        //document.getElementById(task.id).addEventListener("dragstart",handleDragStart);
        const draggableItems = document.querySelectorAll(".item");
draggableItems.forEach((item, index) => {
    item.addEventListener("dragstart",handleDragStart);
    /*item.setAttribute("draggable", true);
    item.setAttribute("id", "drag-"+index);*/
})
const droppableContainers = document.querySelectorAll(".items");
droppableContainers.forEach((container, index) => {
    container.addEventListener("drop", handleDrop);
    container.addEventListener("dragover", handleDragOver );
    //container.setAttribute("id", "drop-"+index);
})
const submitButtons = document.querySelectorAll("input[type=submit]");
submitButtons.forEach(button =>{
    button.addEventListener("click",handleSubmit);
})

        
    }    
}
