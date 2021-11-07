export default class Cell {
  constructor() {
    this.monster = false;
    this.cell = document.createElement('div');
    this.cell.className = 'cell';
  }

  enableMonster() {
    if (!this.monster) this.monster = true;
  }

  disableMonster() {
    if (this.monster) this.monster = false;
  }

  addEventOnClick(event){
    this.cell.addEventListener("click", event);
  }

}
