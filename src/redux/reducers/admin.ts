import { checkLoggedInLocalStorage } from '../../utils';
import { ADMIN_LOGIN, ADMIN_LOGOUT } from '../actions/actionTypes';
import { AdminAction, AdminState } from '../../types';

const initialState: AdminState = {
  loggedIn: checkLoggedInLocalStorage() ? true : false
};

export const adminReducer = (
  state = initialState,
  action: AdminAction
): AdminState => {
  const { type } = action;
  switch (type) {
    case ADMIN_LOGIN:
      return {
        ...state,
        loggedIn: true
      };
    case ADMIN_LOGOUT:
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
};
