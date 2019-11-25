const hasNumber = (value): boolean => /\d/.test(value);

const isString = (value): boolean =>
  Object.prototype.toString.call(value) === '[object String]';

const onlyWhiteSpace = (value): boolean => value.trim().length === 0;

export const isValidText = (value): boolean =>
  isString(value) && !hasNumber(value) && !onlyWhiteSpace(value) ? true : false;
