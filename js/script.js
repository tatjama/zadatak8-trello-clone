const draggableItems = document.querySelectorAll(".item");
draggableItems.forEach((item, index) => {
    item.addEventListener("dragstart",handleDragStart);
    //item.addEventListener("dragend", handleDragEnd);
    item.setAttribute("draggable", true);
    item.setAttribute("id", "drag-"+index);
})
const droppableContainers = document.querySelectorAll(".items");
droppableContainers.forEach((container, index) => {
    container.addEventListener("drop",handleDrop);
    container.addEventListener("dragover", handleDragOver );
    container.setAttribute("id", "drop-"+index);
})
// default is not to allow drop
function handleDragOver(ev) {
    ev.preventDefault();  
  }
  function handleDragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }
  function handleDrop(ev) {
    ev.preventDefault();  
    let sourceIdEl=document.getElementById(ev.dataTransfer.getData("text/plain"));
    let sourceIdParentEl=sourceIdEl.parentElement;
    let targetEl=document.getElementById(ev.target.id)
        let targetParentEl =  targetEl.parentElement;
        if (targetParentEl.id!==sourceIdParentEl.id){
            (targetEl.className === sourceIdEl.className)
            ? targetParentEl.insertBefore(sourceIdEl, targetEl.previousSibling):targetEl.appendChild(sourceIdEl);           
                   
        }else{
            let holder=targetEl;
            let holderText=holder.textContent;
            targetEl.textContent=sourceIdEl.textContent;
            sourceIdEl.textContent=holderText;
            holderText='';
        }
  }
/**********************/
/*First
function handleDragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function handleDrop(event){
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    this.appendChild(document.getElementById(data));
}

function handleDragOver(event){  
    event.preventDefault();
}*/

/**************************************************************** */

/*Second
let selected = null

function isBefore(el1, el2) {
    let cur
    if (el2.parentNode === el1.parentNode) {
      for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
        if (cur === el2) return true
      }
    }
    return false;
  }

function handleDragOver(e) {
    console.log(selected);
    console.log(e.target);
    console.log(e.target.parentNode);
    console.log(e.target.nextSibling);
  if (isBefore(selected, e.target)) {
    e.target.insertBefore(selected, e.target)
  } else {
    e.target.insertBefore(selected, e.target.nextSibling)
  }
}

function handleDragEnd() {
  selected = null
}

function handleDragStart(e) {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', e.target.id)
  selected = e.target;
}
function handleDrop(event){  
    event.preventDefault();
}

*/