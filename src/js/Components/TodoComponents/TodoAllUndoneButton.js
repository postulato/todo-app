 import Store from '../../Services/Store/Store.js';
 
 export default class TodoAllUndoneButton {
   constructor(anchor){
    this.anchor = anchor;
    this.elem = document.createElement('button');
    this.elem.classList.add('undone_button');
    this.elem.textContent = 'Not done';
    Store.events.subscribe('filterTodos', (state)=>{
      if(state.filteredTodos.type === 'undone'){
        this.elem.classList.add('active_filter');
      } else {
        this.elem.classList.remove('active_filter');
      }
     });
    this.elem.addEventListener ('click', ()=>{
      Store.dispatch('filterTodos', {type:'undone'}); 
    });
 
   }

   render(){
    this.anchor.append(this.elem);
   }
 }