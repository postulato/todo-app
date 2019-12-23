import TokenHandler from "../TokenHandler/TokenHandler.js";
import Store from "../Store/Store.js";
import Popup from '../../Components/Popup.js';
 
class BackendWorker {
  constructor(store) {
    this.store = store;
    this.url = "https://todo-app-back.herokuapp.com/login";
    this.store.events.subscribe("tryLogin", state => {
      this.login(state.userState);
    });
    this.store.events.subscribe("onItemAdd", state => {
      this.addItem(state.itemToAdd);
    });
    this.store.events.subscribe("getAllItems", state => {
      this.getAllItems();
    });
    this.store.events.subscribe("itemDelete", state => {
      this.itemDelete(state.deleteId);
    });
    this.store.events.subscribe("itemCheck", state => {
      this.itemCheck(state.itemToCheck);
    });
    this.store.events.subscribe("itemChanged", (state)=> {
      this.changeItemText(state.itemToCheck.todoId, state.itemToCheck.text); 
    })
  }

  changeItemText(todoId, text){
    fetch('https://todo-app-back.herokuapp.com/todos/'+todoId, {
      method: 'PUT',
      body:
        JSON.stringify({
          text:text
        }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': TokenHandler.getElement("token")
      }
    }).then((res)=>{return res.json()})
    .then((res)=>{
      this.store.dispatch('newTextApproved', res);
    });
  }

  login(inputData) {
    fetch(this.url, {
      method: "POST",
      body: JSON.stringify({
        email: inputData.login,
        password: inputData.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log("login result: ", res);
        if (res.error) {
          const lpopup = new Popup(document.querySelector('.login_wrapper'));
          lpopup.render();
          console.warn("login error");
        } else if (res.token) {
          TokenHandler.setElement("token", res.token);
          this.store.dispatch("changeRoute", {
            userState: { authorized: true }
          });
        }
      });
  }

  addItem(text) {
    if(text.length<6){return;}
    fetch("https://todo-app-back.herokuapp.com/todos", {
      method: "POST",
      body: JSON.stringify({
        text: text
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: TokenHandler.getElement("token")
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.store.dispatch("itemRecieved", res);
      });
  }

  getAllItems() {
    fetch("https://todo-app-back.herokuapp.com/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: TokenHandler.getElement("token")
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.store.dispatch("allItemsRecieved", res);
      });
  }

  itemDelete(itemId) {
    fetch("https://todo-app-back.herokuapp.com/todos/" + itemId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: TokenHandler.getElement("token")
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.store.dispatch("destroyItemNow", res);
      });
  }

  itemCheck(itemToCheck) {
    fetch("https://todo-app-back.herokuapp.com/todos/"+itemToCheck.todoId, {
      method: "PUT",
      body: JSON.stringify({
        completed: true
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: TokenHandler.getElement("token")
      }
    }).then((res)=>{
      return res.json();
    }).then((res)=>{
      this.store.dispatch('itemWasChecked', res);
    });
  }

  register(){
    fetch('https://todo-app-back.herokuapp.com/register', {
      method: 'POST',
      body:
        JSON.stringify({
          email: 'test@test.com',
          password:'testpass',
          username:'testname'
        }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      return res.json();
    }).then((res)=>{
      console.log("new register",res);
    })
  }
}
export default new BackendWorker(Store);
