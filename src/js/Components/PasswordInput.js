import Store from '../Services/Store/Store.js';

export default class PasswordInput {
  constructor(anchor){
    this.anchor = anchor;
    this.element = document.createElement('input');
    this.element.type = 'password';
    this.element.id = 'password';
    this.element.placeholder = 'Enter you password here';
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