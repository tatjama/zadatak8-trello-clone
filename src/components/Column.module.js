import FormModule from './Form.module';
import TaskModule from './Task.module';
import style from './Column.module.css';

const ColumnModule = (column) => {
    return(
        `
            <section class=${style[column.className]} >
                <header >
                    <h3>${column.name}</h3>
                </header>
                <main class="items ${style.items}"  id = "${column.id}">
                ${(column.tasks.length > 0)? column.tasks.map(task => {
                 return TaskModule(task)
                }).join(''): ""}
                </main>
                ${FormModule(column)}
            </section>
            `
    )
}

export default ColumnModule