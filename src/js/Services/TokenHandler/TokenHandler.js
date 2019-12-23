class TokenHandler {
  constructor () {
    localStorage.setItem('auth-items',JSON.stringify({}));
    this.data = JSON.parse(localStorage.getItem('auth-items'));
    console.log(this.data);
  }

  getElement(key){
    return this.data[key];
  }

  setElement(key,value){
    this.data[key] = value;
    localStorage.setItem('auth-items', JSON.stringify(this.data));
  }
}

export default new TokenHandler();