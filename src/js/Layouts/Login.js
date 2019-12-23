import Popup from '../Components/Popup.js';
import Layout from './Layout.js';
import LoginInput from '../Components/LoginInput.js';
import LoginButton from '../Components/LoginButton.js';
import PasswordInput from '../Components/PasswordInput.js';

export default class Login extends Layout {
  constructor(anchor){
    super(anchor);
    this.anchor = anchor;
  }

  render(){
    const wrapper = document.createElement('div');
    wrapper.classList.add('login_wrapper');

    const linput = new LoginInput(wrapper);
    linput.render();    
    const lpassword = new PasswordInput(wrapper);
    lpassword.render();
    const lbutton = new LoginButton(wrapper);
    lbutton.render();

    window.addEventListener('keydown', (e)=>{
      if (e.keyCode === 13 && document.getElementById('loginButton')) {
        lbutton.element.click();
      } else if (e.keyCode === 13 && document.querySelector('.add_button') && !document.querySelector('.item_editor') ) {
        document.querySelector('.add_button').click();
      }
    })

    this.anchor.append(wrapper);

  }
}