import { ADMIN_LOGIN, ADMIN_LOGOUT } from './actionTypes';
import { LoginAction, LogoutAction } from '../../types';

export const loginAdmin = (): LoginAction => {
  return {
    type: ADMIN_LOGIN
  };
};

export const logoutAdmin = (): LogoutAction => {
  return {
    type: ADMIN_LOGOUT
  };
};
