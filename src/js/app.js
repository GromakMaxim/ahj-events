import generateRndCellNumber from './randomCellNumber';

const body = document.getElementsByTagName('body')[0];
const field = document.createElement('div');
let prevValue;
field.className = 'field';

const fieldSize = 16;
// eslint-disable-next-line no-plusplus
for (let i = 0; i < fieldSize; i++) {
  const cell = document.createElement('div');
  cell.className = 'cell';

  field.append(cell);
}
body.append(field);

async function process() {
  const cells = document.getElementsByClassName('cell');
  let curValue = await generateRndCellNumber(0, fieldSize - 1);
  if (curValue === prevValue) {
    // eslint-disable-next-line no-plusplus
    curValue++;
    if (curValue > fieldSize - 1) curValue = 3;
  }

  prevValue = curValue;

  for (const cell of cells) {
    if (cell.classList.contains('goblin')) {
      cell.classList.remove('goblin');
    }
  }

  cells[curValue].classList.add('goblin');
}

setInterval(process, 1000);
