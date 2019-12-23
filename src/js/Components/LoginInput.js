import Store from '../Services/Store/Store.js';

export default class LoginInput {
  constructor(anchor){
    this.anchor = anchor;
    this.element = document.createElement('input');
    this.element.type = 'text';
    this.element.id = 'login';
    this.element.placeholder = 'Enter you login here';
    Store.events.subscribe('loginError', ()=>{
      this.selfClear();
    });
  }

  render() {
    this.anchor.append(this.element);
  }

  getValue () {
    return this.element.value.trim().toLowerCase();
  }

  selfClear () {
    this.element.value = "";
  }
}