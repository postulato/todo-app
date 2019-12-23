import Store from '../Services/Store/Store.js';

export default class Popup {
  constructor(anchor){
    this.anchor = anchor;
    this.elem = document.createElement('div'); 
    this.elem.textContent = 'Wrong data';
    this.elem.classList.add('popup');
    Store.events.subscribe('loginError', this.render.bind(this))
    this.anchor.append(this.elem);
  }

  render () {
    const showMe = function () {
      this.style.display = 'block';
    };

    const hideMe = function () {
      this.style.display = 'none';
    };

    showMe.call(this.elem);
    setTimeout(hideMe.bind(this.elem), 1500);
  }

}