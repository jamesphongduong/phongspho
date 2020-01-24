import { filterData } from '../utils/helper';

describe('filterData function', () => {
  test('number input', () => {
    expect(filterData([1, 2, 3], [2])).toMatchObject([1, 3]);
  });
});
