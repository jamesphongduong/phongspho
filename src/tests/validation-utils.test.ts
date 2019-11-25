import { isValidText } from '../utils';

describe('isValidText function', () => {
  test('number input', () => {
    expect(isValidText(9)).toBe(false);
  });
  test('string input', () => {
    expect(isValidText('string')).toBe(true);
  });
  test('string input with number', () => {
    expect(isValidText('string9')).toBe(false);
  });
  test('string of one empty white space', () => {
    expect(isValidText(' ')).toBe(false);
  });
  test('string of two empty white space', () => {
    expect(isValidText('  ')).toBe(false);
  });
});
