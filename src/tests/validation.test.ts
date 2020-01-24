import { stringIsOnlyWhiteSpace } from '../utils';

describe('stringIsOnlyWhiteSpace', () => {
  test('valid string', () => {
    expect(stringIsOnlyWhiteSpace('String')).toBe(false);
  });
  test('only whitespace', () => {
    expect(stringIsOnlyWhiteSpace('    ')).toBe(true);
  });
  test('empty string', () => {
    expect(stringIsOnlyWhiteSpace('')).toBe(true);
  });
});
