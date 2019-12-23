import Store from '../../Services/Store/Store.js';

export default class TodoItemEditor {
  constructor(anchor,todoId,val){
    this.anchor = anchor;
    this.todoId = todoId;
    this.oldText = val;
    this.elem = document.createElement('input');
    this.elem.type = 'text';
    this.elem.classList.add('item_editor');
    this.elem.value = val;
    
    this.changeHandler = ()=>{
      if (this.oldText !== this.elem.value) {
        Store.dispatch('itemChanged', {text:this.elem.value, todoId: this.todoId});
      }
      this.anchor.textContent = this.elem.value;
      this.elem.remove();
    };

    this.elem.addEventListener('blur', this.changeHandler);
   

  }

  render () {
    this.anchor.append(this.elem);
    this.elem.focus();
  }
}
