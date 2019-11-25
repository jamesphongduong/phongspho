import { isValidText, isValidPrice } from '../utils';

describe('isValidText function', () => {
  test('number input', () => {
    expect(isValidText(9)).toBe(false);
  });
  test('string input with only a-z values', () => {
    expect(isValidText('string')).toBe(true);
  });
  test('string input with number value', () => {
    expect(isValidText('string9')).toBe(false);
  });
  test('string of one empty white space', () => {
    expect(isValidText(' ')).toBe(false);
  });
  test('string of two empty white space', () => {
    expect(isValidText('  ')).toBe(false);
  });
});

describe('isValidPrice function', () => {
  test('positive number input', () => {
    expect(isValidPrice(1)).toBe(true);
  });
  test('negative number input', () => {
    expect(isValidPrice(-1)).toBe(false);
  });
  test('0 number input', () => {
    expect(isValidPrice(0)).toBe(true);
  });
});
