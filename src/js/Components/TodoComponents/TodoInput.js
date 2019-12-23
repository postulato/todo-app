import Store from '../../Services/Store/Store.js';

export default class TodoInput {
  constructor(anchor){
    this.anchor = anchor;
    this.elem = document.createElement('input');
    this.elem.classList.add('todo_input');
    this.elem.placeholder = 'Enter new todo here';
    this.allElements = [];
    
  }

  render(){
    this.anchor.append(this.elem);
  }
}
