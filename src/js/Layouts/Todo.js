import Layout from './Layout.js';
import WrapperFilterButtons from '../Components/WrapperComopnents/WrapperFilterButtons.js';
import WrapperTodoCounter from '../Components/WrapperComopnents/WrapperTodoCounter.js';
import WrapperItemAdder from '../Components/WrapperComopnents/WrapperItemAdder.js';
import WrapperTodoItemsAll from '../Components/WrapperComopnents/WrapperTodoItemsAll.js';

export default class Todo extends Layout {
  constructor(anchor){
    super(anchor);
    this.anchor = anchor;
  }

  render(){
    const wrapper = document.createElement('div');
    wrapper.classList.add('todo_wrapper');
    const header = document.createElement('h1');
    header.classList.add('todo_header');
    header.textContent = 'Todo APP';
    wrapper.append(header);
    const filterButtons = new WrapperFilterButtons(wrapper);
    const todoCounter = new WrapperTodoCounter(wrapper);
    const itemAdder = new WrapperItemAdder(wrapper);
    const todoItemsAll = new WrapperTodoItemsAll(wrapper);
    filterButtons.render();
    itemAdder.render();
    todoCounter.render();
    todoItemsAll.render();
    this.anchor.append(wrapper);
  }
}