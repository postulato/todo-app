import Todoitem from './WrapperTodoItem.js';
import Store from '../../Services/Store/Store.js';
import TodoInput from '../TodoComponents/TodoInput.js';
export default class WrapperTodoItemsAll {
  constructor (anchor) {
    this.anchor = anchor;
    this.elem = document.createElement('div');
    this.elem.classList.add('todo_items');
    this.todos = [];
    Store.events.subscribe('itemRecieved', (state)=>{
      this.todos = state.filteredTodos.todos;
      this.render();
    });
    Store.events.subscribe('allItemsRecieved', (state) => {
      this.todos = state.todos;
      this.render();
    })
    Store.events.subscribe('destroyItemNow', (state)=>{
      this.todos = state.filteredTodos.todos;
      this.render();
    });
    Store.events.subscribe('filterTodos', (state)=>{
      this.todos = state.filteredTodos.todos;
      this.render();
    });
    Store.events.subscribe('itemWasChecked', (state)=>{
      this.todos = state.filteredTodos.todos;
      this.render();
    });
    Store.events.subscribe('newTextApproved', (state)=>{
      this.todos = state.filteredTodos.todos;
      this.render();
    })
    Store.dispatch('getAllItems', {});

  }

  

  render(){
    if (this.elem.children.length !== 0) {
      for (; this.elem.children.length !== 0; ) {
        this.elem.firstElementChild.remove();
      }
    }

    if(this.todos.length !== 0){
      const copy = JSON.parse(JSON.stringify(this.todos));
      copy.reverse().forEach((itemData)=>{
        const item = new Todoitem(this.elem, itemData._id, itemData.text,itemData.createDate, itemData.completed);
        item.render();
      });
    } else {
      console.warn('no todos to render');
    }

    this.anchor.append(this.elem);

  }
}