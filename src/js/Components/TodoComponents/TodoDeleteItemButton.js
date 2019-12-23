import Store from '../../Services/Store/Store.js';


export default class TodoDeleteItemButton {
  constructor(anchor, todoId){
    this.anchor = anchor;
    this.todoId = todoId;
    this.elem = document.createElement('button');
    this.elem.classList.add('delete_item_button');
    this.elem.innerHTML = '&#10008;';
    this.elem.addEventListener('click', ()=>{
      Store.dispatch('itemDelete', {todoId});
    });
  }

  render(){
    this.anchor.append(this.elem);
  }
}