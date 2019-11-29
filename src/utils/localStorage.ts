import { strOrNull } from '../types';

export const setLoggedInLocalStorage = (): void =>
  localStorage.setItem('loggedIn', '1');

export const removeLoggedInLocalStorage = (): void =>
  localStorage.removeItem('loggedIn');

export const checkLoggedInLocalStorage = (): strOrNull =>
  localStorage.getItem('loggedIn');
