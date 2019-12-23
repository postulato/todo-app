import Login from '../../Layouts/Login.js';
import Todo from '../../Layouts/Todo.js';
 
export default {
  login: {
    data: { route: "login" },
    url: '/',
    component: Login,
    settings:{
      redirect:'list'
    }
  },
  list: {
    data: { route: "list" },
    url: "list",
    component: Todo,
    settings:{}
  }
};
