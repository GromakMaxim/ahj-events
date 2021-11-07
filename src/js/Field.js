import Cell from "./Cell";
import generateRndCellNumber from "./randomCellNumber";

const DELAY = 800;

export default class Field {

  constructor(size) {
    this.score = document.getElementsByClassName('score')[0];
    this.miss = document.getElementsByClassName('miss')[0];
    this.scoreValue = 0;
    this.missValue = 0;

    if (size > 0 && Math.sqrt(size) % 1 === 0) {
      this.size = size;
      this.field = document.createElement('div');
      this.field.className = 'field';
      this.cells = [];
      this.process();
    } else {
      throw new Error('size must be the square of the number')
    }
  }

  async process() {
    await this.generateCells();
    await this.fillField();
    await this.draw();
    setInterval(async () => {
      await this.removeMonsterFromCell();
      await this.addMonsterToCell();
    }, DELAY);
  }

  generateCells() {
    for (let i = 0; i < this.size; i++) {
      const currentCell = new Cell();
      currentCell.addEventOnClick((event) => {
        event.preventDefault();
        if (currentCell.cell.classList.contains('goblin')) {
          this.scoreValue++;
        } else {
          this.missValue++;
        }
        
        this.score.textContent = 'Score: ' + this.scoreValue;
        this.miss.textContent = 'Misses: ' + this.missValue;

        if (this.scoreValue === 5){
          alert('you are the winner!');
        }
        if (this.missValue === 5) {
          alert('game over');
        }
      });
      this.cells.push(currentCell);
    }
  }

  fillField() {
    if (this.cells.length === 0) throw new Error('the cells were not initialized');
    for (let cell of this.cells) {
      this.field.append(cell.cell);
    }
  }

  draw() {
    const body = document.getElementsByTagName('body')[0];
    body.append(this.field);
  }

  removeMonsterFromCell() {
    const cells = document.getElementsByClassName('cell');
    const found = Array.from(cells).find((cell) => cell.classList.contains('goblin'));
    if (found !== undefined && found !== null) found.classList.remove('goblin');
  }

  async addMonsterToCell() {
    const cells = document.getElementsByClassName('cell');
    let curValue = await generateRndCellNumber(0, this.size - 1);
    cells[curValue].classList.add('goblin');
  }

}
