import FormTemplate from './FormTemplate';
import TaskModule from './Task.module';

const BoardModule = (column) => {
    return(
        `
            <section class="${column.className}">
                <header >
                    <h3>${column.name}</h3>
                </header>
                <main class="items" id = "${column.id}">
                ${(column.tasks.length > 0)? column.tasks.map(task => {
                 return TaskModule(task)
                }).join(''): ""}
                </main>
                ${FormTemplate(column)}
            </section>
            `
    )
}

export default BoardModule