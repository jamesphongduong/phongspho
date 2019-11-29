import { InputValidation } from '../types';

const stringHasNumber = (string): boolean => /\d/.test(string);

const isString = (value): boolean =>
  Object.prototype.toString.call(value) === '[object String]';

const stringIsNumber = (string) => parseInt(string) !== NaN;

export const stringIsOnlyWhiteSpace = (string): boolean =>
  string.trim().length === 0;

const isPositive = (num): boolean => num >= 0;

const isImageFile = (file): boolean =>
  file && file['type'].split('/')[0] === 'image';

export const isValidText = (input): boolean =>
  isString(input) && !stringHasNumber(input) && !stringIsOnlyWhiteSpace(input);

export const isValidPrice = (input): boolean =>
  stringIsNumber(input) && isPositive(input);

export const isValidImageFile = (file): boolean => isImageFile(file);

export const checkFileType = (file): InputValidation => {
  if (!file) return InputValidation.Empty;

  return isImageFile(file) ? InputValidation.Valid : InputValidation.Invalid;
};
