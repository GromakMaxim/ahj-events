import generateRndCellNumber from '../randomCellNumber';

test('expected rnd numbers between 0 and 100', () => {
  const min = 0;
  const max = 100;
  let success = true;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 100000; i++) {
    const actual = generateRndCellNumber(min, max);
    if (actual < min || actual > max) {
      success = false;
      break;
    }
  }
  expect(success).toEqual(true);
});
