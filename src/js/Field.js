import Cell from './Cell';
import generateRndCellNumber from './randomCellNumber';

const DELAY = 800;
const START_SCORE = 0;
const WINNING_SCORE = 5;
const LOOSE_SCORE = 5;

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
      throw new Error('size must be the square of the number');
    }
  }

  async process() {
    await this.generateCells();
    await this.draw();

    setInterval(async () => {
      await this.switchMonster();
    }, DELAY);
  }

  generateCells() {
    for (let i = 0; i < this.size; i++) {
      const currentCell = new Cell();

      currentCell.content.addEventListener('click', async (event) => {
        event.preventDefault();
        if (currentCell.content.classList.contains('goblin')) {
          currentCell.content.classList.remove('goblin');
          this.scoreValue++;
        } else {
          this.missValue++;
        }
        await this.drawScore();
        await this.checkWinningCondition();

      });
      this.cells.push(currentCell);
    }
  }

  draw() {
    if (this.cells.length === 0) throw new Error('the cells were not initialized');
    const body = document.getElementsByTagName('body')[0];
    body.append(this.field);
    this.cells.forEach((cell) => cell.draw());
  }

  async switchMonster() {
    const rndNumber = await generateRndCellNumber(0, this.size - 1);
    const cells = document.getElementsByClassName('cell');
    const found = await Array.from(cells).find((cell) => cell.classList.contains('goblin'));
    if (found !== undefined && found !== null) {
      found.classList.remove('goblin');
      this.missValue++;
      await this.drawScore();
      await this.checkWinningCondition();
    } else {
      cells[rndNumber].classList.add('goblin');
    }
  }

  async resetScore() {
    this.scoreValue = START_SCORE;
    this.missValue = START_SCORE;
    await this.drawScore();
  }

  drawScore() {
    this.score.textContent = `Score: ${this.scoreValue}`;
    this.miss.textContent = `Misses: ${this.missValue}`;
  }

  async checkWinningCondition() {
    if (this.scoreValue >= WINNING_SCORE) {
      alert('you are the winner!');
      await this.resetScore();
    }
    if (this.missValue >= LOOSE_SCORE) {
      alert('game over');
      await this.resetScore();
    }
  }
}
