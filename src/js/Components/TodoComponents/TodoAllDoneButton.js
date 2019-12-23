import Store from '../../Services/Store/Store.js'; 

export default class TodoAllDoneButton {
  constructor(anchor){
   this.anchor = anchor;
   this.elem = document.createElement('button');
   this.elem.classList.add('done_button');
   this.elem.textContent = 'Done'; 
   Store.events.subscribe('filterTodos', (state)=>{
    if(state.filteredTodos.type === 'done'){
      this.elem.classList.add('active_filter');
    } else {
      this.elem.classList.remove('active_filter');
    }
   });
   this.elem.addEventListener ('click', ()=>{
    Store.dispatch('filterTodos', {type:'done'}); 
  });
  }


  render(){
    if(!this.anchor.querySelector('.done_button')){
      this.anchor.append(this.elem);
    }
  }
}