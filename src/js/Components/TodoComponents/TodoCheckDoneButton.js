import Store from '../../Services/Store/Store.js';


export default class TodoCheckDoneButton {
  constructor(anchor, todoId,completed){
    this.anchor = anchor;
    this.completed = completed;
    this.todoId = todoId;
    this.elem = document.createElement('button');
    this.elem.classList.add('check_todo_button');
    this.elem.innerHTML = '&#10004;';
    if(completed){this.elem.classList.add('button_done'); this.elem.setAttribute('disabled','disabled');}
    this.elem.addEventListener('click', ()=>{
      Store.dispatch('itemCheck', {todoId,elem: this.elem});
    });
    Store.events.subscribe('itemWasChecked', (state)=>{
      if(!this.completed){
        const btn = document.querySelector('.item'+state.itemToCheck.todoId+' .check_todo_button');
        if(btn){
          btn.classList.add('button_done');
          btn.setAttribute('disabled','disabled');
        }
        
      }
      
    })

  }

  render(){
    this.anchor.append(this.elem);
  }
}