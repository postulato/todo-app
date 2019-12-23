
export default function() {
  function filterTodos (type, allTodos){
    let filteredTodos = [];
    if (type==='all'){
      filteredTodos = allTodos.slice();
    } else if (type==='done') {
      filteredTodos = allTodos.filter(todoItem=>todoItem.completed);
    } else if (type==='undone'){
      filteredTodos = allTodos.filter(todoItem=>!todoItem.completed);
    }
    return filteredTodos;
  }

  return {
    tryLogin: (payload, state) => {
      const newState = {
        ...state,
        userState: {
          authorized: state.userState.authorized,
          login: payload.login,
          password: payload.password
        }
      };
      return newState;
    },
    loginError: (payload,state)=>{
      return state;
    },    
    changeRoute: (payload,state)=> {
      let link = 'list';
      if (!payload.userState.authorized) {
        link = 'login';
      } 
      return {
        ...state,
        userState: {
          authorized: state.userState.authorized,
          currentLink: link
        }
      }
    },
    onItemAdd: (payload,state)=>{
      const newState = {
        ...state,
        itemToAdd:payload.inputData
      };
      return newState;
    },
    itemRecieved:(payload,state)=>{
      const newState = {
        ...state,
        todos: state.todos.slice()
      };
      newState.todos.push(payload);
      newState.filteredTodos.todos = filterTodos(state.filteredTodos.type, newState.todos);
      return newState;
    },
    getAllItems:(payload,state)=>{return {...state}},
    allItemsRecieved: (payload,state)=>{
      const newState = {
        ...state,
        todos: payload,
        filteredTodos: {
          todos:payload,
          type:'all'
        }
      };
      return newState;
    },
    itemDelete: (payload,state)=>{
      return {
        ...state,
        deleteId: payload.todoId
      };
    },
    destroyItemNow: (payload, state)=>{
      const newTodos = state.todos.filter((todo)=>todo._id !== payload._id);
      const newFilteredTodos = filterTodos(state.filteredTodos.type, newTodos);
      const newState = {
        ...state,
        todos:newTodos,
        filteredTodos: {
          ...state.filteredTodos,
          todos: newFilteredTodos
        }
      };
      return newState;
    },
    itemCheck: (payload,state)=>{
     return {
        ...state,
        itemToCheck: {
          ...payload,
          item: state.todos.find((todoItem)=>{return todoItem._id === payload.todoId})
        }
      }
    },
    itemWasChecked: (payload,state)=>{
      const newState = {
        ...state,
        todos: state.todos.map((todoItem)=>{
          if (todoItem._id === payload._id) {
            return {
              ...todoItem,
              completed: true
            }
          } else {
            return {...todoItem};
          }
        })
      };
      newState.filteredTodos.todos = filterTodos(state.filteredTodos.type, newState.todos);
      return newState;
    },
    filterTodos: (payload, state)=>{
      const newState = {...state};
      newState.filteredTodos.type = payload.type;
      newState.filteredTodos.todos = filterTodos(payload.type,state.todos);
      return newState;
    },
    itemChanged:(payload,state)=>{
     return {
        ...state,
        itemToCheck: {
          ...payload,
          item: state.todos.find((todoItem)=>{return todoItem._id === payload.todoId})
        }
      }
    },
    newTextApproved:(payload,state)=>{
      const newState = {
        ...state
      };
      newState.todos = state.todos.map((todoItem)=>{
        if(todoItem._id === payload._id){
          todoItem.text = payload.text;
        }
        return todoItem;
      });
      newState.filteredTodos.todos = filterTodos(state.filteredTodos.type, newState.todos);
      return newState;
    }
    
  };
}
