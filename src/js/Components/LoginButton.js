import Store from '../Services/Store/Store.js';

export default class LoginButton {
  constructor (anchor) {
    this.anchor = anchor;
    this.element = document.createElement('button');
    this.element.textContent = "Log in";
    this.element.id = 'loginButton';
 
    this.element.addEventListener('click', ()=>{
      Store.dispatch('tryLogin', {
        login: document.getElementById('login').value.trim().toLowerCase(),
        password: document.getElementById('password').value.trim().toLowerCase()
      }); 
    });

  }

  render(){
    this.anchor.append(this.element);
  }


}