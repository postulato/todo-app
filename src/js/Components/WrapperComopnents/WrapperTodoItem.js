import TodoDeleteItemButton from '../TodoComponents/TodoDeleteItemButton.js';
import TodoCheckDoneButton from '../TodoComponents/TodoCheckDoneButton.js';
import Store from '../../Services/Store/Store.js';
import TodoItemEditor from '../../Components/TodoComponents/TodoItemEditor.js';

export default class WrapperTodoItem {
  constructor(anchor, id = 0, text="test text",date, completed){
    this.anchor = anchor;
    this.date = date;
    this.id = id;
    this.text = text;
    this.elem = document.createElement('div');
    this.elem.classList.add('todo_item');
    this.elem.classList.add('item'+id);
    this.completed = completed;
    if(completed){
      this.elem.classList.add('completed'); 
    }
    Store.events.subscribe('itemWasChecked',(state)=>{
      if(!this.completed){
        const todoItem = document.querySelector('.item'+state.itemToCheck.todoId);
        if(todoItem){
          todoItem.classList.add('completed');
        }
        
      }
    });
  }

  render(){
    const textContainer = document.createElement('strong');
    const dateContainer = document.createElement('span');
    dateContainer.classList.add('date_container');
    dateContainer.textContent = this.date;
    if (!this.completed) {
      textContainer.addEventListener('click',(e)=>{
        const text = e.target.textContent;
        e.target.textContent = '';
        const editor = new TodoItemEditor(e.target, this.id, text); 
        editor.render();
      });
    }
    
    textContainer.textContent = this.text;  
    const deleteButton = new TodoDeleteItemButton(this.elem,this.id);
    const checkButton = new TodoCheckDoneButton(this.elem,this.id,this.completed);
    this.elem.append(dateContainer);
    this.elem.append(textContainer);
    checkButton.render();
    deleteButton.render();

    this.anchor.append(this.elem);
  }
}