import TodoInput from '../TodoComponents/TodoInput.js';
import TodoAddButton from '../TodoComponents/TodoAddButton.js';


export default class WrapperItemAdder {
  constructor(anchor) {
    this.anchor = anchor;
  }

  render(){
    const wrapper = document.createElement('div');
    wrapper.classList.add('item_adder');

    const input = new TodoInput(wrapper);
    const addButton = new TodoAddButton(wrapper);

    input.render();
    addButton.render();

    this.anchor.append(wrapper);
    
  }
}