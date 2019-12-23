export default class Layout {
  constructor (anchor) {
    this.anchor = anchor;
  }

  selfDestroy () {
    while(this.anchor.firstChild){
      this.anchor.removeChild(this.anchor.firstChild); 
    }
  }

}