const hasNumber = (value): boolean => /\d/.test(value);

const isString = (value): boolean =>
  Object.prototype.toString.call(value) === '[object String]';

const onlyWhiteSpace = (value): boolean => value.trim().length === 0;

const isPositive = (value): boolean => value >= 0;

const isImageFile = (file): boolean =>
  file && file['type'].split('/')[0] === 'image';

export const isValidText = (value): boolean =>
  isString(value) && !hasNumber(value) && !onlyWhiteSpace(value);

export const isValidPrice = (value): boolean => isPositive(value);

export const isValidImageFile = (value): boolean => isImageFile(value);
