import getReducers from "./getReducers.js";
import Observer from "../Observer/Observer.js";

class Store {
  constructor(reducers) {
    this.reducers = reducers;
    this.events = new Observer();
    this.state = {
      todos: [],
      deleteId: null,
      itemToAdd: null,
      itemToCheck: null,
      filteredTodos: {
        todos: null,
        type: "all"
      },
      userState: {
        authorized: false,
        currentLink: "login"
      }
    };
  }

  dispatch(actionType, payload) {
    if (this.reducers[actionType]) {
      this.state = this.reducers[actionType](payload, this.state);
      this.events.broadcast(actionType, this.state);
    } else {
      console.warn("store can't dispatch: unknown action type");
    }
  }
}

export default new Store(getReducers());
