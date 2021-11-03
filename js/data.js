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
    /*constructor(name, className, tasks,id ){
        this.name = name;
        this.className = className;
        this.tasks = tasks;
        this.id =  id;
    }*/

 
    static displayBoard(board){
        document.querySelector(".board__wrapper").innerHTML = 
         board.map(el => {
            return `
            <section class="${el.className}">
                <header class="backlog">
                    <h3>${el.name}</h3>
                </header>
                <main class="items" id = "${el.id}">
                ${  el.tasks.map(task => {
                    return `<p  class="item" draggable = "${task.draggable}" id = "${task.id}">
                        ${task.name}
                    </p>
                    `
                }).join('')}
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

/**Initial Values */

/*let initialTasks = [["release the course", 0], ["sit back and relax", 0], ["work on projects", 1],
 ["listen music", 1], ["being cool", 2], ["being uncool", 2], ["getting stuff done", 3],
  ["finished", 3]];
let columns = [["Backlog", "backlog"], ["In Progress", "in-progress"], ["Complete", "complete"], ["On Hold", "on-hold"]];
*/

/**OnLoad Function */

let myBoard =  function (){   
    /**
     * let myBoard =  function (){   
    let tasks = [];
    let board = [];

    initialTasks.forEach((el, index) => tasks.push(new Task(el[0],index, el[1] )));
    columns.forEach((el, index)=> board.push(new Board(el[0], el[1],tasks.filter( t => t.column == index ) , index)));
    Board.displayBoard(board);
    localStorage.setItem("board",JSON.stringify(board));
    board = JSON.parse( localStorage.getItem('board'));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem('tasks'));

     */

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let board = JSON.parse( localStorage.getItem('board')) ||[];
     
    let initialBoard = [{name: "Backlog", className: "backlog", tasks: [], id : 0},
     {name: "In Proggres", className: "in-progress", tasks: [], id : 1}, 
     {name: "Complete", className: "complete", tasks: [], id : 2}, 
     {name: "On Hold", className: "on-hold", tasks: [], id : 3}];

    if(board.length !== 0){
        Board.displayBoard(board);
    }else{
        board = initialBoard;
        localStorage.setItem("board",JSON.stringify(board));
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
 //Add Event Listeners   
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

