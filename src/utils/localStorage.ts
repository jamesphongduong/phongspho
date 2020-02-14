import { strOrNull } from '../types';

export const setLoggedInLocalStorage = (): void =>
  localStorage.setItem('loggedIn', '1');

export const removeLoggedInLocalStorage = (): void =>
  localStorage.removeItem('loggedIn');

export const checkLoggedInLocalStorage = (): boolean => {
  return localStorage.getItem('loggedIn') === null ? false : true;
};
