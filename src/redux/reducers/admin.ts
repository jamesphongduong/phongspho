import { checkLoggedInLocalStorage } from '../../utils';
import { ADMIN_LOGIN, ADMIN_LOGOUT } from '../actions/actionTypes';

const initialState = {
  loggedIn: checkLoggedInLocalStorage() || false
};

export const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

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
