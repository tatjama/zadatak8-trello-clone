const  TaskTemplate = (task) => {
    console.log(task)
    return `<p  class="item" draggable = "${task.draggable}" id = "${task.id}">
                    ${task.name}
                </p>
                `
}

export default TaskTemplate;