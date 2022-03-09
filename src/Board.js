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

export default Board;