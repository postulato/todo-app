import Store from '../../Services/Store/Store.js';

export default class TodoAddButton {
  constructor(anchor){
    this.anchor = anchor;
    this.elem = document.createElement('button');
    this.elem.textContent = 'Add';
    this.elem.classList.add('add_button');
    this.elem.addEventListener('click', (event)=>{
      let inputData = document.querySelector('.todo_input').value;
      if(inputData === ""){
        console.warn('todo input is empty');
      } else {
        Store.dispatch('onItemAdd', {inputData});
        document.querySelector('.todo_input').value = '';
      }
    })
  }

  render(){
    this.anchor.append(this.elem);
  }
}