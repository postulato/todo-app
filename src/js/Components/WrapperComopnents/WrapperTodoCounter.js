import Store from '../../Services/Store/Store.js';

export default class WrapperTodoCounter {
  constructor(anchor) {
    this.anchor = anchor;
    this.elem = document.createElement("div");
    this.elem.classList.add("counter");
    this.elem.innerHTML = `Done <strong class='done_todos'>0</strong> of <strong class='all_todos'>0</strong>`;
    Store.events.subscribe('allItemsRecieved', (state)=>{
      this.render({
        done: state.todos.filter((todo)=>{ return todo.completed }).length,
        all:state.todos.length
      });
    })
    Store.events.subscribe('itemRecieved', (state)=>{
      this.render({
        done: state.todos.filter((todo)=>{ return todo.completed }).length,
        all:state.todos.length
      });
    })
    Store.events.subscribe('destroyItemNow', (state)=>{
      this.render({
        done: state.todos.filter((todo)=>{ return todo.completed }).length,
        all:state.todos.length
      });
    });
    Store.events.subscribe('itemWasChecked', (state)=>{
      this.render({
        done: state.todos.filter((todo)=>{ return todo.completed }).length,
        all:state.todos.length
      });
    })
  }

  render(data = { done: 0, all: 0 }) {
    if (document.querySelector(".counter")) {
      document.querySelector(".done_todos").textContent = data.done;
      document.querySelector(".all_todos").textContent = data.all;
    } else {
      this.anchor.append(this.elem);
    }
  }
}
