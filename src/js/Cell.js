export default class Cell {
  constructor() {
    this.content = document.createElement('div');
    this.content.className = 'cell';
  }

  draw() {
    const field = document.getElementsByClassName('field')[0];
    field.append(this.content);
  }
}
