import { filterArray } from '../utils/helper';

describe('filterArray function', () => {
  test('two  matchingelements', () => {
    expect(filterArray([1, 2, 3], [2, 3])).toMatchObject([1]);
  });
  test('one matching element', () => {
    expect(filterArray([1, 2, 3], [2])).toMatchObject([1, 3]);
  });
  test('no matching elements', () => {
    expect(filterArray([1, 2, 3], [0])).toMatchObject([1, 2, 3]);
  });
});
