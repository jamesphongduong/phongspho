import { InputValidation } from '../types';

export const stringIsOnlyWhiteSpace = (string: string): boolean =>
  string.trim().length === 0;

const isImageFile = (file: File): boolean =>
  file && file['type'].split('/')[0] === 'image';

export const isValidImageFile = (file: File): boolean => isImageFile(file);

export const checkFileType = (file: File): InputValidation => {
  if (!file) return 'Empty';
  return isImageFile(file) ? 'Valid' : 'Invalid';
};
