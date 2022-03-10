import Task from './components/Task';

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
        console.log(sourceIdEl);
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
        let droppedEl = (e.target.className === "items")? e.target: e.target.parentElement;
        console.log(e)
        let tasksOrder = [];
        for(let i = 0; i < droppedEl.children.length; i++){
            let droppedTask = tasks.filter(t=> t.id === droppedEl.children[i].id)[0];
                droppedTask.column = droppedEl.id;            
                tasks[tasks.indexOf(droppedTask.id)] = droppedTask;
                tasksOrder.push(droppedTask);            
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log('dropped')
        console.log(droppedEl);
        console.log(droppedEl.id);
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

export default EventHandler;