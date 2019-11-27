import { capitalizeFirstLetterEachWord } from '../utils';

describe('capitalizeFirstLetterEachWord function', () => {
  test('string of all lowercase words', () => {
    expect(capitalizeFirstLetterEachWord('lowercase words')).toBe(
      'Lowercase Words'
    );
  });
  test('string of correct format initially', () => {
    expect(capitalizeFirstLetterEachWord('Lowercase Words')).toBe(
      'Lowercase Words'
    );
  });
  test('string mixed of upper and lowercase words', () => {
    expect(capitalizeFirstLetterEachWord('Uppercase lowercase Uppercase')).toBe(
      'Uppercase Lowercase Uppercase'
    );
  });
  test('string with mixed upper and lowercase letters', () => {
    expect(capitalizeFirstLetterEachWord('MiXeD')).toBe('Mixed');
  });
});
