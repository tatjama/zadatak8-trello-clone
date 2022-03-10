import style from './Task.module.css';

const  TaskModule = (task) => {
    console.log(task)
    return `<p  class=${style.item} draggable = "${task.draggable}" id = "${task.id}">
                    ${task.name}
                </p>
                `
}

export default TaskModule;