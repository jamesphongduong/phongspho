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
  test('strign input of positive number ', () => {
    expect(isValidPrice(1)).toBe(true);
  });
  test('string input of negative number', () => {
    expect(isValidPrice(-1)).toBe(false);
  });
  test('string input of number 0', () => {
    expect(isValidPrice('0')).toBe(true);
  });
});
