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
        item.addEventListener("dragstart",handleDragStart);
    })
    const droppableContainers = document.querySelectorAll(".items");
    droppableContainers.forEach((container) => {
        container.addEventListener("drop",(e) => handleDrop(e, tasks, board));
        container.addEventListener("dragover", handleDragOver );
    })
    const submitButtons = document.querySelectorAll("input[type=submit]");
    submitButtons.forEach(button =>{
        button.addEventListener("click", (e)=> handleSubmit(e, tasks, board));
    })
}

