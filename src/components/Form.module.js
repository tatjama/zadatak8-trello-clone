import './Form.module.css';

const FormModule = (el) => {
return(
    `<form action="#" preventDefault="true" autocomplete="off">
    <input type="" autocomplete="false" hidden>
    <label for="task">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <input type="text" autocomplete="off" ondrop="return false;" name="task" placeholder="+ Add item">                    
    </label>
    <input type="submit" id="btn-${el.id}" value="save">
</form>`
)
}

export default FormModule