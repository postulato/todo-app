import Store from '../../Services/Store/Store.js';


export default class TodoAllButton {
  constructor(anchor){
   this.anchor = anchor;
   this.elem = document.createElement('button');
   this.elem.classList.add('all_button');
   this.elem.textContent = 'All'; 
   Store.events.subscribe('filterTodos', (state)=>{
    if(state.filteredTodos.type === 'all'){
      this.elem.classList.add('active_filter');
    } else {
      this.elem.classList.remove('active_filter');
    }
   });
   this.elem.addEventListener('click', (e)=>{
    Store.dispatch('filterTodos', {type:'all'});
   });
  }
 
  render(){
    if(!this.anchor.querySelector('.all_button')){
      this.anchor.append(this.elem);
    } 
  }
}