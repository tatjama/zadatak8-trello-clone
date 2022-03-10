import FormTemplate from './FormTemplate';
import TaskTemplate from './TaskTemplate';

const BoardTemplate = (column) => {
    return(
        `
            <section class="${column.className}">
                <header >
                    <h3>${column.name}</h3>
                </header>
                <main class="items" id = "${column.id}">
                ${(column.tasks.length > 0)? column.tasks.map(task => {
                 return TaskTemplate(task)
                }).join(''): ""}
                </main>
                ${FormTemplate(column)}
            </section>
            `
    )
}

export default BoardTemplate