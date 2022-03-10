import Board from './components/Board';
import EventHandler from './EventHandler';

/**OnLoad Function */

const myBoard =  function (){   
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

export default myBoard;